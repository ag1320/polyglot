import { createSelector } from "@reduxjs/toolkit";
import { getAudio } from "./serverCalls";

const filterVoicesByLanguage = (voicesObj, langCode) => {
  if (!voicesObj || !langCode) {
    return [];
  }
  return Object.entries(voicesObj)
    .filter(([_, voiceData]) => voiceData.language === langCode)
    .map(([key, value]) => ({
      title: key,
      ...value,
    }));
};

const selectMyLanguagesWithVoices = createSelector(
  [(state) => state.user.user?.my_languages || [], (state) => state.audio.voices],
  (myLanguages, voices) => {
    if (!voices || Object.keys(voices).length === 0 || !myLanguages || myLanguages.length === 0) {
      return [];
    }
    return myLanguages.map((lang) => {
      const langCode = lang.code;
      const filteredVoices = filterVoicesByLanguage(voices, langCode);
      return { ...lang, voices: filteredVoices };
    });
  }
);

const sayWord = async (voice, word) => {
    try {
      const response = await getAudio(voice, word);

      const blob = new Blob([response], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("Audio playback failed", err);
    }
};

function getNextWord(words) {
  const now = new Date();

  // Normalize data and calculate weights
  const weightedWords = words.map((word) => {
    const accuracy = word.recall_accuracy ?? 0.5; // default to 50% if undefined
    const lastSeen = word.last_tested_at
      ? new Date(word.last_tested_at)
      : new Date(0); // default to long time ago if never seen

    const daysSinceLastTest = (now - lastSeen) / (1000 * 60 * 60 * 24);

    // Normalize factors (higher weight = more likely to be chosen)
    const recallFactor = 1 - accuracy; // Lower accuracy = higher weight
    const timeFactor = Math.log(1 + daysSinceLastTest); // Grows with time, slower over time

    const weight = recallFactor * 0.7 + timeFactor * 0.3; // Tune these weights as needed

    return {
      word,
      weight,
    };
  });

  const totalWeight = weightedWords.reduce((sum, w) => sum + w.weight, 0);
  const rand = Math.random() * totalWeight;
  
  // Weighted random choice
  let runningTotal = 0;
  for (const item of weightedWords) {
    runningTotal += item.weight;
    if (rand <= runningTotal) {
      return item.word;
    }
  }

  // Fallback: return random word if something goes wrong
  return words[Math.floor(Math.random() * words.length)];
}


export {filterVoicesByLanguage, selectMyLanguagesWithVoices, sayWord, getNextWord}