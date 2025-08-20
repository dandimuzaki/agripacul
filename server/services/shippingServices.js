import axios from "axios";

const client = axios.create({
  baseURL: process.env.RAJAONGKIR_BASE,
  headers: { key: process.env.RAJAONGKIR_API_KEY }
})

export default {
  getProvinces: async () => {
    const { data } = await client.get('/destination/province')
    return data;
  },

  getCities: async (provinceId) => {
    const { data } = await client.get(`/destination/city/${provinceId}`)
    return data;
  },

  getDistricts: async (cityId) => {
    const { data } = await client.get(`/destination/district/${cityId}`)
    return data;
  },

  getSubdistricts: async (districtId) => {
    const { data } = await client.get(`/destination/sub-district/${districtId}`)
    return data;
  },

  getShippingOption: async (shippingData) => {
    try {
      const { data } = await client.post(
        '/calculate/district/domestic-cost',
        new URLSearchParams(shippingData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      )
       return data;
    } catch (err) {
      console.error('Error fetching shipping option', err.response?.data || err.message)
      throw err;
    }
  } 
}