import { useEffect, useState } from 'react'

const useLocalStorage = (key, defaultValue) => {

    const [value, setValue] = useState(()=>{
        let currentValue;

        try {
            const storedValue = localStorage.getItem(key);
            currentValue = storedValue ? JSON.parse(storedValue) : defaultValue
        } catch (e) {
           
            currentValue = defaultValue;
        }
        return currentValue;
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])

    return [value,setValue];
  
}

export default useLocalStorage