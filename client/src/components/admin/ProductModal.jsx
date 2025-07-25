import React, { useEffect } from 'react';
import cherry_tomato from '../../assets/cherry_tomato.png';
import { Check, Close, CloseOutlined } from '@mui/icons-material';
import { useProducts } from '../../context/ProductsContext';

const ProductModal = ({ product }) => {
  const { formProduct, setFormProduct, onCloseModal, handleSubmit, isModalOpen } = useProducts();

  useEffect(() => {
    if (product) {
      setFormProduct(product);
    }
  }, [product, setFormProduct]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;
    setFormProduct((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <div className={`${isModalOpen ? '' : 'hidden'} z-900 p-12 w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex items-center justify-center`}>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-xl p-8 grid grid-cols-3 gap-5 text-sm relative'>
        <button className='absolute top-2 right-2 cursor-pointer' onClick={onCloseModal}><CloseOutlined/></button>
        <img src={cherry_tomato} className='rounded-lg h-full aspect-square row-span-4'/>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Title</label>
          <input required
            name='title'
            type='text'
            value={formProduct.title}
            onChange={handleChange}
            className='px-2 py-1 border border-[var(--grey)] rounded' placeholder='Add title' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Category</label>
          <select
            name='category'
            value={formProduct.category}
            onChange={handleChange} required className='px-2 py-1 border border-[var(--grey)] rounded'>
            <option value="vegetables">Vegetables</option>
            <option value="foods">Foods</option>
            <option value="flowers">Flowers</option>
            <option value="tools">Tools</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Status</label>
          <select
            name='status'
            value={formProduct.status}
            onChange={handleChange}
            required className='px-2 py-1 border border-[var(--grey)] rounded'>
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Stock</label>
          <input
            name='stock'
            required type='number'
            value={formProduct.stock}
            onChange={handleChange}
            className='px-2 py-1 border border-[var(--grey)] rounded' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Price</label>
          <input
            name='price'
            required type='number'
            value={formProduct.price}
            onChange={handleChange}
            className='px-2 py-1 border border-[var(--grey)] rounded' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-bold'>Amount</label>
          <input
            name='amount'
            type='text'
            value={formProduct.amount}
            onChange={handleChange}
            className='px-2 py-1 border border-[var(--grey)] rounded' />
        </div>
        <div className='flex flex-col gap-2 col-span-2'>
          <label className='font-bold'>Description</label>
          <textarea
            name='description'
            value={formProduct.description}
            onChange={handleChange}
            className='border border-[var(--grey)] w-full h-20' />
        </div>
        <div className='flex justify-center gap-5 col-span-3'>
          <button
            type="button"
            onClick={onCloseModal}
            className='p-2 bg-[var(--light-grey)] active:bg-[var(--grey)] text-black font-bold rounded cursor-pointer w-30 text-center'>Cancel</button>
          <button
            type="submit"
            className='p-2 bg-[var(--teal)] active:bg-[var(--dark-teal)] text-white font-bold rounded cursor-pointer w-30 text-center'>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductModal;
