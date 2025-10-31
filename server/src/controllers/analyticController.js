import Analytic from '../models/Analytic.js';
import Order from '../models/Order.js';

export const getMonthlyStats = async (req, res) => {
  try {
    const monthlyStats = await Order.aggregate([
      /*{ $match: { status: 'finished' } },*/
      // 1️⃣ Unwind array so each product counts separately
      { $unwind: '$itemsSnapshot' },

      // 2️⃣ Group by year, month, and category
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            category: '$itemsSnapshot.product.category'
          },
          totalOrders: { $sum: 1 },
          totalSales: { $sum: '$itemsSnapshot.quantity' },
          totalRevenue: { $sum: '$totalPrice' },
          totalRating: { $sum: '$itemsSnapshot.product.rating' },
          totalRatingCount: { $sum: '$itemsSnapshot.product.ratingCount' },
        }
      },

      // 3️⃣ Optionally regroup to collect categories under each month
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month'
          },
          totalOrders: { $sum: '$totalOrders' },
          totalRevenue: { $sum: '$totalRevenue' },
          totalSales: { $sum: '$totalSales' },
          totalRating: { $sum: '$totalRating' },
          totalRatingCount: { $sum: '$totalRatingCount' },
          categories: {
            $push: {
              category: '$_id.category',
              sales: '$totalSales',
              rating: '$totalRating',
              ratingCount: '$totalRatingCount',
            }
          }
        }
      },

      // 4️⃣ Sort chronologically
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      },

      { $limit: req.query.limit || 5 }
    ]);
    res.status(200).json({
      success: true,
      message: 'Monthly stats fetched succesfully',
      data: monthlyStats
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly stats',
      errors: err.message
    });
  }
};

export const getTotalStats = async (req, res) => {
  try {
    const totalStats = await Order.aggregate([
      /*{ $match: { status: 'finished' } },*/
      { $unwind: '$itemsSnapshot' },

      {
        $group: {
          _id: {
            category: '$itemsSnapshot.product.category'
          },
          totalOrders: { $sum: 1 },
          totalSales: { $sum: '$itemsSnapshot.quantity' },
          totalRevenue: { $sum: '$totalPrice' },
          totalRating: { $sum: '$itemsSnapshot.product.rating' },
          totalRatingCount: { $sum: '$itemsSnapshot.product.ratingCount' },
        }
      },

      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
          totalRating: { $sum: '$itemsSnapshot.product.rating' },
          totalRatingCount: { $sum: '$itemsSnapshot.product.ratingCount' },
          totalSales: { $sum: '$itemsSnapshot.quantity' },
          categories: {
            $push: {
              category: '$_id.category',
              sales: '$totalSales',
              rating: '$totalRating',
              ratingCount: '$totalRatingCount',
            }
          }
        }
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'Total stats fetched succesfully',
      data: totalStats[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total stats',
      errors: err.message
    });
  }
};