import axios from "axios";

//USERS LOGIN AND SIGN UP
async function postUser(email, username, password, nativeLanguageId) {
  try {
    let payload = {
      email,
      username,
      password,
      nativeLanguageId,
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
async function translateWord(word, sourceLanguageId, targetLanguageId) {
  const payload = {
    text: word,
    from: sourceLanguageId,
    to: targetLanguageId,
  };
  try {
    const response = await axios.post(
      "https://localhost:3001/translate",
      payload
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

//add new language to user
async function postNewUserLanguage(newLanguage, isDefault) {
  const token = localStorage.getItem("token");
  const payload = {
    newLanguage,
    isDefault,
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
    languageId
  }

   try {
    await axios.post(
      "https://localhost:3001/user-language-default",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return
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
  postNewDefaultLanguage
};
