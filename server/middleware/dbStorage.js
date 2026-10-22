import mongoose from 'mongoose';
import Image from '../models/Image.js';

// Multer storage engine that saves the file into MongoDB instead of the disk.
// It sets file.filename to the new document's id, so existing code that builds
// `/uploads/${req.file.filename}` keeps working unchanged.
const dbStorage = {
  _handleFile(req, file, cb) {
    const chunks = [];
    file.stream.on('data', (chunk) => chunks.push(chunk));
    file.stream.on('error', cb);
    file.stream.on('end', async () => {
      try {
        const buffer = Buffer.concat(chunks);
        const doc = await Image.create({
          data: buffer,
          contentType: file.mimetype,
          originalName: file.originalname,
        });
        cb(null, { filename: String(doc._id), size: buffer.length });
      } catch (err) {
        cb(err);
      }
    });
  },
  _removeFile(req, file, cb) {
    Image.findByIdAndDelete(file.filename).then(() => cb(null), cb);
  },
};

// GET /uploads/:id — serves an image stored in MongoDB.
// Anything that isn't a stored image id falls through to the old static folder.
export const serveImage = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return next();
  try {
    const img = await Image.findById(id).lean();
    if (!img) return next();
    res.set('Content-Type', img.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.send(img.data.buffer ? Buffer.from(img.data.buffer) : img.data);
  } catch (err) {
    next(err);
  }
};

export default dbStorage;