import { StaticDatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';

const DateDropdown = () => {
  const today = new Date();
  const last30 = new Date();
  last30.setDate(today.getDate()-30);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: last30,
      key: 'selection'
    }
  ]);

  return (
    <>
      <StaticDatePicker/>
      <div className='h-20 w-20 bg-green-500' onClick={() => console.log(state)}></div>
    </>
  );
};

export default DateDropdown;
