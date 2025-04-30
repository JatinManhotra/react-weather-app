import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SavedCitiesSkeleton from "./skeleton/SavedCitiesSkeleton";
import ErrorOccurred from "./error components/ErrorOccurred";

const SavedCities = () => {
  const {
    savedCitiesWeatherData,
    savedCities,
    addAndRemoveCity,
    toggleSwitch,
    updateInputFromSavedCities,
    loading,
    errorMsg

  } = useContext(WeatherContext);

  const navigate = useNavigate();

  function showWeatherInDashboard(name){
    updateInputFromSavedCities(name);
    navigate("/dashboard");
  
  }

   if(loading){
      return <SavedCitiesSkeleton/>
    }
  
    if(errorMsg){
      return <ErrorOccurred/>
    }

  return (
    <section className="main-container dark:bg-dark-mode faint-white mr-2 rounded-lg p-4 transition-all duration-300 ease-in dark:text-white">
      <h1 className="mb-4 xl:text-lg">Saved Cities</h1>
      {savedCities?.length <= 0 ? (
        <p className="mt-6 flex items-center gap-2 text-sm md:text-base 2xl:text-lg">
          There are currently no saved cities!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {savedCitiesWeatherData?.map((item, index) => {
            return (
              <div className="group  px-2 pb-2 md:px-4 md:pr-10 lg:pr-8 shadow-lg/30 shadow-black/50 rounded-lg"
              
                key={index}>
                <div className="relative flex flex-col items-start justify-between   md:flex-row md:items-center "
               
                >
                  <div className="w-[90%] md:w-[50%] lg:w-[40%] xl:w-[50%] hover:cursor-pointer"  onMouseDown={()=>showWeatherInDashboard(item?.data?.location?.name)}>
                    <h1 className="font-bold md:text-base lg:text-sm xl:text-lg ">
                      {item?.data?.location?.name}
                    </h1>
                    <h2 className="text-xs md:text-sm lg:text-xs xl:text-base dark:text-gray-400">
                      {item?.data?.location?.region}
                    </h2>
                  </div>
                  <div className="mt-2 flex gap-10 rounded-lg pt-2 md:mt-0 md:px-2 lg:gap-5 xl:gap-10">
                    <div className="flex flex-col items-end">
                      <h2 className="text-xs md:text-sm xl:text-base dark:text-gray-400">
                        Today
                      </h2>
                      <div className="flex items-center">
                        <img
                          className="w-10 md:w-13 lg:w-12 xl:w-15"
                          src={item?.data?.current?.condition?.icon}
                          alt=""
                        />

                        <h1 className="ml-2 text-xl md:text-xl xl:text-2xl">
                          {toggleSwitch.celsius
                            ? item?.data?.current?.feelslike_c
                            : item?.data?.current?.feelslike_f}
                          °{toggleSwitch.celsius ? "C" : "F"}
                        </h1>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <h2 className="text-xs md:text-sm xl:text-base dark:text-gray-400">
                        Tomorrow
                      </h2>
                      <div className="flex items-center">
                        <img
                          className="w-10 md:w-13 lg:w-12 xl:w-15"
                          src={
                            item?.data?.forecast?.forecastday[1]?.day?.condition
                              ?.icon
                          }
                          alt=""
                        />
                        <h1 className="ml-2 text-xl md:text-xl xl:text-2xl">
                          {toggleSwitch.celsius
                            ? item?.data?.forecast?.forecastday[1]?.day
                                ?.avgtemp_c
                            : item?.data?.forecast?.forecastday[1]?.day
                                ?.avgtemp_f}
                          °{toggleSwitch.celsius ? "C" : "F"}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {savedCities?.includes(item?.data?.location?.name) ? (
                    <MdFavorite
                      onClick={() =>
                        addAndRemoveCity(item?.data?.location?.name)
                      }
                      className="favoriteIcon top-[0rem] right-[-1rem] md:right-[-2rem] text-rose-400 dark:text-rose-600"
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() =>
                        addAndRemoveCity(item?.data?.location?.name)
                      }
                      className="favoriteIcon top-0 right-[-1rem] md:right-[-2rem] dark:text-black"
                    />
                  )}
                </div>

                {/* <p className="warningMsg">
                  <RiErrorWarningFill className="text-orange-400 md:text-2xl" />{" "}
                  Please wait, fetching weather
                </p> */}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SavedCities;
