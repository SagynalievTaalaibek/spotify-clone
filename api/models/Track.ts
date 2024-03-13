import { model, Schema, Types } from 'mongoose';
import Album from './Album';
import User from './User';

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!',
    },
  },
  duration: String,
  albumTrackNumber: {
    type: Number,
    required: true,
  },
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

const Track = model('Track', TrackSchema);
export default Track;
