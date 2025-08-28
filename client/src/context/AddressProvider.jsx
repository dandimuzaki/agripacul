import { useEffect, useState } from 'react';
import { AddressContext } from './AddressContext';
import { addressDummy } from '@/utils/addressDummy';
import { addNewAddress, getAddressList, removeAddress, updateAddress } from '@/services/addressApi';
import { getCities, getDistricts, getProvinces, getSubdistricts } from '@/services/locationService';

export const AddressProvider = ({ children }) => {
  const [openAddressList, setOpenAddressList] = useState(false);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentEditAddress, setCurrentEditAddress] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [subdistrictList, setSubdistrictList] = useState([]);

  useEffect(() => {
    const getUserAddressList = async () => {
      try {
        const addressData = await getAddressList();
        setAddressList(addressData.data);
        const mainAddress = addressData.data.find((address) => address.mainAddress);
        if (mainAddress) {
          setSelectedAddress(mainAddress);
        }
      } catch (err) {
        console.error('Error retrieving address list', err);
      }
    };
    getUserAddressList();
  }, []);

  const fetchProvinces = async () => {
    try {
      const provinces = await getProvinces();
      setProvinceList(provinces.data);
    } catch (err) {
      console.error('Error fetching provinces', err);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const cities = await getCities(provinceId);
      setCityList(cities.data);
    } catch (err) {
      console.error('Error fetching cities', err);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const districts = await getDistricts(cityId);
      setDistrictList(districts.data);
    } catch (err) {
      console.err('Error fetching districts', err);
    }
  };

  const fetchSubdistricts = async (districtId) => {
    try {
      const subdistricts = await getSubdistricts(districtId);
      setSubdistrictList(subdistricts.data);
    } catch (err) {
      console.error('Error fetching subdistricts', err);
    }
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
    setOpenAddressList(false);
  };

  const saveAddress = async (formData) => {
    console.log(formData);
    if (currentEditAddress) {
      const updatedAddressList = await updateAddress({ addressId: currentEditAddress._id, formData });
      setAddressList(updatedAddressList.data);
    } else {
      const updatedAddressList = await addNewAddress(formData);
      setAddressList(updatedAddressList.data);
    }
    setOpenAddressForm(false);
    setCurrentEditAddress(null);
  };

  const handleMainAddress = async (address) => {
    const updatedAddressList = await updateAddress(
      {
        addressId: address._id,
        formData: { ...address, mainAddress: true }
      }
    );
    setAddressList(updatedAddressList.data);
  };

  const editAddress = (address) => {
    setCurrentEditAddress(address);
    setOpenAddressForm(true);
  };

  const cancelAddress = () => {
    setCurrentEditAddress(null);
    setOpenAddressForm(false);
  };

  const deleteAddress = async (addressId) => {
    console.log(addressId);
    const updatedAddressList = await removeAddress(addressId);
    setAddressList(updatedAddressList.data);
  };

  return (
    <AddressContext.Provider value={{
      openAddressList, setOpenAddressList,
      openAddressForm, setOpenAddressForm,
      addressList, setAddressList,
      selectedAddress, setSelectedAddress,
      selectAddress,
      editAddress, cancelAddress,
      currentEditAddress, setCurrentEditAddress,
      handleMainAddress,
      saveAddress, deleteAddress,
      fetchProvinces, provinceList,
      fetchCities, cityList, setCityList,
      fetchDistricts, districtList, setDistrictList,
      fetchSubdistricts, subdistrictList, setSubdistrictList
    }}>
      {children}
    </AddressContext.Provider>
  );
};