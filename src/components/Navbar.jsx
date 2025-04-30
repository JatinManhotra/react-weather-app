import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {input, setInput, fetchWeather} = useContext(WeatherContext);
    const navigate = useNavigate();

    function fetchWithoutWhitespace(){
      if(input.trim() !== ""){
        fetchWeather(input)
        navigate("/dashboard")
      }
    }

    function fetchWithEnter(e){
      
      if(e.key === "Enter"){
        fetchWithoutWhitespace();
      }
    }

  return (
    <>
    <nav className='flex  items-center justify-between h-8 ml-[4rem] mt-[2.2rem] md:ml-[8rem] md:mt-[2rem] dark:bg-dark-mode dark:text-white faint-white max-w-full mr-4 md:mr-0 md:max-w-[20rem] px-2  rounded-2xl  selection:bg-blue-500/70 selection:text-white dark:selection:bg-white/70 dark:selection:text-black'>
        
        <input className=' placeholder:text-sm grow text-sm outline-0 px-1 border-0 bg-transparent'
        placeholder='Search city...'
        type="text"
        name="search"
        value={input}
        onKeyDown={fetchWithEnter}
        onChange={(e) => setInput(e.target.value)}
      />
      {input.trim() <= 0 ? null : <IoSearchSharp className='bg-blue-400 dark:bg-blue-600 h-full w-[3.75rem] p-1 rounded-full mr-[-8px] hover:cursor-pointer text-white  ' onClick={fetchWithoutWhitespace}/>}

     
    </nav>
    
      </>
  )
}

export default Navbar