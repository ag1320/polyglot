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
  [
    (state) => state.user.user?.my_languages || [],
    (state) => state.audio.voices,
  ],
  (myLanguages, voices) => {
    if (
      !voices ||
      Object.keys(voices).length === 0 ||
      !myLanguages ||
      myLanguages.length === 0
    ) {
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

function getNextWord(words, previousWordId = null) {
  const now = new Date();

  // Filter out the previous word
  const eligibleWords = words.filter((w) => w.id !== previousWordId);

  if (eligibleWords.length === 0) {
    console.warn("No eligible words available. Falling back to original list.");
    return words[Math.floor(Math.random() * words.length)];
  }

  const weightedWords = eligibleWords.map((word) => {
    // --- Core stats ---
    const rawAccuracy = word.recall_accuracy ?? 50;
    const accuracy = Math.min(100, Math.max(0, rawAccuracy)) / 100;

    const lastSeen = word.last_tested_at ? new Date(word.last_tested_at) : new Date(0);
    const daysSinceLastTest = (now - lastSeen) / (1000 * 60 * 60 * 24);

    const currentStreak = word.current_correct_streak ?? 0;

    // --- Weighting logic ---
    const recallFactor = 1 - accuracy; // Less accurate = higher priority
    const timeFactor = Math.log(1 + daysSinceLastTest); // More time passed = higher priority

    // Add a streak modifier: shorter streaks = higher priority
    const streakFactor = 1 / (1 + currentStreak); // e.g., streak 0 => 1, streak 5 => 0.17

    // Adjust weighting as desired
    const weight = recallFactor * 0.4 + timeFactor * 0.4 + streakFactor * 0.2;

    return { word, weight };
  });

  const totalWeight = weightedWords.reduce((sum, w) => sum + w.weight, 0);
  const rand = Math.random() * totalWeight;

  let runningTotal = 0;
  for (const item of weightedWords) {
    runningTotal += item.weight;
    if (rand <= runningTotal) {
      return item.word;
    }
  }

  // Fallback
  return eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
}



export {
  filterVoicesByLanguage,
  selectMyLanguagesWithVoices,
  sayWord,
  getNextWord,
};
