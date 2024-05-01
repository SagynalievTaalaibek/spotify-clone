import express from "express";
import { imagesUpload } from '../multer';

const router = express.Router();

router.post('/upload-image', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const image = req.file ? req.file.filename : null;

    return res.status(200).json({filename: image});
  } catch (e) {
    next(e);
  }
});


export default router;