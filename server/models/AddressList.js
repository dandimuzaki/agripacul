import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  province: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    name: {
      type: String,
    }
  },
  city: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    name: {
      type: String,
    }
  },
  district: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    name: {
      type: String,
    }
  },
  subdistrict: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    name: {
      type: String,
    }
  },
  rajaOngkirId: {
    type: String,
  },
  detail: {
    type: String,
    required: true
  },
  pinLocation: {
    lat: { type: Number },
    lng: { type: Number },
    mapUrl: { type: String }
  },
  mainAddress: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const addressListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  addressList: [addressSchema]
}, { timestamps: true });

addressListSchema.index(
  { user: 1, 'addressList.mainAddress': 1 },
  { unique: true, partialFilterExpression: { 'addressList.mainAddress': true } }
);

const AddressList = mongoose.model('AddressList', addressListSchema);

export default AddressList;