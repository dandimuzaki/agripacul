import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';
import { useProduct } from '@/context/ProductContext';
import { getProducts } from '@/services/productService';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const minPrice = searchParams.get('minPrice');
  const search = searchParams.get('search')

  useEffect(() => {
    let query = new URLSearchParams();

    if (category) query.append('category', category);
    if (sort) query.append('sort', sort);
    if (minPrice) query.append('minPrice', minPrice);
    if (search) query.append('search', search);

    const loadProducts = async (query) => {
      const result = await getProducts(query)
      if (result) {
        setProducts(result)
      }
    }

    loadProducts(query)
  }, [category, sort, minPrice, search])

  return (
    <div className='grid gap-3 grid-cols-6 px-12 py-5 mt-15'>
      {products?.map((p) => (
        <ProductCardVertical key={p._id} product={p}/>
      ))}
    </div>
  )
}

export default SearchResult
