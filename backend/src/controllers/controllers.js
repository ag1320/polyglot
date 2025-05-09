import knex from "./dbConnection.js";


async function postUser(email, username, password, nativeLanguageId) {
  await knex("users").insert({ email, username, password, native_language_id: nativeLanguageId });
  return;
}

async function getHashByUsername (username) {
  const data = await knex("users").where({ username });
  return data[0].password;
}

async function getUserByUsername(username) {
  const data = await knex("users")
    .select("users.id", "users.username", "users.email", "users.native_language_id", "languages.*")
    .leftJoin("languages", "users.native_language_id", "languages.id")
    .where("users.username", username)
  return data[0];
}

async function getLanguages() {
  return await knex("languages")
    .select("*")
}

async function checkUsername(username) {
  const data = await knex("users").where({ username });
  return data[0]; 
}

async function checkEmail(email) {
  const data = await knex("users").where({ email });
  return data[0]; 
}



export { 
  postUser,
  getHashByUsername, 
  getLanguages,
  checkUsername,
  checkEmail,
  getUserByUsername,
};
