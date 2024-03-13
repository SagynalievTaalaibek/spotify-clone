import mongoose, { Schema, Types } from 'mongoose';
import User from './User';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  information: {
    type: String,
    default: null,
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

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;
