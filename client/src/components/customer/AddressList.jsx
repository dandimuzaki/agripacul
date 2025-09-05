import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import AddressCard from './AddressCard';
import { useAddress } from '@/context/AddressContext';

const AddressList = () => {
  const { addressList, openAddressList, setOpenAddressList, setOpenAddressForm } = useAddress();

  return (
    <Dialog open={openAddressList} onOpenChange={setOpenAddressList}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Address List</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4'>
          <button
            type='button'
            onClick={() => setOpenAddressForm(true)}
            className='rounded-lg bg-[var(--primary)] p-2 font-bold text-white cursor-pointer active:bg-[var(--primary-dark)]'>Add New Address</button>
          <div className='grid gap-4'>
            {addressList.map((address, i) =>
              <AddressCard address={address} key={i} />
            )}
          </div>
        </div>
        <div className='h-10 w-10 bg-red-500' onClick={() => console.log(addressList)}></div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressList;
