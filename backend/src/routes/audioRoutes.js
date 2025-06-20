import { Router } from "express";
import axios from "axios";
import { authenticateToken } from "../utils/utils.js";

const router = Router();

/****************************/
router.get("/voices", authenticateToken, async (req, res) => {
  try {
    const response = await axios.get("http://opentts:5500/api/voices");
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching voices:", err.message);
    res.status(500).json({ error: "Voice fetch failed" });
  }
});

router.get("/audio", authenticateToken, async (req, res) => {
  const { voice, text } = req.query;
  try {
    const response = await axios.get(
      `http://opentts:5500/api/tts?voice=${encodeURIComponent(
        voice
      )}&text=${encodeURIComponent(text)}`,
      {
        responseType: "arraybuffer",
      }
    );
    console.log(response.headers["content-type"]);
    res.set("Content-Type", "audio/wav");
    res.send(response.data);
  } catch (err) {
    console.error("Error fetching audio:", err.message);
    res.status(500).json({ error: "Audio fetch failed" });
  }
});

export default router;
