import { Router } from 'express';
import dbOperations from '../controllers/controllers.js';

const router = Router();

router.post('/test', async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    const data = await dbOperations.postTest(first_name, last_name);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add test');
  }
});

export default router
