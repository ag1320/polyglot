import { Router } from "express";
import argon2 from "argon2";
import { 
  postUser, 
  getHashByUsername,
  getUsers,
  checkEmail
} from "../controllers/controllers.js";

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


/****************************
Routes
****************************/
router.post("/users", async (req, res) => {
  const { email, username, password, nativeLanguageId } = req.body;
  const hash = await hashPassword(password);

  try {
    // Check if email already exists in the database
    const existingUser = await checkEmail(email);
    if (existingUser) {
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


router.get("/users", async (req, res) => {
  try {
    const data = await getUsers();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to get users");
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
    res.status(500).json({ error: "Invalid Login Credentials" });
  }
});

export default router;
