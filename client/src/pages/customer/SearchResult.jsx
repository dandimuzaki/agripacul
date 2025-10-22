import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useProduct } from '@/context/ProductContext';
import { getProducts } from '@/services/productService';
import { ArrowBack, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { capitalize } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const categoryOptions = [
    'vegetables',
    'foods',
    'tools',
    'flowers'
  ];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [sortRating, setSortRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);

  const category = searchParams.get('category');
  const sortByPrice = searchParams.get('sortByPrice');
  const minPrice = searchParams.get('minPrice');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || 1);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProducts(searchParams);
      if (result.data) {
        setProducts(result.data);
        setHasNext(result.meta.hasNextPage);
        setCountProducts(result.meta.total);
      }} catch (err) {
      console.error('Error load products', err);
    } finally {
      setLoading(false);

    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedCategory(category || '');
    loadProducts();
  }, [category, loadProducts]);

  const nextPage = () => {
    console.log(page);
    const newPage = parseInt(page) + 1;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
  };

  const prevPage = () => {
    console.log(page);
    const newPage = Math.max(1, parseInt(page) - 1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
  };

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
      <section className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative'>
        <p className='col-span-4'>Showing <strong>{products.length}</strong> results {search ? (<span>for <strong>"{search}"</strong></span>) : ''}</p>
        {products?.map((p) => (
          <ProductCardVertical key={p._id} product={p} loading={loading}/>
        ))}

        <div className='grid grid-cols-3 sticky bottom-6 col-span-4 items-center'>
          {page > 1 ? <button
            onClick={prevPage}
            disabled={page===1}
            className='w-fit py-2 pr-4 pl-2 bg-gray-300 rounded flex items-center gap-1'
          >
            <ChevronLeft/>
            Previous
          </button> : <div></div>}

          <p className='text-center'>{page}</p>

          {hasNext ? <button
            onClick={nextPage}
            disabled={!hasNext}
            className='w-fit justify-self-end py-2 pl-4 pr-2 bg-gray-300 rounded flex items-center gap-1'
          >
            Next
            <ChevronRight/>
          </button> : <div></div>}
        </div>
      </section>

    </div>
  );
};

export default SearchResult;
