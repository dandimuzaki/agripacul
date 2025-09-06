import { Star } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import lettuce from '../../../assets/lettuce.jpg';
import './ProductPage.css';
import { useProduct } from '../../../context/ProductContext';
import CartButton from '../../../components/common/CartButton/CartButton';
import BackButton from '../../../components/common/BackButton/BackButton';
import ProductCard from '../../../components/customer/ProductCard/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '@/services/productService';
import { capitalize, formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';

const ProductPage = () => {
  const { productId } = useParams();
  const { products } = useProduct();
  const { addToCart } = useCart();
  const { setCheckedItems } = useCheckout();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    setProduct(null);
    const productData = products.find((p) => p._id == productId);
    if (productData) {
      setProduct(productData);
    } else {
      (async () => {
        try {
          const fresh = await getProductById(productId);
          setProduct(fresh);
        } catch (err) {
          console.error('Failed to load product', err);
        }
      })();
    }
  }, [productId, products]);
  const filteredProducts = products.filter((p) => p.category === 'vegetables');

  return (
    <div className='md:pt-15 product-page'>
      <div className='md:hidden p-3 bg-white flex justify-between bg-white sticky top-0'>
        <BackButton />
        <CartButton />
      </div>
      <div className='product-layout'>
        <img
          onClick={() => console.log(product)}
          className='product-img w-full aspect-square rounded-lg object-cover' src={product?.image} alt='lettuce' />
        <button className='w-fit product-category py-2 px-4 rounded-full bg-[var(--light-turquoise)] text-[var(--black)] text-sm'>{capitalize(product?.category)}</button>
        <p className='product-title text-2xl font-bold text-[var(--black)]'>{product?.title}</p>
        <div className='product-rating flex gap-2 text-orange-500 text-sm items-center'>
          <Star />
          <span>4.8</span>
        </div>
        <div className='product-price flex flex-col items-start'>
          <p className='text-sm text-gray-300 line-through'>{formatCurrency(product?.price)}</p>
          <p className='text-[var(--red)] font-bold'><span className='text-2xl'>{formatCurrency(product?.price)} </span><span className=''>/ {product?.unit}</span></p>
        </div>
        <div className='product-description'>
          <h3 className='text-[var(--black)] font-bold'>Details</h3>
          <p className='text-gray-500 text-sm'>
            {product?.description}
          </p>
        </div>
        <div className='product-button flex gap-3'>
          <button
            onClick={() => addToCart(productId)}
            className='py-2 px-4 border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-full active:bg-[var(--dark-primary)] active:border-[var(--dark-primary)] active:text-white cursor-pointer'>Add to Cart</button>
          <Link to='/checkout'>
            <button
              onClick={() => setCheckedItems([{ product, quantity: 1 }])}
              className='py-2 px-4 bg-[var(--primary)] text-white font-bold rounded-full active:bg-[var(--dark-primary)] active:border-[var(--dark-primary)] border-[var(--primary)] border-2 cursor-pointer'>Buy Now</button>
          </Link>
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
