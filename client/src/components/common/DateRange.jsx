import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DateRange = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateRange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('from', value[0]);
      newParams.set('to', value[1]);
    } else {
      newParams.delete('from');
      newParams.delete('to');
    }
    navigate(`/orders?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <label onClick={() => console.log(startDate, endDate)} className="px-1">
        Start
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {startDate ? startDate : 'Select date'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setStartDate(date.toLocaleDateString());
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRange;
