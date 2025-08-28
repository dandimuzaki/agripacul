import QueryString from "qs"
import rajaOngkirServices from "../services/rajaOngkirServices.js"

const cache = new Map();

export const fetchShippingOptions = async (req, res) => {
  try {
    const key = JSON.stringify(req.body); // origin+dest+weight+courier
    if (cache.has(key)) {
      return res.json({ success: true, data: cache.get(key) });
    }

    const shippingData = QueryString.stringify(req.body);
    const shippingOptions = await rajaOngkirServices.fetchShippingOptions(shippingData);

    cache.set(key, shippingOptions.data); // store in memory
    return res.status(200).json({
      success: true,
      message: "Shipping options fetched successfully",
      data: shippingOptions.data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
