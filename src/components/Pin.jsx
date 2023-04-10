import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { userRequest } from '../util/Request';
import { UserContext } from '../context/UserContext';


export default function Pin({ pin :x}) {
    const [pin , setPin ] = useState(x)
    if(typeof pin === 'string'){
        async function getPins()  {
         const response = await userRequest.get('/pin/'+pin);
         setPin(response.data)
     }
         getPins()
         
     }

     const [postHovered, setPostHovered] = useState(false);
    const {pins , setPins , saved , setSaved} = useContext(UserContext)
    const alreadySaved = saved.includes(pin._id) 

    const savePin = async(_id) => {
        const response  = await userRequest.put('/pin/save/'+_id)
        const temp = saved ;
        if(alreadySaved){
            const index =    saved.indexOf(pin._id)
            temp.splice(index, 1)
            setSaved(temp)
        }else {
            temp.push(pin._id)
            setSaved(temp)
        }
    }
    const deletePin = async (_id) => {
        const response = await userRequest.delete(`/pin/${_id}`) 
        const pinsAfterDelete = pins.filter(pin => pin._id !== _id )
        setPins(pinsAfterDelete)
    } 
    const navigate = useNavigate();
    return (
        <div className='m-2  '>

          {
            pin?.image && (
                <>
                  <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate('/pin-detail/' + pin._id)}
                className='relative cursor-zoom-in  w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>

                <img className='rounded-lg w-full ' alt='user-post' src={pin.image} />
                {
                    postHovered && (
                        <div className='absolute top-0 w-[100%] h-[100%] flex flex-col justify-between p-1 pr-2 pt-2'>
                            <div className="flex items-center justify-between">
                                <div className='flex gap-2'>
                                    <a
                                        href={`${pin?.image}?dl=`}
                                        download
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MdDownloadForOffline className='bg-white ml-1 w-6 h-6 flex items-center justify-center text-dark text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md  rounded-full' />
                                    </a>
                                </div>
                                {alreadySaved  ? (
                                    <button type='button'
                                        className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            savePin(pin._id)
                                        }}
                                    >
                                        Saved
                                    </button>
                                ) :
                                    (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                savePin(pin._id)
                                            }}
                                            type='button'
                                            className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                        >
                                            Save
                                        </button>
                                    )}
                            </div>
                            <div className='flex justify-between items-center gap-2 w-full'>
                                {       
                                    pin.destination && (
                                        <a href={pin?.destination}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='bg-white flex items-center gap-2 text-black font-bold p-1 pl-3 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                                            <BsFillArrowUpRightCircleFill />
                                            {pin?.destination.slice(0, 12)}
                                        </a>
                                    )
                                }
                                {pin?.postedBy?._id !== pin?.userId?._id && 
                                    (
                                        <button
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deletePin(pin?._id)
                                            }}
                                            className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-base text-dark rounded-3xl'
                                        >
                                            <AiTwotoneDelete />
                                        </button>
                                    )
                                }

                            </div>

                        </div>

                    )
                }

            </div>



            <Link to={`user-profile/${pin?.userId?._id}`} className='flex gap-2 mt-2 items-center'>
                {
                    pin?.userId?.image ? (
                        <img src={pin?.userId?.image} className='w-8 h-8 rounded-full object-cover' alt='user-profile' />

                    ):
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
                }
                <p className='font-semibold capitalize'>{pin?.userId?.name}</p>
            </Link>
                </>
            )
          }


        </div>
    )
}
