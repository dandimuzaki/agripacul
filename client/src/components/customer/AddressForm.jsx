import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAddress } from '@/context/AddressContext';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AddressForm = () => {
  const {
    cancelAddress,
    openAddressForm,
    setOpenAddressForm,
    currentEditAddress,
    saveAddress,
    fetchProvinces,
    provinceList,
    fetchCities,
    cityList,
    fetchDistricts,
    districtList,
    setDistrictList,
    fetchSubdistricts,
    subdistrictList,
    setSubdistrictList
  } = useAddress();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      'recipientName': currentEditAddress?.recipientName,
      'phoneNumber': currentEditAddress?.phoneNumber,
      'label': currentEditAddress?.label,
      'province': currentEditAddress?.province.id,
      'city': currentEditAddress?.city.id,
      'district': currentEditAddress?.district.id,
      'subdistrict': currentEditAddress?.subdistrict.id,
      'detail': currentEditAddress?.detail
    } || {
      'recipientName': '',
      'phoneNumber': '',
      'label': '',
      'province': '',
      'city': '',
      'subdistrict': '',
      'detail': ''
    }
  });

  useEffect(() => {
    if (openAddressForm) {
      fetchProvinces();
      reset({
        'recipientName': currentEditAddress?.recipientName,
      'phoneNumber': currentEditAddress?.phoneNumber,
      'label': currentEditAddress?.label,
      'province': currentEditAddress?.province.id,
      'city': currentEditAddress?.city.id,
      'district': currentEditAddress?.district.id,
      'subdistrict': currentEditAddress?.subdistrict.id,
      'detail': currentEditAddress?.detail
      } || {
        recipientName: '',
        phoneNumber: '',
        label: '',
        province: '',
        city: '',
        subdistrict: '',
        detail: ''
      });
    }
  }, [openAddressForm, currentEditAddress, reset]);

  const watchProvince = watch('province');
  const watchCity = watch('city');
  const watchDistrict = watch('district');

  useEffect(() => {
    if (watchProvince) {
      fetchCities(watchProvince);
      setDistrictList([]);
      setSubdistrictList([]);
    }
  }, [watchProvince]);

  useEffect(() => {
    if (watchCity) {
      fetchDistricts(watchCity);
      setSubdistrictList([]);
    }
  }, [watchCity]);

  useEffect(() => {
    if (watchDistrict) {
      fetchSubdistricts(watchDistrict);
    }
  }, [watchDistrict]);

  return (
    <Dialog open={openAddressForm} onOpenChange={() => setOpenAddressForm(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
          onClick={() => console.log(currentEditAddress)}
          >{currentEditAddress ? 'Edit' : 'Add'} Address</DialogTitle>
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

          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <div className="grid gap-3">
                <Label htmlFor="province">Province</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Set the province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinceList.map((province) => (
                      <SelectItem
                        key={province._id}
                        value={province._id}
                      >
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>)}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Set the city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityList.map((city) => (
                      <SelectItem
                        key={city._id}
                        value={city._id}
                      >
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>)}
          />

          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <div className="grid gap-3">
                <Label htmlFor="district"
                onClick={() => {
                  console.log(field.value)
                  console.log(currentEditAddress?.district.id)
                }}
                >District</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Set the district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districtList.map((district) => (
                      <SelectItem
                        key={district._id}
                        value={district._id}
                      >
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>)}
          />

          <Controller
            name="subdistrict"
            control={control}
            render={({ field }) => (
              <div className="grid gap-3">
                <Label htmlFor="subdistrict">Sub District</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Set the subdistrict" />
                  </SelectTrigger>
                  <SelectContent>
                    {subdistrictList.map((subdistrict) => (
                      <SelectItem
                        key={subdistrict._id}
                        value={subdistrict._id}
                      >
                        {subdistrict.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>)}
          />

          <div className='grid gap-3 col-span-2'>
            <Label htmlFor='detail'>Full Address</Label>
            <Input {...register('detail')} id='detail' name='detail' />
          </div>
          <div className='flex items-center gap-3 col-span-2'>
            <Checkbox id='mainAddress'
              defaultChecked={currentEditAddress?.mainAddress}
              onCheckedChange={(checked) => setValue('mainAddress', checked)}/>
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
          <div className='w-10 h-10 bg-green-500' onClick={() => console.log(watchProvince)}></div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
