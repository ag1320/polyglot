import { Router } from 'express';
import {postUser} from '../controllers/controllers.js';

const router = Router();

router.post('/users', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const data = await postUser(email, username, password);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add user');
  }
});

export default router
