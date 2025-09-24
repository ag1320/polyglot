import { Router } from "express";
import { postFlashcardAttempt, postWord, deleteWord } from "../controllers/controllers.js";
import { authenticateToken } from "../utils/utils.js";

const router = Router();

/****************************/
router.post("/words", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const { sourceWord, translatedWord, sourceLangId, targetLangId } = req.body;
    if (
      !sourceWord ||
      !translatedWord ||
      !sourceLangId ||
      !targetLangId ||
      !userId
    ) {
      return res
        .status(400)
        .json({
          error:
            "Missing wordSource, wordTranslated, userId, languageSourceId, or languageTargetId.",
        });
    }
    await postWord(
      sourceWord,
      translatedWord,
      sourceLangId,
      targetLangId,
      userId
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Word post failed" });
  }
});

router.delete("/words", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const { wordId } = req.body;
    if (!wordId || !userId) {
      return res.status(400).json({ error: "Missing wordId or userId." });
    }
    await deleteWord(wordId, userId)
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Delete word error:", err);
    res.status(500).json({ error: "Word delete failed" });
  }
});

router.post("/flashcard-attempt", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const { wordId, languageId, isCorrect } = req.body;
    await postFlashcardAttempt(wordId, userId, languageId, isCorrect);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Flashcard attempt error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "error posting flashcard attempt" });
    }
  }
});

export default router;
