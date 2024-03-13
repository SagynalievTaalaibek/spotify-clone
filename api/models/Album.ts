import { Schema, Types, model } from 'mongoose';
import Artist from './Artist';
import User from './User';

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
  yearOfIssue: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => {
        const user = await User.findById(id);
        return Boolean(user);
      },
      message: 'User not found!',
    },
  },
});

const Album = model('Album', AlbumSchema);
export default Album;
