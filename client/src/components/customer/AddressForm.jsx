import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAddress } from '@/context/AddressContext'
import { useForm } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'

const AddressForm = () => {
  const { cancelAddress, openAddressForm, setOpenAddressForm, currentEditAddress, saveAddress } = useAddress()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: currentEditAddress || {
      'recipientName': '',
      'phoneNumber': '',
      'label': '',
      'province': '',
      'city': '',
      'subDistrict': '',
      'fullAddress': ''
    }
  })

  useEffect(() => {
    if (openAddressForm && currentEditAddress) {
      reset(currentEditAddress);
    } else {
      reset({
        recipientName: '',
        phoneNumber: '',
        label: '',
        province: '',
        city: '',
        subDistrict: '',
        fullAddress: ''
      })
    }
  }, [openAddressForm, currentEditAddress, reset])

  return (
    <Dialog open={openAddressForm} onOpenChange={() => setOpenAddressForm(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle onClick={() => console.log(currentEditAddress)}>Add Address</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(saveAddress)}
            className='grid grid-cols-2 gap-y-4 gap-x-5'
          >
            <div className='grid gap-3'>
              <Label htmlFor='recipientName'>Recipient Name</Label>
              <Input {...register('recipientName')} id='recipientName' name='recipientName' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='phoneNumber'>Phone Number</Label>
              <Input {...register('phoneNumber')} id='phoneNumber' name='phoneNumber' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='label'>Label</Label>
              <Input {...register('label')} id='label' name='label' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='province'>Province</Label>
              <Input {...register('province')} id='province' name='province' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='city'>City</Label>
              <Input {...register('city')} id='city' name='city' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='subDistrict'>Sub-District</Label>
              <Input {...register('subDistrict')} id='subDistrict' name='subDistrict' />
            </div>
            <div className='grid gap-3 col-span-2'>
              <Label htmlFor='fullAddress'>Full Address</Label>
              <Input {...register('fullAddress')} id='fullAddress' name='fullAddress' />
            </div>
            <div className='flex items-center gap-3 col-span-2'>
              <Checkbox id='mainAddress'
              defaultChecked={currentEditAddress?.mainAddress}
              onCheckedChange={(checked) => setValue("mainAddress", checked)}/>
              <Label htmlFor='mainAddress'>Set as the main address</Label>
            </div>
            <div className="flex justify-center gap-3 mt-3 col-span-2">
            <Button variant="secondary" type="button" onClick={cancelAddress}>
              Cancel
            </Button>
            <Button variant="default">
              Save
            </Button>
          </div>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default AddressForm
