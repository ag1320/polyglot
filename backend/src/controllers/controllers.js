import knex from "./dbConnection.js";


async function postUser(email, username, password, nativeLanguageId) {
  await knex("users").insert({ email, username, password, native_language_id: nativeLanguageId });
  return;
}

async function getHashByUsername (username) {
  const data = await knex("users").where({ username });
  return data[0].password;
}

async function getUsers() {
  return await knex("users")
    .select("users.id", "users.username", "users.email", "users.native_language_id", "languages.*")
    .leftJoin("languages", "users.native_language_id", "languages.id");
}

async function getLanguages() {
  return await knex("languages")
    .select("*")
}

async function checkEmail(email) {
  const data = await knex("users").where({ email });
  return data.length > 0;
}


export { 
  postUser,
  getHashByUsername, 
  getUsers,
  getLanguages,
  checkEmail
};
