import axios from "axios";

//USERS LOGIN AND SIGN UP
async function postUser(email, username, password) {
  try {
    let payload = {
      email,
      username,
      password,
    };
    await axios.post("https://localhost:3001/users", payload);
    return;
  } catch (err) {
    console.log(err);
    return;
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
    console.log(err);
    return;
  }
}

export {postUser, verifyUser}



