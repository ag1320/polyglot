import axios from "axios";

const translateWord = async (word, from, to) => {
  const response = await axios.post("http://libretranslate:5000/translate", {
    q: word,
    source: from,
    target: to,
    format: "text"
  });
  return response.data.translatedText;
}

export { translateWord };
