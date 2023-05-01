import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { UserContext } from '../context/UserContext';


export default function Login() {
    const navigate= useNavigate()
    const {user , setUser } = useContext(UserContext)

    const URL = 'https://13.53.234.187'
    const onSuccessLogin = async (response) => {
        const JWT = response.credential
        localStorage.setItem('user',JSON.stringify(JWT));
        setUser(JWT)
        window.location.reload();
        await sendJWTToServer(JWT)
        navigate('/')
    }

        async  function  sendJWTToServer(JWT){
            const response = await fetch(URL+'/user/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({JWT})
            })
        }
    
    return (
        <div className='flex justify-start items-center flex-col h-screen ' >
            <div className='relative w-full h-full'>
                <video className='w-full h-full object-cover'
                    src={shareVideo}
                    loop
                    controls={false}
                    muted
                    autoPlay
                >
                </video>
                <div className='absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} className='w-[130px]' alt='logo' />
                    </div>
                    <div className='shadow-2xl'>


                        <GoogleLogin
                            onSuccess={(response)=> {onSuccessLogin(response)}}
                            onError={() => {
                                console.log({Error:'Login Failed'});
                            }}
                            useOneTap
                        />

                    </div>
                </div>
            </div>




        </div>
    )
}
