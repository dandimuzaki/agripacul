import { useImage } from '@/context/ImageContext';
import { useProduct } from '@/context/ProductContext';
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { ClipLoader } from 'react-spinners';

const ProductForm = () => {
  const { selectedProduct, product, isModalOpen, closeModal, handleSave, isLoading } = useProduct();
  const { preview, handleChangeImage } = useImage();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues:
      product || {
        'title': '',
        'description': '',
        'price': 0,
        'weight': 0,
        'category': '',
        'rating': 0,
        'stock': 0,
        'image': '',
        'sold': 0,
        'status': '',
        'unit': ''
      }

  });

  useEffect(() => {
    if (isModalOpen && product) {
      reset(product);
    } else {
      reset({
        title: '',
        description: '',
        price: 0,
        category: '',
        rating: 0,
        stock: 0,
        image: '',
        sold: 0,
        status: '',
        weight: 0,
        unit: ''
      });
    }
  }, [isModalOpen, product, reset]);

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle
            onClick={() => console.log(product)}
          >
            {selectedProduct ? 'Edit' : 'Create'} Product
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} className='grid md:grid-cols-3 grid-cols-1 gap-5'>
          <div className='flex flex-col items-center gap-4 md:row-span-4'>
            <div
              className={`${
                preview ? 'border-none' : 'border border-gray-300'
              } overflow-hidden rounded-lg w-full max-w-[280px] h-40 sm:h-48 md:h-full flex`}
            >
              {(preview || product?.image) && (
                <img
                  src={preview || product?.image}
                  alt="Preview"
                  className="w-full h-full object-cover flex-1"
                />)
              }
            </div>
            <Label
              htmlFor='file-upload'
              className="flex justify-center h-fit w-fit cursor-pointer bg-gray-200 text-center rounded px-3 py-2 text-sm hover:bg-gray-300"
            >
              {product ? 'Change Image' : 'Add Image'}
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              className="hidden"
            />
          </div>

          <div className='grid gap-2 md:col-span-2'>
            <Label htmlFor='title'>Title</Label>
            <Input {...register('title')} id='title' name='title' />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <div className='grid gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  id='category' name='category'>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Category'/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='vegetables'>Vegetables</SelectItem>
                    <SelectItem value='foods'>Foods</SelectItem>
                    <SelectItem value='flowers'>Flowers</SelectItem>
                    <SelectItem value='tools'>Tools</SelectItem>

                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category.message}</p>
                )}
              </div>
            )}/>

          <div className='grid gap-2'>
            <Label htmlFor='price'>Price</Label>
            <Input type='number' {...register('price')} id='price' name='price' />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='stock'>Stock</Label>
            <Input type='number' {...register('stock')} id='stock' name='stock' />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='weight'>Weight <span className='text-xs'>{'(gram)'}</span></Label>
            <Input type='number' {...register('weight')} id='weight' name='weight' />
            {errors.weight && (
              <p className="text-red-500 text-xs">{errors.weight.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='unit'>Unit</Label>
            <Input {...register('unit')} id='unit' name='unit' />
            {errors.unit && (
              <p className="text-red-500 text-xs">{errors.unit.message}</p>
            )}
          </div>

          <div className='md:col-span-2 grid gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea placeholder='Type the description here' {...register('description')} id='description' name='description' />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>

          <div className="md:col-span-3 flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 active:bg-gray-300 text-black font-semibold rounded w-40 text-center"
            >
          Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[var(--primary)] active:bg-[var(--primary-dark)] text-white font-semibold rounded w-40 text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader color='#ffffff' size={16} />
                  <span>Saving</span>
                </div>
              ) : product ? (
                'Update Changes'
              ) : (
                'Add Product'
              )}
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
