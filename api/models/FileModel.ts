import mongoose, { model } from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const FileModel = model('FileModel', FileSchema);
export default FileModel;
