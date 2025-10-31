import { formatCurrency } from '@/utils/format';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PriceRange = () => {
  const [value, setValue] = useState([10000, 50000]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePriceRange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('priceFrom', value[0]);
      newParams.set('priceTo', value[1]);
    } else {
      newParams.delete('priceFrom');
      newParams.delete('priceTo');
    }
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <div className='grid gap-4'>
      <RangeSlider value={value} onInput={setValue} min={0} max={100000}/>
      <div className='flex gap-2 items-center justify-between'>
        <div className='grid gap-1'>
          <span className='text-sm'>From</span>
          <div className='flex items-center gap-1'>
        Rp
            <input
              value={value[0]}
              onChange={(e) => setValue((prev) => [e.target.value, prev[1]])}
              type='number'
              className='border border-gray-500 rounded max-w-20' />
          </div>
        </div>
        <div>
          <div className='h-4'></div>
        -
        </div>
        <div className='grid gap-1'>
          <span className='text-sm'>To</span>
          <div className='flex items-center gap-1'>
        Rp
            <input
              value={value[1]}
              onChange={(e) => setValue((prev) => [prev[0], e.target.value])}
              type='number'
              className='border border-gray-500 rounded max-w-20' />
          </div>
        </div>
      </div>
      <button onClick={() => handlePriceRange(value)}
        className='px-4 py-1 rounded bg-gray-300'
      >Set Range</button>
    </div>
  );
};

export default PriceRange;
