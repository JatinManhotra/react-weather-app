import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {error_404} from "../../assets/404.png"

const NotFound = () => {
  return (
    <section className='main-container  dark:bg-dark-mode faint-white mr-2 rounded-lg p-4 transition-all duration-300 ease-in dark:text-white'>
        <img  src={error_404} className='m-auto mt-6 md:w-[80%] lg:w-[60%] 2xl:w-1/2' alt="" />
        <h1 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold'>This page doesn't <span className='text-emerald-500'>exist</span></h1>
        <div className='flex mt-6 w-full justify-center'>
        <Link to={"/"}><button className='flex gap-2 text-white items-center text-sm lg:text-lg bg-emerald-500 px-2 py-1 rounded-md hover:bg-emerald-600 hover:cursor-pointer'><FaHome /> Back to Homepage</button></Link>
        </div>
    </section>
  )
}

export default NotFound