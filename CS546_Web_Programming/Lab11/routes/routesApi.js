// Set-Up Routes
import express from 'express';
import path from 'path';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      return res.sendFile(path.resolve('static/webpage.html'));
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })

  export default router;
