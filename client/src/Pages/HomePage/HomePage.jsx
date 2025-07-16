import { useParams } from 'react-router-dom';
import Category from '../../Components/Category/Category';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductsContext';
import { useMemo } from 'react';
import './HomePage.css';
import Banner from '../../Components/Banner/Banner';
import { ArrowDownwardTwoTone, ArrowOutwardTwoTone } from '@mui/icons-material';
import Value from '../../Components/Value/Value';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Footer from '../../Components/Footer/Footer';

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
      <div>
        <section className='py-20 hero text-center bg-cover lg:h-screen w-full flex text-white flex-col justify-center items-center'>
          <h1 className='text-3xl md:text-5xl font-[800] mb-5'>
            <p className='font-normal'>Grow with Care</p>
          Served with Love
          </h1>
          <p className='text-md mb-8 md:w-3/5 mx-7'>
        Every vegetable we grow, every salad we prepare, and every tool we craft is a result of thoughtful care. From seed to harvest, from soil to plate — we nurture nature so you can enjoy real food made with love.
          </p>
          <button className='flex gap-2 py-2 px-4 font-bold rounded-full bg-[var(--red)] w-fit cursor-pointer'>Buy Our Product<ArrowDownwardTwoTone /></button>
        </section>
        <div className='product-banner md:px-15 px-5 md:pt-15 pt-5 pb-3 w-full h-full'>
          <div className='flex justify-center mb-3'><p className='px-2 py-1 border border-2 border-[var(--red)] text-[var(--red)] text-sm w-fit rounded-full'>Our Product</p></div>
          <h2 className='text-center'>What Can We Get For You?</h2>
          <Banner />
        </div>
        <div className='sticky top-15 z-100 px-5 py-3 flex gap-1 w-full items-center gap-3 justify-center bg-[var(--light-turquoise)]'>
          <h3 className='text-lg font-bold'>Categories</h3>
          <Category />
        </div>
        <div className='md:pb-15 pb-23 grid grid-cols-2 md:grid-cols-6 gap-x-3 gap-y-5 md:px-15 px-5 py-3 bg-[var(--light-turquoise)]'>
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <div>
        <section className='h-screen p-15 hidden md:flex flex-col bg-white'>
          <div className='flex justify-center mb-3'><p className='px-2 py-1 border border-2 border-[var(--red)] text-[var(--red)] text-sm w-fit rounded-full'>Our Value</p></div>
          <h2 className='text-center text-4xl font-[800] mb-5'>Why People Grow with Us</h2>
          <Value />
        </section>
        <section className='w-full p-15 pb-25 hidden md:grid testimonials gap-10 bg-[var(--light-turquoise)] relative'>
          <div className='flex justify-center items-start flex-col'>
            <div className='flex mb-3'><p className='px-2 py-1 border border-2 border-[var(--red)] text-[var(--red)] text-sm w-fit rounded-full'>Testimonials</p></div>
            <h2 className='text-4xl font-[800] mb-5'>Stories From the People We Grow For</h2>
            <p>Every kind word reminds us why we do what we do. Here’s what our customers have to say.</p>
          </div>
          <Testimonials />
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default HomePage;
