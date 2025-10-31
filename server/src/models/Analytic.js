import mongoose from 'mongoose';

const categoricalAnalyticSchema = new mongoose.Schema({
  category: {
    type: String
  },
  sales: {
    type: Number
  },
  rating: {
    type: Number
  },
  ratingCount: {
    type: Number
  }
}, { timestamps: true });

const monthlyAnalyticSchema = new mongoose.Schema({
  totalRevenue: {
    type: Number
  },
  totalOrders: {
    type: Number
  },
  categories: [categoricalAnalyticSchema],
  totalSales: {
    type: Number
  },
  totalRating: {
    type: Number
  },
  totalRatingCount: {
    type: Number
  }
}, { timestamps: true });

const analyticSchema = new mongoose.Schema({
  monthlyAnalytic: [monthlyAnalyticSchema],
  intervalAnalytic: monthlyAnalyticSchema,
  totalAnalytic: monthlyAnalyticSchema
}, { timestamps: true });

const Analytic = mongoose.model('Analytic', analyticSchema);

export default Analytic;