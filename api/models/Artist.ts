import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  information: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;
