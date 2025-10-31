import React from 'react';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';

const SortingDropdown = ({ sortOption, handleChange, value }) => {
  return (
    <Select
      onValueChange={handleChange}
      value={value}
    >
      <SelectTrigger value={value} className={'p-2 w-full justify-between rounded border'}>
        <SelectValue placeholder={sortOption}/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem key='asc' value='asc'>{sortOption}: Low to High</SelectItem>
        <SelectItem key='desc' value='desc'>{sortOption}: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortingDropdown;
