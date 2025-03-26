import { Router } from "express";
import argon2 from "argon2";
import { 
  postUser, 
  getHashByUsername, 
} from "../controllers/controllers.js";

const router = Router();

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 2,
    });
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

async function verifyPassword(hash, password) {
  try {
    if (await argon2.verify(hash, password)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error("Error verifying password:", err);
  }
}

router.post("/users", async (req, res) => {
  const { email, username, password, nativeLanguageId } = req.body;
  const hash = await hashPassword(password);

  try {
    const data = await postUser(email, username, hash, nativeLanguageId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
});

router.get("/verify-user", async (req, res) => {
  const { username, password } = req.query;

  try {
    const hash = await getHashByUsername(username);
    const isVerified = await verifyPassword(hash, password);
    res.status(200).json(isVerified);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to verify user");
  }
});

export default router;
