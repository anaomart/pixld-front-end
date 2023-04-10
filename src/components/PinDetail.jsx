import React, { useEffect, useState } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import MasonryLaout from './MasonryLayout'
import Spinner from './Spinner';
import { userRequest } from '../util/Request';
import { AiFillDelete } from 'react-icons/ai';
import MasonryLayout from './MasonryLayout';
export default function PinDetail({ user }) {
  const [pins, setPins] = useState('');
  const [pinDetail, setPinDetail] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState('');
  const { pinId } = useParams()
  useEffect(() => {
    async function getPinDetails() {
      const response = await userRequest.get('/pin/' + pinId)
      setPinDetail(response.data)
      const morePins = await userRequest.get('/pin/category/' +response.data.category )
      const moreLikeThisPins = morePins.data.data.filter((pin) => pin._id !== pinId)
      setPins(moreLikeThisPins)
    }
    getPinDetails();
  }, [pinId, addingComment, comments])
  const addComment = async () => {
    if (comment) {
      setAddingComment(true);
      const response = await userRequest.post('/comment', {
        comment, pinId
      })
      setAddingComment(false);
      setComment('')
    }
  }
  const deleteComment = async (id) => {
    setAddingComment(true)
    const response = await userRequest.delete('/comment/' + id, { data: { pinId} })
    setAddingComment(false)
  }
  if (!pinDetail) return <Spinner message={"Loading Pin"} />
  return (
    <div>
      <div className='flex xl:flex-row flex-col m-auto bg-white max-w-[1500px] rounded-[32px]'>
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={pinDetail?.image}
            alt='user-post'
            className='rounded-t-3xl rounded-b-lg'
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetail?.image}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
              >
                <MdDownloadForOffline className='bg-white ml-1 w-6 h-6 flex items-center justify-center text-dark text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md  rounded-full' />
              </a>
            </div>
            <a href={pinDetail.destination} target='_blank' alt='destination' rel="noreferrer" className='bg-black text-white px-3 rounded-full hover:shadow-lg'>
               Ref <span>	&#8594;	</span>
            </a>
          </div>
          <h1 className='text-4xl font-bold break-wor mt-3'>
            {pinDetail?.title}
          </h1>
          <p className='mt-3'>
            {pinDetail.about}
          </p>

          <Link to={`user-profile/${pinDetail?.userId?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            {
              pinDetail?.userId?.image ? (
                <img src={pinDetail?.userId?.image} className='w-8 h-8 rounded-full object-cover' alt='user-profile' />

              ) :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            }
            <p className='font-semibold capitalize'>{pinDetail?.userId?.name}</p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto mt-3'>
            {pinDetail?.comments?.map((comment, i) => (

              <div className='flex gap-2 mt-5 items-center justify-between bg-white rounded-lg' key={i}>
                <div className='flex gap-2 mt-5'>
                  <img
                    src={comment?.userId?.image}
                    alt='user-profile'
                    className='w-10 h-10 rounded-full cursor-pointer '
                  />
                  <div className='flex flex-col'>
                    <p className='font-bold'>{comment?.userId?.name} </p>
                    <p>{comment.comment.comment}</p>
                  </div>
                </div>
                {
                  comment?.userId?._id === user._id && (
                    <button
                      onClick={() => deleteComment(comment.comment._id)}
                    >
                      <AiFillDelete className='w-10 h-6  text-red-400' />
                    </button>
                  )

                }
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3 '>
            <Link to={`user-profile/${pinDetail?.userId?._id}`} className='flex gap-2  items-center bg-white  rounded-lg cursor-pointer'>
              {
                pinDetail?.userId?.image ? (
                  <img src={pinDetail?.userId?.image} className='w-10 h-10 rounded-full object-cover' alt='user-profile' />

                ) :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
              }
            </Link>
            <input className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
              type='text'
              placeholder='Add Comment...'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              onClick={addComment}
              className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'>
              {addingComment ? 'Posting The Comment...' : "Post"}
            </button>
          </div>

        </div>

      </div>
      {
        pins? (
          <div>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4 '>More like this </h2>
        <MasonryLayout pins={pins}/>
      </div> 
        ):(
          <div className='mt-8'>
            <Spinner  message='Loading More pins' />
          </div>
        )
      }   



      </div>


  )

}
