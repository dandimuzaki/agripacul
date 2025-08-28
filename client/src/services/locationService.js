import axios from 'axios';

export const getProvinces = async () => {
  const res = await axios.get('http://localhost:3000/api/location/provinces');
  return res.data;
};

export const getCities = async (provinceId) => {
  const res = await axios.get(`http://localhost:3000/api/location/cities/${provinceId}`);
  return res.data;
};

export const getDistricts = async (cityId) => {
  const res = await axios.get(`http://localhost:3000/api/location/districts/${cityId}`);
  return res.data;
};

export const getSubdistricts = async (districtId) => {
  const res = await axios.get(`http://localhost:3000/api/location/subdistricts/${districtId}`);
  return res.data;
};