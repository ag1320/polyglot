import knex from "./dbConnection.js";

async function postUser(email, username, password) {
  await knex("users").insert({ email, username, password });
  return;
}

export { postUser };
