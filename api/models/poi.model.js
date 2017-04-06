import mongoose from 'mongoose';

/**
 * Poi Schema
 */
const PoiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    index: '2d',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Poi', PoiSchema);
