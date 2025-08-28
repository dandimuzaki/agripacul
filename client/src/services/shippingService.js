import axios from "axios"

export const getShipping = async (shippingData) => {
  const res = await axios.post('http://localhost:3000/api/shipping', shippingData);
  return res.data;
}