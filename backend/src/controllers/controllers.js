import knex from "./dbConnection.js";

async function postUser(email, username, password, nativeLanguageId, nativeLanguageVoice, name) {
  const id = await knex("users").insert({
    email,
    username,
    password,
    native_language_id: nativeLanguageId,
    native_language_voice: nativeLanguageVoice,
    first_name: name,
  }).returning("id");
  return id[0].id;
}

async function getHashByUsername(username) {
  const data = await knex("users").where({ username });
  return data[0].password;
}

// user helpers
const getNativeLanguageForUser = (userData) => ({
  id: userData.native_language_id,
  name: userData.native_language_name,
  code: userData.native_language_code,
  flag_code: userData.native_language_flag_code
});

const getLearningLanguagesForUser = async (userId, knex) => {
  return await knex("users_languages")
    .join("languages", "users_languages.language_id", "languages.id")
    .select(
      "languages.id",
      "languages.name",
      "languages.code",
      "languages.flag_code",
      "users_languages.is_default",
      "users_languages.voice"
    )
    .where("users_languages.user_id", userId);
};

const getWordsForUser = async (userId, knex) => {
  return await knex("words")
    .where("user_id", userId)
    .select(
      "id",
      "language_source_id",
      "language_target_id",
      "word_in_source_language",
      "word_in_target_language",
      "score",
      "correct_attempts",
      "incorrect_attempts",
      "total_attempts",
      "current_correct_streak",
      "current_incorrect_streak",
      "last_tested_at",
      "mastery_level",
      "recall_accuracy",
      "example_sentence",
      "notes",
      "is_favorite",
      "ignore_word",
      "created_at",
      "updated_at"
    );
};

async function getUser({ id, username }) {
  if (!id && !username) {
    throw new Error("Must provide either 'id' or 'username' to get user");
  }

  const query = knex("users")
    .select(
      "users.id",
      "users.username",
      "users.email",
      "users.first_name",
      "users.total_points",
      "users.native_language_voice",
      "languages.id as native_language_id",
      "languages.name as native_language_name",
      "languages.code as native_language_code",
      "languages.flag_code as native_language_flag_code"
    )
    .leftJoin("languages", "users.native_language_id", "languages.id");

  if (id) {
    query.where("users.id", id);
  } else {
    query.where("users.username", username);
  }

  const userData = await query.first();
  if (!userData) return null;

  const native_language = getNativeLanguageForUser(userData);
  const my_languages = await getLearningLanguagesForUser(userData.id, knex);
  const words = await getWordsForUser(userData.id, knex);

  return {
    id: userData.id,
    username: userData.username,
    first_name: userData.first_name,
    email: userData.email,
    total_points: userData.total_points,
    native_language,
    native_language_voice: userData.native_language_voice,
    my_languages,
    words
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

async function postUserLanguage(newLanguageId, userId, isDefault, voice) {
  await knex("users_languages").insert({
    user_id: userId,
    language_id: newLanguageId,
    is_default: isDefault,
    voice: voice || null
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

async function deleteWord(wordId, userId) {
  await knex("words")
    .where({ id: wordId, user_id: userId })
    .del();
  return;
}

async function postUserLanguageVoice(voice, language_id, user_id) {
  await knex("users_languages")
    .where({ user_id, language_id })
    .update({ voice });
  return;
}

async function postUserNativeLanguageVoice(voice, id) {
  await knex("users")
    .where({ id })
    .update({ native_language_voice:voice });
  return;
}

//WORDS
async function postWord(sourceWord, translatedWord, sourceLangId, targetLangId, userId) {
  await knex("words").insert({
    user_id: userId,
    language_source_id: sourceLangId,
    language_target_id: targetLangId,
    word_in_source_language: sourceWord,
    word_in_target_language: translatedWord
  });
  return;
}

async function postFlashcardAttempt(wordId, userId, languageId, isCorrect) {
  await knex.transaction(async (trx) => {
    // Step 1: Fetch current word data
    const word = await trx("words").where({ id: wordId }).first();

    if (!word) {
      throw new Error("Word not found");
    }

    // Shared updates
    const newTotalAttempts = word.total_attempts + 1;
    const updated_at = trx.fn.now();
    const last_tested_at = updated_at;

    let updateFields = {
      total_attempts: newTotalAttempts,
      last_tested_at,
      updated_at,
    };

    if (isCorrect) {
      const newCorrectAttempts = word.correct_attempts + 1;
      const newCorrectStreak = word.current_correct_streak + 1;
      const newRecallAccuracy = (newCorrectAttempts / newTotalAttempts) * 100;

      updateFields = {
        ...updateFields,
        correct_attempts: newCorrectAttempts,
        current_correct_streak: newCorrectStreak,
        current_incorrect_streak: 0,
        recall_accuracy: newRecallAccuracy.toFixed(2),
        score: word.score + 10,
      };

      // Add points to user-language connection
      await trx("users_languages")
        .where({ user_id: userId, language_id: languageId })
        .increment("language_points", 10);
    } else {
      const newIncorrectStreak = word.current_incorrect_streak + 1;
      const newRecallAccuracy = (word.correct_attempts / newTotalAttempts) * 100;

      updateFields = {
        ...updateFields,
        current_correct_streak: 0,
        current_incorrect_streak: newIncorrectStreak,
        recall_accuracy: newRecallAccuracy.toFixed(2),
        // Note: score remains the same
      };
    }

    await trx("words").where({ id: wordId }).update(updateFields);
  });
}


export {
  postUser,
  getHashByUsername,
  getLanguages,
  checkUsername,
  checkEmail,
  getUser,
  postUserLanguage,
  postUserLanguageDefault,
  postWord,
  deleteWord,
  postUserLanguageVoice,
  postUserNativeLanguageVoice,
  postFlashcardAttempt
};
