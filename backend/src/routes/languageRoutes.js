import { Router } from "express";
import { 
  getLanguages
} from "../controllers/controllers.js";
import { batchTranslateWords, translateWord } from "../libreTranslateCalls/ltCalls.js"
import {
  authenticateToken,
} from "../utils/utils.js";

const router = Router();

//NEED TO AUTH TOKEN

/****************************
Routes
****************************/

router.get("/languages", async (req, res) => {
  try {
    const data = await getLanguages();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to get languages");
  }
});

router.post("/translate-word", authenticateToken, async (req, res) => {
  try {
    const { word, from, to } = req.body;
    console.log("Received translation request:", { word, from, to });
    if (!word || !from || !to) {
      return res.status(400).json({ error: "Missing text, from, or to language code." });
    }

    const translated = await translateWord(word, from, to);
    res.status(200).json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Translation failed." });
  }
});

router.post("/translate-words", authenticateToken, async (req, res) => {
  try {
    const { words, from, to } = req.body;
    console.log("Received translation request:", { words, from, to });
    if (!words || !from || !to) {
      return res.status(400).json({ error: "Missing text, from, or to language code." });
    }

    const translated = await batchTranslateWords(words, from, to);
    res.status(200).json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Translation failed." });
  }
});

export default router;
