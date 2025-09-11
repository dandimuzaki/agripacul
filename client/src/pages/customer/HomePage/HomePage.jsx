import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import './HomePage.css';
import { ArrowDownwardTwoTone, ArrowOutwardTwoTone } from '@mui/icons-material';
import { useProduct } from '../../../context/ProductContext';
import Banner from '../../../components/customer/Banner/Banner';
import Category from '../../../components/customer/Category/Category';
import Value from '../../../components/customer/Value/Value';
import Testimonials from '../../../components/customer/Testimonials/Testimonials';
import Footer from '../../../components/customer/Footer/Footer';
import ProductCard from '../../../components/customer/ProductCard/ProductCard';
import vegetable_bag from '../../../assets/vegetable_bag.png';
import vegetable_display from '../../../assets/vegetable_display.png';
import salad from '../../../assets/salad.png';
import tools from '../../../assets/tools.png';
import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';



const HomePage = () => {
  const { products } = useProduct();
  const navigate = useNavigate();

  return (
    <>
      <section className="relative w-full lg:h-screen aspect-16/9 text-white md:mt-0 mt-15">
        <div className="absolute right-0 h-full w-full bg-[url('../../../assets/grow_with_us.jpg')] md:bg-contain bg-cover bg-no-repeat bg-right"></div>
        <div className="absolute left-0 w-2/3 h-full bg-[linear-gradient(90deg,rgba(31,46,42,1),rgba(31,46,42,1),rgba(31,46,42,0))]"></div>
        <div className="absolute w-1/2 top-0 bg-cover bg-center h-full flex items-center p-12 pt-15">
          <div className='flex flex-col justify-center gap-4 py-12'>
            <h1 className="text-4xl md:text-6xl">Grow with <span className='font-extrabold'>Care</span>, Served with <span className='font-extrabold'>Love</span></h1>
            <p className="text-lg">Grown naturally. Delivered mindfully. Our vegetables are harvested fresh and delivered with love from our farm to your table.</p>
            <div className="flex gap-4">
              <button className="bg-[#31d29e] hover:bg-[#28b088] text-white font-bold py-3 px-6 rounded-full transition-all">Shop Now</button>
              <button className="bg-white hover:bg-gray-100 text-[#31d29e] font-bold py-3 px-6 rounded-full transition-all">Visit Our Farm</button>
            </div>
          </div>
        </div>
      </section>
      <section className="p-5 md:p-12 grid grid-cols-3 gap-3">
        <div className='row-span-2 bg-[var(--accent)] relative rounded-lg p-5 flex flex-col gap-3'>
          <p className='text-2xl font-bold'>Fresh Vegetables<br />to Make You Comfortable</p>
          <button
            onClick={() => navigate('/products?category=vegetables')}
            className='
              cursor-pointer w-fit
              rounded-full py-2 px-4
              text-sm font-bold
              bg-[var(--primary)] text-white
              active:bg-[var(--dark-primary)] active:text-white
              active:outline active:outline-[var(--dark-primary)]
              '>
              Buy Now
          </button>
          <img src={vegetable_display} className='absolute bottom-5 left-[50%] transform-[translate(-50%,0)] h-[45%] object-cover' />
        </div>
        <div className='col-span-2 text-center'>
          <p className='text-2xl font-extrabold text-[var(--primary)]'>Freshly Picked</p>
          <p>Ready to Harvest Today</p>
        </div>
        <div className='grid grid-cols-4 col-span-2 gap-3 flex-1'>
          {products.filter((p) => p.category == 'vegetables').slice(0, 4).map((product) => (
            <ProductCardVertical key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="p-5 md:p-12 grid grid-cols-3 gap-3">
        <div className='grid grid-rows-3 gap-3 flex-1'>
          {products.filter((p) => p.category == 'foods').slice(0, 3).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className='bg-[var(--primary)] relative rounded-lg'>
          <img src={salad} className='absolute bottom-0 left-[50%] transform-[translate(-50%,0)] h-[70%] object-cover' />
          <div className='absolute flex flex-col items-center gap-3 w-full p-5'>
            <p className='text-2xl font-bold text-center'>Healthy Foods<br />to Brighten Your Mood</p>
            <button className='
              cursor-pointer w-fit
              rounded-full py-2 px-4
              text-sm font-bold
              bg-white text-[var(--primary)]
              active:bg-[var(--dark-primary)] active:text-white
              active:outline active:outline-[var(--dark-primary)]
              '>
              Buy Now
            </button>
          </div>
        </div>
        <div className='grid grid-rows-3 gap-3 flex-1'>
          {products.filter((p) => p.category == 'foods').slice(3, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="p-5 md:p-12 grid grid-cols-3 gap-3">
        <div className='grid grid-rows-2 grid-cols-2 col-span-2 gap-3 flex-1'>
          {products.filter((p) => p.category == 'tools').map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className='bg-[var(--accent)] relative rounded-lg flex flex-col gap-3'>
          <img src={tools} className='absolute bottom-0 left-[50%] transform-[translate(-50%,0)] h-[70%] object-cover' />
          <div className='absolute flex flex-col gap-3 w-full p-5'>
            <p className='text-2xl font-bold'>Kit and Tools<br />to Make Gardening Joyful</p>
            <button className='
              cursor-pointer w-fit
              rounded-full py-2 px-4
              text-sm font-bold
              bg-[var(--primary)] text-white
              active:bg-[var(--dark-primary)] active:text-white
              active:outline active:outline-[var(--dark-primary)]
              '>
              Buy Now
            </button>
          </div>
        </div>
      </section>

      <section className='p-5 md:p-12 grid grid-cols-6 gap-3'>
        <div className='col-span-6 text-center'>
          <p className='text-2xl font-extrabold text-[var(--primary)]'>Best Seller</p>
          <p>Our Customers’ Favorites</p>
        </div>
        {products.map((product) => (
          <ProductCardVertical key={product._id} product={product} />
        ))}
      </section>
      <section className="md:p-12 p-5 text-center">
        <p className="text-[var(--primary)] font-semibold uppercase mb-3">Our Values</p>
        <h2 className="text-3xl font-extrabold mb-8">From Soil to Soul — Our Promise</h2>
        <Value />
      </section>

      <section className='bg-[linear-gradient(rgba(212,248,237,0),rgba(212,248,237,1),rgba(212,248,237,1))] w-full md:px-8 md:pt-12 p-5 pb-20 hidden md:grid testimonials gap-10 relative'>
        <div className='flex justify-center items-start flex-col'>
          <p className="text-[var(--primary)] font-semibold uppercase mb-3">Testimonials</p>
          <h2 className='text-3xl font-extrabold mb-5'>Stories From the People<br/>We Grow For</h2>
          <p>Every kind word reminds us why we do what we do. Here’s what our customers have to say.</p>
        </div>
        <Testimonials />
      </section>
      <Footer/>
    </>
  );
};

export default HomePage;
