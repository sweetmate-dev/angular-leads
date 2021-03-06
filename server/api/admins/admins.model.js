import mongoose from 'mongoose';
const {Schema} = mongoose;

const AdminsSchema = new Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    uinique: true
  },

  password: {
    type: String,
    required: true
  },

  settings: {
    theme: {
      type: String,
      default: 'default'
    },
    email: {
      type: String
    }
  }
});

export const Admins = mongoose.model('admins', AdminsSchema);
