import express from 'express';
import multer from 'multer';
import { cloudinary } from '../cloudinary.js';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'agripacul',
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    return res.json({ secure_url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error); // Add this
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message || error,
    });
  }

});

export default router;