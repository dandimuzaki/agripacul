import express from 'express';
import multer from 'multer';
import { storage } from '../cloudinary.js'

const router = express.Router();
const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  return res.json({ secure_url: req.file.path });
})

export default router