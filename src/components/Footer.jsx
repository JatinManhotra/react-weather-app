import React from 'react'
import { MdFavorite } from 'react-icons/md'

const Footer = () => {
  return (
    <section className='bg-emerald-400 z-50 dark:bg-emerald-500 flex items-center justify-center fixed w-full pb-10 mt-[-1.5rem] md:mt-[-1.2rem] lg:mt-[-1.5rem] xl:mt-[-.5rem] 2xl:mt-[-.5rem]  selection:bg-blue-500/70 selection:text-white dark:selection:bg-white/70 dark:selection:text-black '>
        <h1 className='flex items-center gap-1 text-sm lg:text-base xl:text-lg '>Made with <MdFavorite className=" text-rose-500 dark:text-rose-600" /> by <a className='hover:text-white' target='_blank' href="https://github.com/JatinManhotra">Jatin Manhotra</a></h1>
    </section>
  )
}

export default Footer