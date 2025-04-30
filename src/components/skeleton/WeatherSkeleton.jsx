import React from "react";

const WeatherSkeleton = () => {
  return (
    <>
      <section className="main-container">
        <div className="columns-1 lg:columns-2 ">
          <div className="dark:bg-dark-mode faint-white  relative mb-4 h-[20rem] md:h-[19rem] lg:h-[20rem] break-inside-avoid rounded-2xl p-3 pl-4 md:p-4 md:pl-6">
            <div className="flex flex-wrap justify-between gap-2 md:gap-0">
              <div className="flex h-7 gap-2">
                <div className="mt-1 xl:mt-4 h-full w-15 md:w-24 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
                <div className="mt-1 xl:mt-4 h-full w-15 md:w-24 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
              </div>

              <div className="mt-2 flex items-center gap-4 pl-[5rem] md:mr-5 md:gap-8 md:pl-0 lg:pl-[10rem] xl:gap-4 xl:pl-0">
                <div className="h-7 w-7 md:h-8 md:w-8 animate-pulse rounded-full  dark:bg-gray-600 bg-gray-400"></div>
                <div className="h-7 w-7 md:h-8 md:w-8 animate-pulse rounded-full  dark:bg-gray-600 bg-gray-400"></div>
                <div className="flex h-8 w-18 md:h-10 md:w-20 animate-pulse items-center justify-center rounded-full  dark:bg-gray-600 bg-gray-400"></div>
              </div>
            </div>
            <div className="md:mt-4 2xl:pl-2">
              <div className="mt-4 h-6 w-28 md:w-32 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
              <div className="mt-4 h-4 w-23 md:w-24 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
              <div className="mt-4 h-4 w-16 md:w-20 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
            </div>
            <div className="2xl:pl-2">
              <div className="mt-4 mb:mt-5 flex items-center">
                <div className="mt-4 h-10 w-25 md:w-30 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
              </div>
              <div className=" mt-4 h-4 w-25 md:w-40 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
            </div>
            <div className="absolute right-8 bottom-15 md:right-30 2xl:right-45 flex flex-col items-center lg:right-20 lg:bottom-10">
              <div className="mt-4 h-20 w-20 md:h-25 md:w-25 animate-pulse rounded-full  dark:bg-gray-600 bg-gray-400"></div>
              <div className="mt-4 h-6 w-30 animate-pulse rounded  dark:bg-gray-600 bg-gray-400"></div>
            </div> 
          </div>

          <div className="dark:bg-dark-mode faint-white  relative mb-4 h-[18rem] lg:h-[18rem] xl:h-[17rem] break-inside-avoid rounded-2xl p-3 pl-4 md:p-4 md:pl-6 overflow-hidden ">
           
              <div className="mt-2 flex justify-between">
                <div className="mb-2 h-6 w-1/2 animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400 md:text-lg"></div>
                <button
                  className="h-8 w-24 animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400"
                  ariaLabel="Show All"
                ></button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-4 w-3/4 animate-pulse rounded-xl  dark:bg-gray-600 bg-gray-400"></div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 ">
                <div className="group  h-fit min-w-[100%] min-h-[4rem] animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400 px-4 py-4 md:min-w-[48%] lg:min-w-[100%] xl:min-w-[48%]">
                
                </div>
                <div className="group  h-fit min-w-[100%] min-h-[4rem] animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400 px-4 py-4 md:min-w-[48%] lg:min-w-[100%] xl:min-w-[48%]">
                
                </div>
                <div className="group  h-fit min-w-[100%] min-h-[4rem] animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400 px-4 py-4 md:min-w-[48%] lg:min-w-[100%] xl:min-w-[48%]">
                
                </div>
                <div className="group  h-fit min-w-[100%] min-h-[4rem] animate-pulse rounded-2xl  dark:bg-gray-600 bg-gray-400 px-4 py-4 md:min-w-[48%] lg:min-w-[100%] xl:min-w-[48%]">
                
                </div>
                
            </div>
          </div>

          <div className="dark:bg-dark-mode faint-white  relative mb-4 lg:h-[21rem] xl:h-[22rem] break-inside-avoid rounded-2xl p-3 pl-4 md:p-4 md:pl-6 overflow-hidden">
          
        <h1 className="mb-2 mt-4 md:text-lg  dark:bg-gray-600 bg-gray-400 animate-pulse h-6 w-1/2 rounded-xl"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
          <div className="rounded-2xl  dark:bg-gray-600 bg-gray-400 animate-pulse pb-2 mb:pb-0 pt-2 pl-4 h-24">
            
          </div>
          <div className="rounded-2xl  dark:bg-gray-600 bg-gray-400 animate-pulse pb-2 mb:pb-0 pt-2 pl-4 h-24">
            
          </div>
          <div className="rounded-2xl  dark:bg-gray-600 bg-gray-400 animate-pulse pb-2 mb:pb-0 pt-2 pl-4 h-24">
            
          </div>
          <div className="rounded-2xl  dark:bg-gray-600 bg-gray-400 animate-pulse pb-2 mb:pb-0 pt-2 pl-4 h-24">
            
          </div>
          
         
          </div>
          </div>
         

          <div className="dark:bg-dark-mode faint-white  relative mb-4 h-fit lg:h-fit xl:h-[15rem] break-inside-avoid rounded-2xl p-3 pl-4 md:p-4 md:pl-6">
          <h1 className="xl:mb-8 mt-4 lg:mt-0 md:text-lg  dark:bg-gray-600 bg-gray-400 rounded-xl animate-pulse h-6 w-1/2"></h1>
        <div className="columns-1 md:columns-2 lg:columns-1 xl:columns-2 mt-4  ">
          <div className="mb-2 flex min-h-[4rem] min-w-[50%] break-inside-avoid items-center justify-between rounded-2xl px-4 py-2  dark:bg-gray-600 bg-gray-400 animate-pulse">
            
          </div>
          <div className="mb-2 flex min-h-[4rem] min-w-[50%] break-inside-avoid items-center justify-between rounded-2xl px-4 py-2  dark:bg-gray-600 bg-gray-400 animate-pulse">
            
          </div>
          <div className="flex min-h-[6rem] md:min-h-[8.5rem] lg:min-h-[4rem] xl:min-h-[8.5rem] min-w-[50%] break-inside-avoid flex-col items-start justify-between rounded-2xl px-4 py-2  dark:bg-gray-600 bg-gray-400 animate-pulse">
            
          </div>
        </div>
          </div>
        </div>
        <div className=" flex gap-4 flex-wrap lg:flex-wrap xl:flex-nowrap">
          
      <div className="dark:bg-dark-mode faint-white  transition-all duration-300 ease-in w-full  2xl:max-w-[60%] h-[18rem] rounded-2xl px-6 py-4 md:h-[17rem] max-w-full xl:h-auto xl:max-w-[55%] dark:text-white">
        <h1 className="mb-2 md:text-lg  dark:bg-gray-600 bg-gray-400 animate-pulse h-6 w-1/2 rounded-xl"></h1>
        <div className="hourlyForecastDiv overflow-hidden mt-4">
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
            
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
          <div className="mb-4 flex w-[5rem] h-[12rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4  dark:bg-gray-600 bg-gray-400 animate-pulse">
           
           
          </div>
        </div>
      </div>

      <div className="dark:bg-dark-mode faint-white  w-full rounded-2xl px-6 py-4">
        <h1 className="mb-4 md:text-lg rounded-xl  dark:bg-gray-600 bg-gray-400 animate-pulse h-6 w-1/3"></h1>
        <div className="mb-4 h-[3.5rem] w-full animate-pulse   dark:bg-gray-600 bg-gray-400 shrink-0  rounded-xl px-4 pr-0">
         
        </div>
        <div className="mb-4 h-[3.5rem] w-full animate-pulse   dark:bg-gray-600 bg-gray-400 shrink-0  rounded-xl px-4 pr-0">
         
        </div>
        <div className=" h-[3.5rem] w-full animate-pulse   dark:bg-gray-600 bg-gray-400 shrink-0  rounded-xl px-4 pr-0">
         
        </div>
        
        </div>

        </div>
      </section>
    </>
  );
};

export default WeatherSkeleton;
