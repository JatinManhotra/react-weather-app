import React from 'react';

const WeatherMapSkeleton = () => {
  return (
    <>
      <section className="z-48 main-container faint-white dark:bg-dark-mode mr-2 rounded-lg pl-2 pt-4 md:p-4 md:pr-2 transition-all duration-300 ease-in">
        <h1 className="mb-4 pl-2 xl:text-lg rounded-xl dark:bg-gray-600 bg-gray-400 animate-pulse h-6 w-1/3"></h1>
        <div>
          <div className="mt-6 flex items-center gap-2 text-sm rounded-lg md:text-base 2xl:text-lg dark:bg-gray-600 bg-gray-400 animate-pulse h-4 w-2/3"></div>
          <div className="mt-4 dark:bg-gray-600 bg-gray-400 animate-pulse min-h-[60vh] w-full rounded-lg"></div>
          
        </div>
      </section>
    </>
  );
};

export default WeatherMapSkeleton;
