import { Star } from '@mui/icons-material';
import React from 'react';
import lettuce from '../../../assets/lettuce.jpg';
import './ProductPage.css';
import { useProducts } from '../../../context/ProductsContext';
import CartButton from '../../../components/common/CartButton/CartButton';
import BackButton from '../../../components/common/BackButton/BackButton';
import ProductCard from '../../../components/customer/ProductCard/ProductCard';

const ProductPage = () => {
  const { products } = useProducts();
  const filteredProducts = products.filter((product) => product.category === 'vegetables');

  return (
    <div className='md:pt-15 product-page'>
      <div className='md:hidden p-3 bg-white flex justify-between bg-white sticky top-0'>
        <BackButton />
        <CartButton />
      </div>
      <div className='product-layout'>
        <img className='product-img w-full aspect-square rounded-lg object-cover' src={lettuce} alt='lettuce' />
        <button className='w-fit product-category py-2 px-4 rounded-full bg-[var(--light-turquoise)] text-[var(--black)] text-sm'>Vegetables</button>
        <p className='product-title text-2xl font-bold text-[var(--black)]'>Lettuce</p>
        <div className='product-rating flex gap-2 text-orange-500 text-sm items-center'>
          <Star />
          <span>4.8</span>
        </div>
        <div className='product-price flex flex-col items-start'>
          <p className='text-sm text-gray-300 line-through'>Rp15.000</p>
          <p className='text-[var(--red)] font-bold'><span className='text-2xl'>Rp10.000 </span><span className=''>/ 300g</span></p>
        </div>
        <div className='product-description'>
          <h3 className='text-[var(--black)] font-bold'>Details</h3>
          <p className='text-gray-500 text-sm'>
            Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
            Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
            Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
            Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
          </p>
        </div>
        <div className='product-button flex gap-3'>
          <button className='py-2 px-4 bg-[var(--teal)] text-white font-bold rounded-full active:bg-[var(--dark-teal)] active:border-[var(--dark-teal)] border-[var(--teal)] border-2 cursor-pointer'>Add to Cart</button>
          <button className='py-2 px-4 border-2 border-[var(--teal)] text-[var(--teal)] font-bold rounded-full active:bg-[var(--dark-teal)] active:border-[var(--dark-teal)] active:text-white cursor-pointer'>See Recipe</button>
        </div>
      </div>
      <div className='gap-3 product-recommendation px-15 py-5'>
        <p className='col-span-6 mb-2 font-bold text-2xl'>Recommended for you</p>
        {filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductPage;
