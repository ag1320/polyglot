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
} from "../controllers/controllers.js";
import {
  hashPassword,
  verifyPassword,
  authenticateToken,
} from "../utils/utils.js";

dotenv.config();
const router = Router();

/****************************
Helper functions
****************************/

/****************************
Routes
****************************/
router.post("/users", async (req, res) => {
  const {
    email,
    username,
    password,
    nativeLanguageId,
    learningLanguageId,
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
    const userId = await postUser(email, username, hash, nativeLanguageId, name);

    await postUserLanguage(learningLanguageId, userId, true);
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

    if (!isVerified) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = await getUser({ username });
    const payload = { id: user.id, username: user.username };
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
  const { newLanguage, isDefault } = req.body;
  const userId = req.user.id;
  console.log("Received new language:", { newLanguage, userId });
  try {
    await postUserLanguage(newLanguage.id, userId, isDefault);
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

export default router;
