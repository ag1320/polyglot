import { Router } from "express";
import argon2 from "argon2";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { 
  postUser, 
  getHashByUsername,
  checkUsername,
  checkEmail,
  getUserByUsername
} from "../controllers/controllers.js";

dotenv.config();
const router = Router();

/****************************
Helper functions
****************************/
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user; // Attach user payload to request
    next();
  });
}

/****************************
Routes
****************************/
router.post("/users", async (req, res) => {
  const { email, username, password, nativeLanguageId } = req.body;
  const hash = await hashPassword(password);

  try {
    // Check if email already exists in the database
    const emailResponse = await checkEmail(email);
    if (emailResponse) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Proceed with user creation if email is unique
    const data = await postUser(email, username, hash, nativeLanguageId);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
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

    // Create JWT payload
    const payload = { username };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1h",
    });

    //get user data
    const user = await getUserByUsername(username);

    // Send token back to client
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
