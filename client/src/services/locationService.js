import api from '@/api/axios';

export const getProvinces = async () => {
  const res = await api.get('/location/provinces');
  return res.data;
};

export const getCities = async (provinceId) => {
  const res = await api.get(`/location/cities/${provinceId}`);
  return res.data;
};

export const getDistricts = async (cityId) => {
  const res = await api.get(`/location/districts/${cityId}`);
  return res.data;
};

export const getSubdistricts = async (districtId) => {
  const res = await api.get(`/location/subdistricts/${districtId}`);
  return res.data;
};