import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
  address: {
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
  },
  shipping: {
    code: {type: String},
    name: {type: String},
    service: {type: String},
    cost: {type: Number},
    etd: {type: String}
  },
  paymentMethod: {
    code: { type: String },
    name: { type: String }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalBill: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  confirmedAt: {
    type: Date,
  },
  shippedAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
