import { useEffect, useState } from "react";
import { AddressContext } from "./AddressContext"
import { addressDummy } from "@/utils/addressDummy";
import { addNewAddress, getAddressList, getProvinceList, removeAddress, updateAddress } from "@/services/addressApi";

export const AddressProvider = ({ children }) => {
  const [openAddressList, setOpenAddressList] = useState(false);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [addressList, setAddressList] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [currentEditAddress, setCurrentEditAddress] = useState(null);
  const [provinceList, setProvinceList] = useState([])
  const [cityList, setCityList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [subdistrictList, setSubdistrictList] = useState([])

  useEffect(() => {
    const getUserAddressList = async () => {
      try {
        const addressData = await getAddressList()
        setAddressList(addressData.data)
        const mainAddress = addressData.data.find((address) => address.mainAddress)
        if (mainAddress) {
          setSelectedAddress(mainAddress)
        }
      } catch (err) {
        console.error('Error retrieving address list', err)
      }
    }
    getUserAddressList()
  }, [])

  useEffect(() => {
    const getProvinces = async () => {
      try {
      const result = await getProvinceList()
      setProvinceList(result)
      } catch (err) {
        console.error('Failed fetching provinces', err)
      }
    }
    getProvinces();
  })

  const selectAddress = (address) => {
    setSelectedAddress(address)
    setOpenAddressList(false);
  }

  const saveAddress = async (formData) => {
    if (currentEditAddress) {
      const updatedAddressList = await updateAddress({addressId: currentEditAddress._id, formData})
      setAddressList(updatedAddressList.data)
    } else {
      const updatedAddressList = await addNewAddress(formData)
      setAddressList(updatedAddressList.data)
    }
    setOpenAddressForm(false)
    setCurrentEditAddress(null)
  }

  const handleMainAddress = async (address) => {
    const updatedAddressList = await updateAddress(
      {
        addressId: address._id,
        formData: { ...address, mainAddress: true }
      }
    )
    setAddressList(updatedAddressList.data)
  }

  const editAddress = (address) => {
    setCurrentEditAddress(address)
    setOpenAddressForm(true)
  }

  const cancelAddress = () => {
    setCurrentEditAddress(null)
    setOpenAddressForm(false)
  }

  const deleteAddress = async (addressId) => {
    console.log(addressId)
    const updatedAddressList = await removeAddress(addressId)
    setAddressList(updatedAddressList.data)
  }

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
      provinceList
    }}>
      {children}
    </AddressContext.Provider>
  )
}