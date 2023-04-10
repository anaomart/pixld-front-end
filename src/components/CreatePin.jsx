import React, { useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { categories } from '../assets/data'
import { userRequest } from '../util/Request'
import { UserContext } from '../context/UserContext'
export default function CreatePin() {
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState('');
  const [category, setCategory] = useState('');
  const [imageAsset, setImageAsset] = useState('');
  const [wrongImageType, setWrongImageType] = useState('');


  const navigate = useNavigate();

  const uploadImageInfoToServer = async (image) => {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('about', about)
    formData.append('destination', destination)
    formData.append('image', image)
    formData.append('category', category)


    const response = await userRequest.post('/pin/addPin', formData, {
      headers: {
        "Content-type": "multipart/form-date",
      }
    })
    navigate('/')
  }
  const uploadImage = (e) => {
    const image = e.target.files[0]
    const { type } = image
    if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false)
      setImageAsset(URL.createObjectURL(image))
      setImage(image)
    } else {
      setLoading(false)
      setWrongImageType(true)
    }
  }
  const savePin = () => {
    if (title && about && destination && imageAsset && category) {
      uploadImageInfoToServer(image)
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false)
      }, [2000])
    }
  }
  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {
        fields && (
          <p className='text-red-500 mb-5 text-xl transition-all  duration-150 ease-in-out'>
            Please fill in all Fields
          </p>
        )
      }
      <div className='flex  lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'
        >
          <div className='flex relative justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {
              loading && <Spinner />}
            {wrongImageType && <p> Wrong Image type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full cursor-pointer'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>
                      Click to upload
                    </p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    use high-quality JPG ,SVG  PNG GIF Less than 20 MB
                  </p>
                </div>
                <input
                  type='file'
                  name='image'
                  className='w-0 h-0'
                  onChange={uploadImage}
                />
              </label>
            ) :
              (
                <div>
                  <img src={imageAsset} alt='uploaded-pic' className='h-full w-full' />
                  <button
                    type='button'
                    className='absolute bottom-3  right-3 p-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )
            }

          </div>
        </div>

        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title here '
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2  border-gray-200 p-2'
          />
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg border-b-2 pb-2'>
              <p className='font-bold text-xl text-gray-400'>PostedBy :</p>
              <img src={user?.image}
                className='w-10 h-10 rounded-full'
                alt='user-profile'
              />
              <p className='font-bold'> {user?.name}</p>
            </div>
          )}
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='What is your pin about ? '
            className='outline-none text-base sm:text-lg border-b-2  border-gray-200 p-2'
          />
          <input
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add destination Link  '
            className='outline-none text-base sm:text-lg border-b-2  border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold text-lg sm:text-xl'>Chose Pin Category</p>
            <select
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
            >
              <option value="other" className='bg-white'> Select Category</option>
              {categories.map((category) => (
                <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='flex justify-end items-center mt-5'>
            <button
              type='button'
              onClick={savePin}
              className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
            >
              Save Pin
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
