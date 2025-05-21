import { Router } from "express";
import { 
  getLanguages
} from "../controllers/controllers.js";
import { translateWord } from "../libreTranslateCalls/ltCalls.js"

const router = Router();

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

router.post("/translate", async (req, res) => {
  try {
    const { text, from, to } = req.body;
    console.log("Received translation request:", { text, from, to });
    if (!text || !from || !to) {
      return res.status(400).json({ error: "Missing text, from, or to language code." });
    }

    const translated = await translateWord(text, from, to);
    res.status(200).json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Translation failed." });
  }
});

export default router;
