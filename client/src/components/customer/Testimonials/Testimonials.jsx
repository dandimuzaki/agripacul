import React, { useRef } from 'react';
import './Testimonials.css';
import testimonial1 from '../../../assets/testimonial1.jpg';
import testimonial2 from '../../../assets/testimonial2.jpg';
import testimonial3 from '../../../assets/testimonial3.jpg';
import testimonial4 from '../../../assets/testimonial4.jpg';
import { ArrowLeftOutlined, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';


const Testimonials = () => {
  const image = [testimonial1, testimonial2, testimonial3, testimonial4];
  const testimonials = [
    {
      name: 'Graciela & Villi',
      image: image[0],
      quote: 'The pakcoy were so crisp and fresh — it felt like they had just been picked that morning. You can really taste the difference when vegetables are grown with care.'
    },
    {
      name: 'Basuki',
      image: image[1],
      quote: 'It even smelled fresh when I opened the package! Clean, vibrant, and so satisfying to eat raw.'
    },
    {
      name: 'Edna, Sakura, Nada, Aimee',
      image: image[2],
      quote: 'The pakcoy had great texture — not too thick, not too soft. My mom even asked where I bought it.'
    },
    {
      name: 'Diah',
      image: image[3],
      quote: 'I used it for wraps and sandwiches — it stayed crisp for days in the fridge. This is how lettuce should be.'
    }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behaviour: 'smooth',
      });
    }
  };

  return (
    <>
      <div className='overflow-auto'>
        <div className='absolute bottom-8 flex gap-2'>
          <button
            onClick={() => scroll('left')}
            className='h-8 w-8 border-2 border-[var(--primary)] rounded-md text-[var(--primary)] cursor-pointer active:border-[var(--primary-dark)] acrive:text-[var(--primary-dark)]'
          >
            <KeyboardArrowLeftOutlined/>
          </button>
          <button
            onClick={() => scroll('right')}
            className='h-8 w-8 border-2 border-[var(--primary)] rounded-md text-[var(--primary)] cursor-pointer active:border-[var(--primary-dark)] acrive:text-[var(--primary-dark)]'
          >
            <KeyboardArrowRightOutlined/>
          </button>
        </div>

        <div ref={scrollRef} className="relative testimonial-container no-scrollbar flex overflow-auto snap-x snap-mandatory gap-3">

          {testimonials.map((item, i) => (
            <div className='testimonial-card' key={i}>
              <img src={item.image} className='w-full object-cover' />
              <div className='flex flex-col gap-2 p-3'>
                <p className='font-bold'>{item.name}</p>
                <p className='text-sm'>
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/*
      <div className='overflow-auto flex'>
      <div className='testimonial-card'>
        <img src={image[0]} className='w-[500px] aspect-5/3 object-cover' />
        <div className='flex flex-col gap-2 p-3'>
          <p className='font-bold'>Graciela & Villi</p>
          <p className='text-sm'>
            “The pakcoy were so crisp and fresh — it felt like they had just been picked that morning. You can really taste the difference when vegetables are grown with care."
          </p>
        </div>
      </div>
      <div className='testimonial-card'>
        <img src={testimonial2} className='w-full aspect-5/3 object-cover' />
        <div className='flex flex-col gap-2 p-3'>
          <p className='font-bold'>Basuki</p>
          <p className='text-sm'>
            “It even smelled fresh when I opened the package! Clean, vibrant, and so satisfying to eat raw.”
          </p>
        </div>
      </div>
      <div className='testimonial-card'>
        <img src={testimonial3} className='w-full aspect-5/3 object-cover' />
        <div className='flex flex-col gap-2 p-3'>
          <p className='font-bold'>Edna, Sakura, Nada, Aimee</p>
          <p className='text-sm'>
            “The pakcoy had great texture — not too thick, not too soft. My mom even asked where I bought it.”
          </p>
        </div>
      </div>
      <div className='testimonial-card'>
        <img src={testimonial4} className='w-full aspect-5/3 object-cover' />
        <div className='flex flex-col gap-2 p-3'>
          <p className='font-bold'>Diah</p>
          <p className='text-sm'>
            “I used it for wraps and sandwiches — it stayed crisp for days in the fridge. This is how lettuce should be.”
          </p>
        </div>
      </div>
      </div>
      */}
      </div>
    </>
  );
};

export default Testimonials;
