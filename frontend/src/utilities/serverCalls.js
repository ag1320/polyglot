import axios from "axios";

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

export {postUser}