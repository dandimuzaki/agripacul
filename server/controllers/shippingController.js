import QueryString from 'qs';
import rajaOngkirServices from '../services/rajaOngkirServices.js';

const cache = new Map();

export const fetchShippingOptions = async (req, res) => {
  try {
    const key = JSON.stringify(req.body); // origin+dest+weight+courier
    if (cache.has(key)) {
      return res.status(200).json({
        success: true,
        message: 'Shipping options fetched successfully', 
        data: cache.get(key)
      });
    }

    const shippingData = QueryString.stringify(req.body);
    const shippingOptions = await rajaOngkirServices.fetchShippingOptions(shippingData);

    if (!shippingOptions) {
      return res.status(404).json({
        success: false,
        message: 'Shipping options are not found', 
        errors: null
      });
    }

    cache.set(key, shippingOptions.data);
    return res.status(200).json({
      success: true,
      message: 'Shipping options fetched successfully',
      data: shippingOptions.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shipping options', 
      errors: err.message
    });
  }
};
