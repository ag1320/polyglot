import { Router } from "express";
import { 
  getLanguages
} from "../controllers/controllers.js";

const router = Router();

/****************************
Routes
****************************/

router.get("/languages", async (req, res) => {
  try {
    const data = await getLanguages();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to get languages");
  }
});

export default router;
