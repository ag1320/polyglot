import axios from "axios";

//USERS LOGIN AND SIGN UP
async function postUser(email, username, password, nativeLanguageId) {
  try {
    let payload = {
      email,
      username,
      password,
      nativeLanguageId
    };
    await axios.post("https://localhost:3001/users", payload);
    return;
  } catch (err) {
    throw new Error(err.response.data.error || "An unexpected error occurred");
  }
}

async function verifyUser(username, password) {
  try {
    let payload = {
      username,
      password
    };
    const isVerified = await axios.get("https://localhost:3001/verify-user", {
      params: payload,
    });
    console.log("isVerified", isVerified.data);
    return isVerified.data;
  } catch (err) {
    throw new Error(err.response.data.error || "An unexpected error occurred");
  }
}

async function fetchUsers() {
  try {
    const users = await axios.get("https://localhost:3001/users");
    return users.data;
  } catch (err) {
    console.log(err);
    return;
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

export {
  postUser, 
  verifyUser, 
  fetchUsers, 
  fetchLanguages
};



