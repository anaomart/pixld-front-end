import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { googleLogout } from '@react-oauth/google'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { UserContext } from '../context/UserContext';
import MasonryLayout from './MasonryLayout';
import { userRequest } from '../util/Request';

const randomImage = "https://source.unsplash.com/1600x900/?technology,phtograpy,nature"
export default function UserProfile() {
  const { user, pins , saved ,createdPins ,setSaved ,setCreatedPins} = useContext(UserContext)
  const [savedPins, setSavedPins] = useState([]);
  const [text, setText] = useState('Created');
  const [activeBtn, setactiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const activeBtnStyle = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyle = 'bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none'
  async function   getPins() {
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
  }
  useEffect(()=> {
    getPins();
  
  },[setCreatedPins, setSaved])
  if (!user) {
    return <Spinner message="Loading Profile" />
  }


  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>

          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} alt='banner'
              className='w-full h-370 2xl:h-[350px] shadow-lg object-fit'
            />
            <img className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.image} alt='profile'
            />
            <h1 className='font-bold text-3xl text-center mt-2'>
              {user.name}
            </h1>
            <div className='absolute top-0 z-1 right-0'>
              {userId === user._id && (
                <button
                className='bg-red-500 m-4 p-2 rounded-full text-white'
                  onClick={()=>
                    {localStorage.removeItem('user');
                    window.location.reload();
                  }
                  }
                >
                  <AiOutlineLogout/>
                </button>
              )}

            </div>
                  <div>
                    <div className='text-center mb-7'>
                      <button
                      type='button' 
                      onClick={(e)=> {
                        setText(e.target.textContext)
                          setactiveBtn('created')
                          setCreatedPins([])
                          getPins();

                        }}
                        className={`${activeBtn === 'created' ? activeBtnStyle : notActiveBtnStyle}`}
                      >
                        Created
                      </button>
                      <button
                      type='button' 
                      onClick={(e)=> {
                        setText(e.target.textContext)
                          setactiveBtn('saved')
                          setSaved([])
                          getPins();
                        }}
                        className={`${activeBtn === 'saved' ? activeBtnStyle : notActiveBtnStyle}`}
                      >
                        Saved
                      </button>
                    </div>
                    <div className='px-2  min-w-[1200px]'>{
                        activeBtn === 'saved' ? (
                          <MasonryLayout pins={saved}/>
                          
                        ):(
                          <MasonryLayout pins={createdPins}/>
                          
                        )

                      }                      
                      </div>  
                  </div>
          </div>


        </div>

      </div>


    </div>

  )
}
