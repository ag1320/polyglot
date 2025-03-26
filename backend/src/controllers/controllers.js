import knex from "./dbConnection.js";


async function postUser(email, username, password) {
  await knex("users").insert({ email, username, password });
  return;
}

async function getHashByUsername (username) {
  const data = await knex("users").where({ username });
  return data[0].password;
}



export { postUser, getHashByUsername };
