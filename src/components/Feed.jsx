import React, { useContext, useEffect, useState } from 'react'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom'
import { userRequest } from '../util/Request';
import { UserContext } from '../context/UserContext';
export default function Feed() {
  const { pins, setPins, user, setSaved, saved ,setCreatedPins ,createdPins} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true)
    let url = ''
    async function getPins() {
      if (categoryId) {
        url = '/pin/category/' + categoryId
      } else {
        url = '/pin';
      }
      const response = await userRequest.get(url)
      setPins(response.data.data)
      const getSavedPins = await userRequest.get('/pin/save')
      const savedPins = getSavedPins.data.savedPins.map(pin=> {
        const {_id} = pin
         return _id
      })
      const createdPins = getSavedPins.data.createdPins.map(pin=> {
        const {_id} = pin
         return _id
      }) 
      setSaved(savedPins)
      setCreatedPins(createdPins)
      setLoading(false);
    }
    getPins();



  }, [categoryId, setCreatedPins, setPins, setSaved])

  if (loading) return <Spinner message='We are adding a new ideas to your feed' />
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}
