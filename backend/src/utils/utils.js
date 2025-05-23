import jwt from 'jsonwebtoken';
import argon2 from "argon2";

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

export { 
  hashPassword,
  verifyPassword,
  authenticateToken 
};