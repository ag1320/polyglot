import knex from "./dbConnection.js";

async function postUser(email, username, password, nativeLanguageId) {
  await knex("users").insert({
    email,
    username,
    password,
    native_language_id: nativeLanguageId,
  });
  return;
}

async function getHashByUsername(username) {
  const data = await knex("users").where({ username });
  return data[0].password;
}

async function getUser({ id, username }) {
  if (!id && !username) {
    throw new Error("Must provide either 'id' or 'username' to get user");
  }

  const query = knex("users")
    .select(
      "users.id",
      "users.username",
      "users.email",
      "languages.id as native_language_id",
      "languages.name as native_language_name",
      "languages.code as native_language_code"
    )
    .leftJoin("languages", "users.native_language_id", "languages.id");

  if (id) {
    query.where("users.id", id);
  } else {
    query.where("users.username", username);
  }

  const userData = await query.first();

  if (!userData) return null;

  const native_language = {
    id: userData.native_language_id,
    name: userData.native_language_name,
    code: userData.native_language_code,
  };

  const learningLanguages = await knex("users_languages")
    .join("languages", "users_languages.language_id", "languages.id")
    .select(
      "languages.id",
      "languages.name",
      "languages.code",
      "users_languages.is_default"
    )
    .where("users_languages.user_id", userData.id);

  return {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    native_language,
    my_languages: learningLanguages,
  };
}



async function getLanguages() {
  return await knex("languages").select("*");
}

async function checkUsername(username) {
  const data = await knex("users").where({ username });
  return data[0];
}

async function checkEmail(email) {
  const data = await knex("users").where({ email });
  return data[0];
}

async function postUserLanguage(newLanguage, userId, isDefault) {
  await knex("users_languages").insert({
    user_id: userId,
    language_id: newLanguage.id,
    is_default: isDefault
  });
  return;
}

async function postUserLanguageDefault(language_id, user_id) {
  // Step 1: Set all user's languages to is_default = false
  await knex("users_languages")
    .where({ user_id })
    .update({ is_default: false });

  // Step 2: Set the selected language to is_default = true
  await knex("users_languages")
    .where({ user_id, language_id })
    .update({ is_default: true });

  return;
}


export {
  postUser,
  getHashByUsername,
  getLanguages,
  checkUsername,
  checkEmail,
  getUser,
  postUserLanguage,
  postUserLanguageDefault
};
