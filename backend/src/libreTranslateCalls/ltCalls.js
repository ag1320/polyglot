import axios from "axios";

const translateWord = async (word, from, to) => {
  //from and to are language codes, e.g. "en" for English, "es" for Spanish
  const response = await axios.post("http://libretranslate:5000/translate", {
    q: word,
    source: from,
    target: to,
    format: "text"
  });
  return response.data.translatedText;
}

const batchTranslateWords = async (words, from, to) => {
  //words is an array of words to translate
  //from and to are language codes, e.g. "en" for English, "es" for Spanish
  const response = await axios.post("http://libretranslate:5000/translate", {
    q: words,
    source: from,
    target: to,
    format: "text"
  });
  return response.data.translatedText;
}

export { translateWord, batchTranslateWords };
