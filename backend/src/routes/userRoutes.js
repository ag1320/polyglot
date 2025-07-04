import { Router } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  postUser,
  getHashByUsername,
  checkUsername,
  checkEmail,
  getUser,
  postUserLanguage,
  postUserLanguageDefault,
  postUserLanguageVoice,
  postUserNativeLanguageVoice
} from "../controllers/controllers.js";
import {
  hashPassword,
  verifyPassword,
  authenticateToken,
} from "../utils/utils.js";

dotenv.config();
const router = Router();

/****************************
Routes
****************************/
router.post("/users", async (req, res) => {
  const {
    email,
    username,
    password,
    nativeLanguageId,
    nativeLanguageVoice,
    learningLanguageId,
    learningLanguageVoice,
    name,
  } = req.body;
  const hash = await hashPassword(password);

  try {
    // Check if email already exists in the database
    const emailResponse = await checkEmail(email);
    if (emailResponse) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Proceed with user creation if email is unique
    const userId = await postUser(email, username, hash, nativeLanguageId, nativeLanguageVoice, name);

    await postUserLanguage(learningLanguageId, userId, true, learningLanguageVoice);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
});

router.get("/users", authenticateToken, async (req, res) => {
  try {
    const data = await getUser({ id: req.user.id });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const user = await checkUsername(username);
    res.status(200).json({ isAvailable: !user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check username" });
  }
});

router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const emailResponse = await checkEmail(email);
    res.status(200).json({ isAvailable: !emailResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check email" });
  }
});
router.get("/verify-user", async (req, res) => {
  const { username, password } = req.query;

  try {
    const hash = await getHashByUsername(username);
    const isVerified = await verifyPassword(hash, password);
    console.log("111111111111111111111111111")
    if (!isVerified) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log("222222222222222222222222222222222")
    const user = await getUser({ username });
    console.log("33333333333333333333333333333333333")
    const payload = { id: user.id, username: user.username };
    console.log("44444444444444444444444444444444444")
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1h",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/user-language", authenticateToken, async (req, res) => {
  const { newLanguage, isDefault, voice } = req.body;
  const userId = req.user.id;
  console.log("Received new language:", { newLanguage, userId });
  try {
    await postUserLanguage(newLanguage.id, userId, isDefault, voice);
    res.status(201).json({ message: "Language added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add language");
  }
});

router.post("/user-language-default", authenticateToken, async (req, res) => {
  const { languageId } = req.body;
  const userId = req.user.id;
  console.log("Received new default:", { languageId, userId });
  try {
    await postUserLanguageDefault(languageId, userId);
    res.status(201).json({ message: "Language default changed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to change language default");
  }
});

router.post("/user-language-voice", authenticateToken, async (req, res) => {
  const { voice, languageId } = req.body;
  const userId = req.user.id;
  console.log("Received new voice:", { voice, languageId, userId });
  try {
    await postUserLanguageVoice(voice, languageId, userId);
    res.status(201).json({ message: "Voice preference changed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to change voice preference");
  }
});

router.post("/user-native-language-voice", authenticateToken, async (req, res) => {
  const { voice } = req.body;
  const userId = req.user.id;
  console.log("Received new native voice:", { voice, userId });
  try {
    await postUserNativeLanguageVoice(voice, userId);
    res.status(201).json({ message: "Voice preference changed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to change voice preference");
  }
});

export default router;
