import StatCard from '@/components/admin/StatCard'
import React from 'react'

const Overview = () => {
  const stat = [
    {
      title: 'Total Revenue',
      value: 100000,
      performance: 10,
      color: 'primary-2',
    },
    {
      title: 'Total Sales',
      value: 100000,
      performance: 10,
      color: 'secondary-2',
    },
    {
      title: 'Complete Orders',
      value: 100000,
      performance: 10,
      color: 'primary-2',
    },
    {
      title: 'Cancel Orders',
      value: 200000,
      performance: -20,
      color: 'secondary-2',
    }
  ]

  return (
    <div className='ml-50 grid p-8 gap-4'>
      <section className='grid grid-cols-4 gap-4'>
        {stat?.map(s => 
        <StatCard
          title={s.title}
          performance={s.performance}
          value={s.value}
          color={s.color}
        />)}
      </section>
      
    </div>
  )
}

export default Overview
