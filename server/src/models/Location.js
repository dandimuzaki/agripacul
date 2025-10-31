import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['province', 'city', 'district', 'subdistrict'],
    required: true,
  },
  rajaOngkirId: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    default: null,
  }
});

locationSchema.index({ rajaOngkirId: 1, type: 1 }, { unique: true });

export default mongoose.model('Location', locationSchema);