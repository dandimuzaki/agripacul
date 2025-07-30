import React, { useEffect } from 'react';
import cherry_tomato from '../../assets/cherry_tomato.png';
import { Close } from '@mui/icons-material';
import { useProducts } from '../../context/ProductsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useImage } from '@/context/ImageContext';

const ProductModal = () => {
  const { isModalOpen, closeModal, isVisible, handleSave, selectedProduct } = useProducts();
  const { preview, handleChangeImage } = useImage();

  const handleClick = () => {
    console.log(preview)
  }

  const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .positive('Price must be a number greater than 0'),
    weight: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    rating: z.number().optional(),
    stock: z
      .number({ invalid_type_error: 'Stock must be a number' })
      .positive('Stock must be a number greater than 0'),

    image: z.string().optional(),
    sold: z.number().optional(),
    status: z.string().min(1, 'Status is required'),
    amount: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedProduct || {
      'title': '',
      'description': '',
      'price': 0,
      'weight': '',
      'category': '',
      'rating': 0,
      'stock': 0,
      'image': '',
      'sold': 0,
      'status': ''
    }
  });

  useEffect(() => {
    if (isModalOpen && selectedProduct) {
      reset(selectedProduct);
    } else {
      reset({
        title: '',
        description: '',
        price: 0,
        weight: '',
        category: '',
        rating: 0,
        stock: 0,
        image: '',
        sold: 0,
        status: '',
        amount: ''
      });
    }
  }, [isModalOpen, selectedProduct, reset, setValue]);

  if (!isVisible) return null;

  return (
    <div className={`z-500 p-10 fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-200 ${
      isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white rounded-xl p-5 transform transition-all duration-200 relative ${
        isModalOpen ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95'
      }`}>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 cursor-pointer">
          <Close/>
        </button>
        <p className="font-bold text-xl text-center mb-5">{selectedProduct ? 'Edit Product' : 'Add New Product'}</p>
        <form
          onSubmit={handleSubmit(handleSave)}
          className="grid grid-cols-3 gap-5 text-sm"
        >
          <div className='flex row-span-4 gap-5 flex-col items-center'>
            <img src={preview} className=' flex-1 rounded-lg border' />
            <input type='file' accept="image/*" onChange={handleChangeImage} className='w-fit bg-[var(--light-grey)] text-center rounded active:bg-[var(--light-grey)] px-2 py-1' placeholder='Change Image' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Title</label>
            <input
              {...register('title')}
              className='px-2 py-1 border border-[var(--grey)] rounded' placeholder='Add title' />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Category</label>
            <select
              {...register('category')}
              className='px-2 py-1 border border-[var(--grey)] rounded'>
              <option value="">--Select Category--</option>
              <option value="vegetables">Vegetables</option>
              <option value="foods">Foods</option>
              <option value="flowers">Flowers</option>
              <option value="tools">Tools</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Status</label>
            <select
              {...register('status')}
              className='px-2 py-1 border border-[var(--grey)] rounded'>
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Stock</label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
            />
            {errors.stock && <p className="text-red-500">Stock must be a non-negative number</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Price</label>
            <input
              type="number"
              step="any"
              {...register('price', { valueAsNumber: true })}  // this converts string to number
              className='px-2 py-1 border border-[var(--grey)] rounded' />

            {errors.price && <p className="text-red-500">Price must be a number</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Amount</label>
            <input
              {...register('amount')}
              className='px-2 py-1 border border-[var(--grey)] rounded' />
          </div>
          <div className='flex flex-col gap-2 col-span-2'>
            <label className='font-bold'>Description</label>
            <textarea
              {...register('description')}
              className='border border-[var(--grey)] w-full h-20' />
          </div>
          <div className='bg-green-500 h-10 w-10' onClick={handleClick}></div>
          <div className='col-span-3 flex justify-center gap-5'>
            <button
              type="button"
              onClick={closeModal}
              className='p-2 bg-[var(--light-grey)] active:bg-[var(--grey)] text-black font-bold rounded cursor-pointer w-32 text-center'>Cancel</button>
            <button
              type="submit"
              className='p-2 bg-[var(--teal)] active:bg-[var(--dark-teal)] text-white font-bold rounded cursor-pointer w-32 text-center'>{selectedProduct ? 'Update Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;