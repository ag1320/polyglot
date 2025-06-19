import { Router } from "express";
import { 
  postWord
} from "../controllers/controllers.js";
import {
  authenticateToken,
} from "../utils/utils.js";

const router = Router();

/****************************/
router.post("/words", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const { sourceWord, translatedWord, sourceLangId, targetLangId } = req.body;
    if (!sourceWord || !translatedWord || !sourceLangId || !targetLangId || !userId ) {
      return res.status(400).json({ error: "Missing wordSource, wordTranslated, userId, languageSourceId, or languageTargetId." });
    }

    await postWord(sourceWord, translatedWord, sourceLangId, targetLangId, userId);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Word post failed" });
  }
});

export default router;