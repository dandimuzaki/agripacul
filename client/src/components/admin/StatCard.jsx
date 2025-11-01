import { formatCurrency } from '@/utils/format'
import { TrendingDown, TrendingUp } from '@mui/icons-material'
import React from 'react'

const StatCard = ({color, title, value, performance}) => {
  return (
    <div className={`rounded bg-[var(--${color})] p-4`}>
      <h3 className='font-semibold text-lg text-gray-700 mb-2'>{title}</h3>
      <h4 className='font-bold text-2xl mb-1'>{formatCurrency(value || 0)}</h4>
      <div className={`flex gap-1 text-${performance > 0 ? 'green' : 'red'}-500`}>
        {performance > 0 ? <TrendingUp/> : <TrendingDown/>}
        <p className='text-gray-700'><span className={`text-${performance > 0 ? 'green' : 'red'}-500 font-bold`}>{performance || 0}% </span>vs last month</p>
      </div>
    </div>
  )
}

export default StatCard
