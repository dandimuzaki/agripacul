import PriceRange from '@/components/common/PriceRange';
import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';
import SortingDropdown from '@/components/customer/SortingDropdown';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getProducts } from '@/services/productService';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { capitalize } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);

  const end = () => {
    if (meta?.page > 1 && products.length < meta?.limit) {
      return meta?.total;
    } else if (meta?.total > meta?.limit) {
      return (meta?.page * meta?.limit) || 0;
    } else if (meta?.total < meta?.limit) {
      return meta?.total || 0;
    }
  };
  const start = ((meta?.page - 1) * meta?.limit + 1) || 0;
  const categoryOptions = [
    'all',
    'vegetables',
    'foods',
    'tools',
    'flowers'
  ];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || 1);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getProducts(searchParams);
      if (result.data) {
        setProducts(result.data);
        setHasNext(result.meta.hasNextPage);
        setMeta(result.meta);
      }
    } catch (err) {
      console.error('Error load products', err);
    } finally {
      setTimeout(() => setLoading(false), 5000);
    }
  }, [searchParams]);

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

  useEffect(() => {
    setSelectedCategory(category || 'all');
    loadProducts();
  }, [category, loadProducts]);

  const { setValue, watch } = useForm({
    defaultValues: {
      sortByPrice: '',
      sortByRating: '',
      sortBySold: ''
    },
  });

  const sortByPrice = watch('sortByPrice');
  const sortByRating = watch('sortByRating');
  const sortBySold = watch('sortBySold');

  const handleSortPrice = (value) => {
    setValue('sortByPrice', value);
    setValue('sortByRating', '');
    setValue('sortBySold', '');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('sortByRating');
    newParams.delete('sortBySold');
    if (value) {
      newParams.set('sortByPrice', value);
    } else {
      newParams.delete('sortByPrice');
    }
    navigate(`/products?${newParams.toString()}`);
    setSearchParams(newParams);
  };

  const handleSortRating = (value) => {
    setValue('sortByPrice', '');
    setValue('sortByRating', value);
    setValue('sortBySold', '');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('sortByPrice');
    newParams.delete('sortBySold');
    if (value) {
      newParams.set('sortByRating', value);
    } else {
      newParams.delete('sortByRating');
    }
    navigate(`/products?${newParams.toString()}`);
    setSearchParams(newParams);
  };

  const handleTopSales = (value) => {
    setValue('sortByPrice', '');
    setValue('sortByRating', '');
    setValue('sortBySold', value);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('sortByPrice');
    newParams.delete('sortByRating');
    if (value) {
      newParams.set('sortBySold', value);
    } else {
      newParams.delete('sortBySold');
    }
    navigate(`/products?${newParams.toString()}`);
    setSearchParams(newParams);
  };

  return (
    <div className='px-12 py-6 mt-15 grid md:grid-cols-[1fr_4fr] gap-6 items-start'>
      <section className='md:sticky top-21 grid gap-4 bg-white p-6 rounded-lg'>
        {/*Title*/}
        <h2 className='font-semibold text-lg text-gray-800 border-b pb-2'>Filters</h2>
        {/*Category*/}
        <div>
          <h3 className='text-sm font-medium text-gray-600 mb-2'>Category</h3>
          <RadioGroup
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              const newParams = new URLSearchParams(searchParams);
              if (value != 'all') {
                newParams.set('category', value);
              } else {
                newParams.delete('category');
              }
              navigate(`/products?${newParams.toString()}`);
            }}
          >
            {categoryOptions.map((category, index) => (
              <label key={index} className='flex gap-2 cursor-pointer items-center'>
                <RadioGroupItem value={category}/>
                {capitalize(category)}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Price Range */}
        <div>
          <h3 className='text-sm font-medium text-gray-600 mb-4'>Price Range</h3>
          <PriceRange/>
        </div>
      </section>

      <section className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
        <div className='col-span-5 flex justify-between items-center'>
          <div className='w-fit flex gap-3 items-center'>
            <h3 className='font-medium text-gray-600 whitespace-nowrap'>Sort by</h3>
            <div
              onClick={() => handleTopSales('desc')}
              className={`${sortBySold ? 'border-2 border-green-500 text-green-500 font-semibold' : ''} whitespace-nowrap text-left px-3 py-2 w-full justify-between rounded border border-gray-500 text-sm`}>
              Top Sales
            </div>
            <SortingDropdown
              sortOption='Price'
              handleChange={handleSortPrice}
              value={sortByPrice}
            />
            <SortingDropdown
              sortOption='Rating'
              handleChange={handleSortRating}
              value={sortByRating}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <p className='text-center'>{page}/{meta?.totalPages}</p>
            <button
              onClick={prevPage}
              disabled={page===1}
              className={'w-fit p-1 bg-gray-300 rounded flex items-center gap-1'}
            >
              <ChevronLeft/>
            </button>
            <button
              onClick={nextPage}
              disabled={!hasNext}
              className={'w-fit justify-self-end p-1 bg-gray-300 rounded flex items-center gap-1'}
            >
              <ChevronRight/>
            </button>
          </div>
        </div>
        <p className='col-span-5'>Showing <strong>{start}-{end()}</strong> of <strong>{meta?.total}</strong> results {search ? (<span>for <strong>"{search}"</strong></span>) : ''}</p>
        {products?.map((p) => (
          <ProductCardVertical key={p._id} product={p} loading={loading}/>
        ))}
      </section>
    </div>
  );
};

export default SearchResult;
