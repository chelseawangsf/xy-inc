import Promise from 'bluebird'; //eslint-disable-line
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
    min: 0,
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

/**
 * Methods
 */
PoiSchema.method({
});

/**
 * Statics
 */
PoiSchema.statics = {
  /**
   * List pois in descending order of 'created_at' timestamp.
   * @param {number} skip - Number of pois to be skipped.
   * @param {number} limit - Limit number of pois to be returned.
   * @returns {Promise<Poi[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },
};

/**
 * @typedef Poi
 */
export default mongoose.model('Poi', PoiSchema);
