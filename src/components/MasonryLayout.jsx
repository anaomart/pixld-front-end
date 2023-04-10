import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'
export default function MasonryLayout({pins}) {
    const breakpointObj = {
        default: 4 ,
        3000:6,
        2000:5,
        1200:3,
        1000:2,
        500:1
    }
  return (
    <>
      { Array.from(pins).length  > 0 ?(
          <Masonry className='flex  animate-slide-fwd w-full ' breakpointCols={breakpointObj}>
          {Array.from(pins)?.map((pin)=> <Pin key={pin._id} pin={pin} className='' />)}
      </Masonry>
      ):(
        <p className='flex justify-center font-bold items-center w-full text-xl mt-2'>No Pins Found </p>
      )

      }
    </>
  )
}
