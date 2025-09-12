import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useProduct } from '@/context/ProductContext';
import { getProducts } from '@/services/productService';
import { capitalize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const categoryOptions = [
    'vegetables',
    'foods',
    'tools',
    'flowers'
  ];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [sortRating, setSortRating] = useState('')
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category');
  const sortByPrice = searchParams.get('sortByPrice');
  const minPrice = searchParams.get('minPrice');
  const search = searchParams.get('search');

  useEffect(() => {
    setSelectedCategory(category || '');

    const query = new URLSearchParams();

    if (category) query.append('category', category);
    if (sortByPrice) query.append('sortByPrice', sortByPrice);
    if (minPrice) query.append('minPrice', minPrice);
    if (search) query.append('search', search);

    const loadProducts = async (query) => {
      setLoading(true);
      try {
        const result = await getProducts(query);
        if (result) {
          setProducts(result);
        }} catch (err) {
        console.error('Error load products', err);
      } finally {
          setLoading(false);

      }
    };

    loadProducts(query);
  }, [category, sortByPrice, minPrice, search]);

  return (
    <div className='px-12 py-6 mt-15 grid md:grid-cols-[1fr_3fr] gap-6 items-start'>
      <section className='md:sticky top-21 grid gap-4 bg-white p-6 rounded-lg'>
        <div className='grid gap-2'>
          <p className='font-bold'>Select Category</p>
          <RadioGroup
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              const newParams = new URLSearchParams(searchParams);
              if (value) {
                newParams.set('category', value);
              } else {
                newParams.delete('category');
              }
              navigate(`/products?${newParams.toString()}`);
            }}
          >
            {categoryOptions.map((category, index) => (
              <label key={index} className='flex gap-2 cursor-pointer'>
                <RadioGroupItem value={category}/>
                {capitalize(category)}
              </label>
            ))}
          </RadioGroup>
        </div>
        <div className='grid gap-2'>
          <p className='font-bold'>Sort by Price</p>
          <RadioGroup
            value={sortPrice}
            onValueChange={(value) => {
              setSortPrice(value);
              const newParams = new URLSearchParams(searchParams);
              if (value) {
                newParams.set('sortByPrice', value);
              } else {
                newParams.delete('sortByPrice');
              }
              navigate(`/products?${newParams.toString()}`);
            }}
          >
            <label className='flex gap-2 cursor-pointer'>
              <RadioGroupItem value='asc'/>
              Low to High
            </label>
            <label className='flex gap-2 cursor-pointer'>
              <RadioGroupItem value='desc'/>
              High to Low
            </label>
          </RadioGroup>
        </div>

        <div className='grid gap-2'>
          <p className='font-bold'>Sort by Rating</p>
          <RadioGroup
            value={sortRating}
            onValueChange={(value) => {
              setSortRating(value);
              const newParams = new URLSearchParams(searchParams);
              if (value) {
                newParams.set('sortByRating', value);
              } else {
                newParams.delete('sortByRating');
              }
              navigate(`/products?${newParams.toString()}`);
            }}
          >
            <label className='flex gap-2 cursor-pointer'>
              <RadioGroupItem value='asc'/>
              Low to High
            </label>
            <label className='flex gap-2 cursor-pointer'>
              <RadioGroupItem value='desc'/>
              High to Low
            </label>
          </RadioGroup>
        </div>

      </section>
      <section className='grid gap-3 grid-cols-4'>
        <p className='col-span-4'>Showing <strong>{products.length}</strong> results {search ? (<span>for <strong>"{search}"</strong></span>) : ''}</p>
        {products?.map((p) => (
          <ProductCardVertical key={p._id} product={p} loading={loading}/>
        ))}
      </section>
    </div>
  );
};

export default SearchResult;
