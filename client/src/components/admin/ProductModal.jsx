import React, { useEffect } from 'react';
import cherry_tomato from '../../assets/cherry_tomato.png';
import { Close } from '@mui/icons-material';
import { useProducts } from '../../context/ProductsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useImage } from '@/context/ImageContext';
import { Spinner } from '@heroui/spinner';
import { ClipLoader } from 'react-spinners';

const ProductModal = () => {
  const { isModalOpen, closeModal, isVisible, handleSave, selectedProduct, isLoading } = useProducts();
  const { preview, handleChangeImage } = useImage();

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
    <div
      className={`z-500 fixed inset-0 bg-black/50 flex justify-center items-center p-4 transition-opacity duration-200 ${
        isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`p-5 bg-white md:rounded-xl w-full max-w-4xl mx-auto relative transition-all duration-200 ${
          isModalOpen ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95'
        }`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }} // ✅ Enable vertical scroll
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <Close />
        </button>

        <p className="font-bold text-lg md:text-xl text-center mb-6">
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </p>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm"
        >
          {/* Image Preview */}
          <div className="flex flex-col gap-4 items-center md:row-span-4">
            <div
              className={`${
                preview ? 'border-none' : 'border border-gray-300'
              } overflow-hidden rounded-lg w-full max-w-[280px] h-40 sm:h-48 md:h-full`}
            >
              {(preview || selectedProduct?.image) && (
                <img
                  src={preview || selectedProduct?.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />)
              }
            </div>

            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-200 text-center rounded px-3 py-1 text-sm hover:bg-gray-300"
            >
              {selectedProduct ? 'Change Image' : 'Add Image'}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Title</label>
            <input
              {...register('title')}
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Add title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Category</label>
            <select
              {...register('category')}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">--Select Category--</option>
              <option value="vegetables">Vegetables</option>
              <option value="foods">Foods</option>
              <option value="flowers">Flowers</option>
              <option value="tools">Tools</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Status</label>
            <select
              {...register('status')}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Stock</label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">Stock must be a non-negative number</p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Price</label>
            <input
              type="number"
              step="any"
              {...register('price', { valueAsNumber: true })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-xs">Price must be a number</p>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Amount</label>
            <input
              {...register('amount')}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-bold">Description</label>
            <textarea
              {...register('description')}
              className="px-3 py-2 border border-gray-300 rounded w-full h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-3 flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 active:bg-gray-300 text-black font-semibold rounded w-32 text-center"
            >
          Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[var(--primary)] active:bg-[var(--primary-dark)] text-white font-semibold rounded w-32 text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader color='#ffffff' size={16} />
                  <span>Saving</span>
                </div>
              ) : selectedProduct ? (
                'Update Changes'
              ) : (
                'Add Product'
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;