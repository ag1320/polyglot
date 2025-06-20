import { createSelector } from "@reduxjs/toolkit";
import { getAudio } from "./serverCalls";

const filterVoicesByLanguage = (voicesObj, langCode) => {
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

export {selectMyLanguagesWithVoices, sayWord}