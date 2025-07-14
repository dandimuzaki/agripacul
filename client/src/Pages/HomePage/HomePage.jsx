import { useParams } from 'react-router-dom';
import Category from '../../Components/Category/Category';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductsContext';
import { useMemo } from 'react';

const HomePage = () => {
  const { products } = useProducts();
  const { category } = useParams();
  const filteredProducts = useMemo(() => {
    return category
      ? products.filter((item) => item.category === category)
      : products;
  }, [category, products]);

  return (
    <div>
      <div className='h-20 w-full bg-red-500'></div>
      <div className='z-100 bg-white px-5 py-3 flex flex-col gap-1 w-full sticky top-15'>
        <h2 className='text-lg font-bold'>Categories</h2>
        <Category />
        <p></p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-x-3 gap-y-5 px-5 py-3 bg-white'>
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className='h-screen'></div>
    </div>
  );
};

export default HomePage;
