import React, { useContext, useEffect, useState } from 'react'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { UserContext } from '../context/UserContext'
import { userRequest } from '../util/Request'

export default function Search({ searchTerm }) {
  const { pins: localPins } = useContext(UserContext)
  const [pins, setPins] = useState(localPins)
  const [loading, setLoading] = useState(false)

 

  useEffect(() => {
    const  search=async ()=> {
      const response = await userRequest.get('/pin/category/' + searchTerm)
      setPins(response.data.data)
      setLoading(false)
  }
    if (searchTerm) {
      setLoading(true);
       const debounceSearch = setTimeout(()=>{
         search();
         
       },500)

       return ()=> {
        clearTimeout(debounceSearch)
      }
    } else {
      setLoading(false);
      setPins([])
    }

    

  }, [searchTerm])



  return (
    <div>
      {loading && <Spinner message='Searching for pins' />}
      {pins?.length !== 0 && (<MasonryLayout pins={pins} />)}
      { pins?.length === 0 && loading && (<div className='mt-10 text-center text-xl'> No Pins Found </div>)}
      {pins?.length === 0 && !loading && !searchTerm&& <MasonryLayout pins={localPins} />}
    </div>
  )
}
