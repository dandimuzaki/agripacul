import { useAddress } from '@/context/AddressContext';
import { Check } from 'lucide-react';
import React from 'react'

const AddressCard = ({ address }) => {
  const { _id, recipientName, phoneNumber, label, province, city, subDistrict, fullAddress } = address;
  const { selectAddress, selectedAddress, editAddress, deleteAddress, handleMainAddress } = useAddress()
  let isSelected = false;
  if (selectedAddress) {
    isSelected = (selectedAddress._id == _id)
  }

  return (
    <div className={`flex justify-center p-4 gap-4 rounded-lg ${isSelected ? 'border border-[var(--primary-dark)] bg-[var(--primary)]/20' : 'shadow-[0_0_4px_rgba(0,0,0,0.2)]'}`}>
      <div className='flex-1'>
        <div className='flex gap-2 items-center'>
        <p className='font-semibold'>{label}</p>
        {address.mainAddress ? <p className='text-sm px-2 py-1 rounded bg-gray-200'>Default</p> : ''}
        </div>
        <p className='text-lg font-bold'>{recipientName}</p>
        <p className='text-sm'>{phoneNumber}</p>
        <p className='text-sm'>{fullAddress}</p>
        <p className='text-sm'>{subDistrict}, {city}, {province}</p>
        <div className='mt-2 text-sm flex gap-4'>
          <button onClick={() => editAddress(address)}>Edit</button>
          {(!address.mainAddress) ? <button onClick={() => handleMainAddress(address)}>Set as Main Address</button> : ''}
          <button onClick={() => deleteAddress(_id)}>Delete</button>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        {isSelected ? 
          <Check className='text-[var(--primary)]'/>
        :
          <button
        type='button'
        onClick={() => selectAddress(address)}
        className='text-sm font-bold rounded py-1 px-2 bg-[var(--primary)] text-white active:bg-[var(--primary-dark)] cursor-pointer'>
          Choose
        </button>}
      </div>
    </div>
  )
}

export default AddressCard
