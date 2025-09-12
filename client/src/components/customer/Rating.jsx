import { useOrder } from '@/context/OrderContext'
import { Star } from '@mui/icons-material'
import React, { useState } from 'react'

const Rating = ({item}) => {
  const { setRateList, rateList } = useOrder()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleClick = (star) => {
    if (isSubmitted) return;
    setRateList((prev) => ([...prev, {_id: item.product._id, rating: star}]))
    setRating(star)
    console.log(rateList)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span
              key={starValue}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !isSubmitted && setHover(starValue)}
              onMouseLeave={() => !isSubmitted && setHover(0)}
              className="cursor-pointer text-3xl select-none"
              style={{
                color:
                  starValue <= (hover || rating)
                    ? "gold"
                    : "lightgray",
              }}
            >
              <Star/>
            </span>
          );
        })}
      </div>
    </div>
  )
}

export default Rating
