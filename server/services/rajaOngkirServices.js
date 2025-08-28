import axios from 'axios';

const client = axios.create({
  baseURL: process.env.RAJAONGKIR_BASE,
  headers: { key: process.env.RAJAONGKIR_API_KEY }
});

export default {
  fetchProvinces: async () => {
    const { data } = await client.get('/destination/province');
    return data;
  },

  fetchCities: async (provinceId) => {
    const { data } = await client.get(`/destination/city/${provinceId}`);
    return data;
  },

  fetchDistricts: async (cityId) => {
    const { data } = await client.get(`/destination/district/${cityId}`);
    return data;
  },

  fetchSubdistricts: async (districtId) => {
    const { data } = await client.get(`/destination/sub-district/${districtId}`);
    return data;
  },

  fetchShippingOptions: async (shippingData) => {
    try {
      const { data } = await client.post(
        '/calculate/district/domestic-cost',
        shippingData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
      return data;
    } catch (err) {
      console.error('Error fetching shipping option', err.response?.data || err.message);
      throw err;
    }
  }
};