import axios from "axios";

//USERS LOGIN AND SIGN UP
async function postUser(
  email,
  username,
  password,
  nativeLanguageId,
  nativeLanguageVoice,
  learningLanguageId,
  learningLanguageVoice,
  name
) {
  try {
    let payload = {
      email,
      username,
      password,
      nativeLanguageId,
      nativeLanguageVoice,
      learningLanguageId,
      learningLanguageVoice,
      name,
    };
    await axios.post("https://localhost:3001/users", payload);
    return;
  } catch (err) {
    throw new Error(err.response.data.error || "An unexpected error occurred");
  }
}

async function getUser() {
  const token = localStorage.getItem("token");
  const response = await axios.get("https://localhost:3001/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

async function verifyUser(username, password) {
  try {
    let payload = {
      username,
      password,
    };
    const response = await axios.get("https://localhost:3001/verify-user", {
      params: payload,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error || "An unexpected error occurred");
  }
}

async function fetchLanguages() {
  try {
    const languages = await axios.get("https://localhost:3001/languages");
    return languages.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function checkUsername(username) {
  try {
    const response = await axios.get("https://localhost:3001/check-username", {
      params: { username },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function checkEmail(email) {
  try {
    const response = await axios.get("https://localhost:3001/check-email", {
      params: { email },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

//translation
async function translateWord(word, sourceLanguageCode, targetLanguageCode) {
  if (!word || !sourceLanguageCode || !targetLanguageCode) {
    console.error("Missing required parameters for translation");
    return;
  }
  const token = localStorage.getItem("token");
  const payload = {
    word,
    from: sourceLanguageCode,
    to: targetLanguageCode,
  };
  try {
    const response = await axios.post(
      "https://localhost:3001/translate-word",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.translated;
  } catch (err) {
    console.log(err);
    return;
  }
}

//translation
async function batchTranslateWords(
  words,
  sourceLanguageCode,
  targetLanguageCode
) {
  const token = localStorage.getItem("token");
  const payload = {
    words,
    from: sourceLanguageCode,
    to: targetLanguageCode,
  };
  try {
    const response = await axios.post(
      "https://localhost:3001/translate-words",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.translated;
  } catch (err) {
    console.log(err);
    return;
  }
}

//add new language to user
async function postNewUserLanguage(newLanguage, isDefault, voice) {
  const token = localStorage.getItem("token");
  const payload = {
    newLanguage,
    isDefault,
    voice
  };

  try {
    const response = await axios.post(
      "https://localhost:3001/user-language",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function postNewDefaultLanguage(languageId) {
  const token = localStorage.getItem("token");
  const payload = {
    languageId,
  };

  try {
    await axios.post("https://localhost:3001/user-language-default", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function postWord(sourceWord, translatedWord, sourceLangId, targetLangId) {
  const token = localStorage.getItem("token");
  const payload = {
    sourceWord,
    translatedWord,
    sourceLangId,
    targetLangId
  };

  try {
    await axios.post("https://localhost:3001/words", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function fetchVoices() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://localhost:3001/voices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function getAudio(voice, text) {
  const token = localStorage.getItem("token");
  const response = await axios.get("https://localhost:3001/audio", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      voice,
      text,
    },
    responseType: "arraybuffer"
  });
  return response.data;
}

async function postVoicePreference(voice, languageId) {
  const token = localStorage.getItem("token");
  const payload = {
    voice,
    languageId,
  };

  try {
    await axios.post("https://localhost:3001/user-language-voice", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function postNativeVoicePreference(voice) {
  const token = localStorage.getItem("token");
  const payload = {
    voice,
  };

  try {
    await axios.post("https://localhost:3001/user-native-language-voice", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}


export {
  postUser,
  verifyUser,
  fetchLanguages,
  checkUsername,
  checkEmail,
  translateWord,
  postNewUserLanguage,
  getUser,
  postNewDefaultLanguage,
  batchTranslateWords,
  postWord,
  fetchVoices,
  getAudio,
  postVoicePreference,
  postNativeVoicePreference
};
