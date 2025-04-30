import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import moment from "moment-timezone";
import { IoLocationSharp } from "react-icons/io5";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaCompass } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import momentDurationFormatSetup from "moment-duration-format";
import { FiRefreshCw } from "react-icons/fi";
import WeatherSkeleton from "./skeleton/WeatherSkeleton";
import ErrorOccurred from "./error components/ErrorOccurred";
import { Link } from "react-router-dom";

momentDurationFormatSetup(moment);

const Weather = () => {
  const {
    toggleSwitch,
    setToggleSwitch,
    current,
    dark,
    forecast,
    location,
    todayHours,
    currentTime,
    dragging,
    setDragging,
    dayDuration,
    savedCities,
    addAndRemoveCity,
    savedCitiesWeatherData,
    draggingDiv,
    updateInputFromSavedCities,
    SavedCityRef,
    HourlyForecastRef,
    fetchWeather,
    loading,
    errorMsg
  } = useContext(WeatherContext);

  if(loading){
    return <WeatherSkeleton/>
  }

  if(errorMsg){
    return <ErrorOccurred/>
  }

  return (
    <>
        <section className="main-container"> {/* Main container*/}
        {current && forecast && location ? (
          <div className="pr-0.5 md:pr-2">
            {" "}
            {/* Bento grid layout*/}
            <div className="columns-1 gap-4 md:columns-1 lg:columns-2 xl:columns-2">
              {/* first block of the grid */}

              <div className="dark:bg-dark-mode faint-white relative mb-4 h-[18rem] break-inside-avoid rounded-2xl p-3 pl-4 md:p-4 md:pl-6 dark:text-white transition-all duration-300 ease-in">
                <div className="flex flex-wrap gap-2 md:gap-0 justify-between">
                  {/* location and region tabs */}
                  <div className="flex h-7 gap-2">
                    <p className="tabs">
                      <IoLocationSharp className="text-base mr-1" />
                      {location?.country}
                    </p>
                    <p className="tabs">{location?.region}</p>
                  </div>

                  {/* save btn and toggle btn */}

                  <div className="mt-2 md:mr-5 pl-[10rem] lg:pl-[10rem] xl:pl-0 md:pl-0 flex items-center gap-4 md:gap-8 xl:gap-4">
                  <div className="group relative mr-5 text-lg md:text-xl lg:text-lg xl:text-xl ml-[-2rem]" >
                  <FiRefreshCw className="hover:cursor-pointer" onClick={()=>fetchWeather(location?.name)} />
                    <div className="toolTip left-[-1rem] top-[1.5rem]">Refresh</div>
                  </div>
                    <div className="group relative">
                      {savedCities?.includes(location?.name) ? (
                        <>
                        <MdFavorite
                          onClick={() => addAndRemoveCity(location?.name)}
                          className="text-xl hover:cursor-pointer text-red-400 md:text-3xl lg:text-2xl xl:text-3xl dark:text-red-600"
                        />
                        <div className="toolTip left-[-2rem] top-[1.5rem] lg:top-[2rem]">Remove City</div>
                        </>
                      ) : (
                        <>
                        <MdFavoriteBorder
                          onClick={() => addAndRemoveCity(location?.name)}
                          className="text-xl hover:cursor-pointer md:text-3xl lg:text-2xl xl:text-3xl"
                        />
                         <div className="toolTip left-[-1rem] top-[1.5rem] lg:top-[2rem]">Save City</div>
                        </>
                      )}
                      
                    </div>
                    <div className="rounded-full bg-gray-500 hover:cursor-pointer dark:bg-gray-700">
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, celsius: true })
                        }
                        className={`${
                          toggleSwitch.celsius
                            ? "bg-red-400 dark:bg-red-500  hover:cursor-pointer"
                            : "bg-gray-500 hover:cursor-pointer dark:bg-gray-700"
                        } rounded-full text-white w-6 h-6 md:h-10 md:w-10 lg:h-7 lg:w-7 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10`}
                      >
                        C
                      </button>
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, celsius: false })
                        }
                        className={`${
                          toggleSwitch.celsius
                            ? "bg-gray-500 dark:bg-gray-700"
                            : "bg-amber-600 dark:bg-amber-700"
                        } rounded-full text-white hover:cursor-pointer w-6 h-6 lg:h-7 lg:w-7 md:h-10 md:w-10 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10`}
                      >
                        F
                      </button>
                    </div>
                  </div>
                </div>

                {/* temp and time */}
                <div className="md:mt-4 2xl:pl-2">
                  <p className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold xl:mt-4">
                    {moment()
                      .tz(location?.tz_id)
                      ?.format("dddd" + ",")}
                  </p>
                  <p className="text-lg md:text-xl lg:text-lg xl:text-xl dark:text-gray-300">
                    {moment().tz(location?.tz_id)?.format("D MMMM, YYYY")}
                  </p>
                  {currentTime && (
                    <p className="text-base md:text-lg lg:text-base xl:text-lg dark:text-gray-400">
                      {currentTime?.format("hh:mm A")}
                    </p>
                  )}
                </div>
                <div className="2xl:pl-2">
                  <div className="mt-5 flex items-center">
                    <h1 className="text-2xl md:text-5xl lg:text-3xl xl:text-4xl font-bold">
                      {toggleSwitch.celsius
                        ? current?.feelslike_c
                        : current?.feelslike_f}
                      °{toggleSwitch?.celsius ? "C" : "F"}
                    </h1>
                    <img
                      className="w-8 md:w-10"
                      src={dark ? "/dark_temperature.svg" : "/temperature.svg"}
                      alt=""
                    />
                  </div>
                  <p className="text-sm md:text-base w-20 md:w-fit lg:text-sm xl:text-base dark:text-gray-400">
                    High{" "}
                    {toggleSwitch?.celsius
                      ? forecast[0]?.day.maxtemp_c
                      : forecast[0]?.day.maxtemp_f}
                    °{toggleSwitch?.celsius ? "C" : "F"} | Min{" "}
                    {toggleSwitch?.celsius
                      ? forecast[0]?.day.mintemp_c
                      : forecast[0]?.day.mintemp_f}
                    °{toggleSwitch?.celsius ? "C" : "F"}
                  </p>
                </div>

                {/* weather icon and condition */}
                <div className="absolute right-5 bottom-8 md:right-5 md:bottom-6 flex flex-col items-center">
                  <img
                    className="w-[5rem] lg:w-[6rem] md:w-[8rem] rounded-full bg-sky-300 shadow-2xl shadow-sky-500 dark:bg-sky-600 dark:shadow-sky-700"
                    src={current?.condition?.icon}
                    alt=""
                  />
                  <p className="mt-5 w-40 text-center md:text-2xl lg:text-xl xl:text-2xl md:w-105 lg:w-60 xl:w-80 2xl:w-110">
                    {current.condition.text}
                  </p>
                </div>
              </div>

              {/* 2nd block of the grid */}
              <div className="dark:bg-dark-mode faint-white max-h-[19.5rem] min-h-[19.5rem] break-inside-avoid rounded-2xl p-4 pr-1 md:p-4  md:pb-5 select-none mb-4 md:mb-4  lg:min-h-[21.5rem] lg:max-h-[21.5rem] xl:mb-0 xl:max-h-[17.5rem] xl:min-h-[17.5rem] 2xl:max-h-[19.5rem] 2xl:min-h-[19.5rem] dark:text-white transition-all duration-300 ease-in">
                <div className="flex justify-between">
                  <h1 className="mb-2 md:text-lg">Saved Cities</h1>
                 <Link to={"/saved"} > <button className="show-all-btn"
                    disabled={savedCities?.length <= 0 ? true : false}>
                    Show All
                  </button></Link>
                </div>

                {savedCities?.length <= 0 ? (
                  <p className="text-sm md:text-base mt-4 flex items-center gap-2">
                    Save cities by clicking on{" "}
                    <MdFavorite className="text-xl text-rose-400 dark:text-rose-600" />{" "}
                    icon!
                  </p>
                ) : (
                  // saved cities scrollable div
                  <div
                    ref={SavedCityRef}
                    onMouseMove={(e) => draggingDiv(e, SavedCityRef)}
                    onMouseDown={() => setDragging(true)}
                    className={` ${
                      dragging ? "cursor-grab" : "cursor-default"
                    } savedCityDiv`}
                  >
                    {[
                      ...Array(Math.ceil(savedCitiesWeatherData.length / 4)),
                    ].map((_, groupIndex) => {
                      const start = groupIndex * 4;
                      const group = savedCitiesWeatherData.slice(
                        start,
                        start + 4,
                      );

                      return (
                        <div
                          key={groupIndex}
                          className="flex min-w-[100%] pr-2  md:min-w-[100%] flex-wrap gap-x-4"
                        >
                          {group.map(({ _, data }, index) => {
                            const realIndex = groupIndex * 4 + index;

                            return (
                              <div
                                key={realIndex}
                                className="group mb-4 h-fit min-w-[100%]   md:min-w-[48%] lg:min-w-[100%] xl:min-w-[48%] rounded-2xl px-4 py-4 shadow-sm/50 shadow-black hover:cursor-pointer xl:pr-2"
                              >
                                <div
                                  className="relative"
                                  
                                >
                                  <div>
                                    <h1 className="text-lg font-bold md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl w-[90%]  " onMouseDown={() =>
                                    updateInputFromSavedCities(
                                      data.location.name
                                    )
                                  }>
                                      {toggleSwitch.celsius
                                        ? data?.current.feelslike_c
                                        : data?.current.feelslike_f}
                                      °{toggleSwitch.celsius ? "C" : "F"}
                                    </h1>
                                    <h2 className="text-xs md:text-sm xl:text-sm 2xl:text-base dark:text-gray-300 w-[90%] " onMouseDown={() =>
                                    updateInputFromSavedCities(
                                      data.location.name
                                    )
                                  }> 
                                      {data?.location?.name}
                                    </h2>
                                    <h2 className="absolute top-4 right-15 text-xs md:text-sm md:top-4 md:right-20 lg:top-6 lg:right-30 xl:right-20 xl:text-xs 2xl:text-sm dark:text-gray-400">
                                      <b>H</b>
                                      {toggleSwitch.celsius
                                        ? data?.forecast?.forecastday[0]?.day
                                            ?.maxtemp_c
                                        : data?.forecast?.forecastday[0]?.day
                                            ?.maxtemp_f}{" "}
                                      <span>
                                        <b>L</b>
                                        {toggleSwitch.celsius
                                          ? data?.forecast?.forecastday[0]?.day
                                              ?.mintemp_c
                                          : data?.forecast?.forecastday[0]?.day
                                              ?.mintemp_f}
                                      </span>{" "}
                                    </h2>
                                    <img
                                      draggable="false"
                                      className="absolute top-0 right-0 z-50 w-[3rem] md:w-[4rem] xl:w-[4rem]"
                                      src={data?.current?.condition?.icon}
                                      alt=""
                                    />
                                  </div>
                                  {savedCities?.includes(
                                    data?.location?.name
                                  ) ? (
                                    <MdFavorite
                                      onClick={() =>
                                        addAndRemoveCity(data.location?.name)
                                      }
                                      className="favoriteIcon text-rose-400 dark:text-rose-600"
                                    />
                                  ) : (
                                    <MdFavoriteBorder
                                      onClick={() =>
                                        addAndRemoveCity(data.location?.name)
                                      }
                                      className="favoriteIcon dark:text-black"
                                    />
                                  )}
                                </div>
                                {/* <p className="warningMsg">
                                  <RiErrorWarningFill className="md:text-2xl text-orange-400" />{" "}
                                  Please wait, fetching weather
                                </p> */}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3rd block of the grid */}
              <div className="faint-white transition-all duration-300 ease-in dark:bg-dark-mode mb-4 break-inside-avoid rounded-2xl px-6 py-4 pb-6">
                <h1 className="mb-2 md:text-lg dark:text-white">
                  Today's Highlights
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* first condition div */}
                  <div className=" rounded-2xl bg-rose-400 pb-2 mb:pb-0 pt-2  pl-4 font-bold drop-shadow-xs drop-shadow-black dark:bg-rose-500">
                    <p>UV Index</p>
                    <div className="flex items-center">
                      <DotLottieReact
                        className="ml-[-1.5rem] md:ml-[-3rem] lg:w-35 lg:ml-[-2.5rem] w-30 md:w-50 xl:w-40 2xl:w-50"
                        src="https://lottie.host/972e7c36-be4e-4489-a11d-0efc34bd529a/KGFATkBedG.lottie"
                        loop
                        autoplay
                      />
                      <p className="text-2xl md:text-4xl lg:ml-[-1rem] lg:text-3xl font-bold text-rose-600 md:ml-0  xl:ml-0 xl:text-3xl 2xl:text-4xl 2xl:ml-[-.5rem] dark:text-rose-300">
                        {current?.uv}
                      </p>
                    </div>
                  </div>

                  {/* 2nd condition div */}
                  <div className="text-md rounded-2xl bg-sky-300 pt-2 pl-4 font-bold shadow-xs shadow-black dark:bg-sky-500 pb-4 md:pb-0">
                    <p>Humidity</p>
                    <div className="mt-4 flex items-center">
                      <DotLottieReact
                        className="ml-[-.3rem] lg:w-25 md:ml-[-1.5rem] w-20  md:w-30 xl:w-25 2xl:w-30"
                        src="https://lottie.host/d8dd06a1-5918-4009-9fdb-77c58837b636/qXXvBqOQik.lottie"
                        loop
                        autoplay
                      />
                      <p className="ml-[1.5rem] text-2xl lg:text-3xl md:text-4xl text-sky-600 md:ml-[1rem] lg:ml-[-1rem] xl:text-3xl xl:ml-[1.5rem] 2xl:text-4xl 2xl:ml-[2rem] dark:text-sky-300">
                        {current.humidity}%
                      </p>
                    </div>
                  </div>

                  {/* 3rd condition div */}
                  <div className="text-md relative rounded-2xl bg-yellow-200 pt-2 pb-4 pl-4 font-bold shadow-xs shadow-black dark:bg-yellow-300">
                    <p>Pressure</p>
                    <div className="absolute top-3  hover:cursor-pointer right-8 rounded-full  bg-yellow-500">
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, pressure: true })
                        }
                        className={`${
                          toggleSwitch.pressure
                            ? "bg-yellow-200 dark:bg-yellow-300 "
                            : "bg-yellow-500 "
                        } h-6 w-6 lg:h-5 lg:w-5  hover:cursor-pointer xl:h-6 xl:w-6 rounded-full text-xs text-yellow-600`}
                      >
                        in
                      </button>
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, pressure: false })
                        }
                        className={`${
                          toggleSwitch.pressure
                            ? "bg-yellow-500 "
                            : "bg-yellow-200 dark:bg-yellow-300  "
                        } h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6  hover:cursor-pointer rounded-full text-xs text-yellow-600`}
                      >
                        mb
                      </button>
                    </div>
                    <div className="mt-4 flex items-center">
                      <DotLottieReact
                        className="ml-[-.3rem] md:ml-[-.5rem] w-20 md:w-30 lg:w-20 lg:ml-[-1rem] xl:ml-[-1rem] xl:w-25 2xl:ml-[-.5rem] 2xl:w-30"
                        src="https://lottie.host/43e04eb9-6ce7-48a0-94b8-bd65a6389ac8/HMvw1J5881.lottie"
                        loop
                        autoplay
                      />
                      <p className="ml-[1rem] text-2xl lg:text-3xl lg:ml-[0rem] md:text-4xl text-yellow-700 md:ml-[1.5rem] xl:ml-[2rem] xl:text-3xl 2xl:ml-[2rem] 2xl:text-4xl dark:text-yellow-600">
                        {toggleSwitch.pressure
                          ? current.pressure_in.toFixed(1)
                          : current.pressure_mb}
                        <span className="text- text-lg">
                          {toggleSwitch.pressure ? "in" : "mb"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 4th condition div */}
                  <div className="text-md relative rounded-2xl bg-indigo-300 pt-2 pb-4 md:pb-6 pl-4 font-bold shadow-xs shadow-black dark:bg-indigo-500">
                    <p>Wind Status</p>
                    <div className="absolute  hover:cursor-pointer top-3 right-8 lg:right-2 xl:right-8 rounded-full bg-indigo-400">
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, wind: true })
                        }
                        className={`${
                          toggleSwitch.wind
                            ? "bg-indigo-300 dark:bg-indigo-500"
                            : "bg-indigo-400 dark:text-indigo-600"
                        } h-6 w-8 lg:h-5 lg:w-7  hover:cursor-pointer xl:h-6 xl:w-8 rounded-full text-xs text-indigo-600 dark:text-indigo-300`}
                      >
                        kph
                      </button>
                      <button
                        onClick={() =>
                          setToggleSwitch({ ...toggleSwitch, wind: false })
                        }
                        className={`${
                          toggleSwitch.wind
                            ? "bg-indigo-400 dark:text-indigo-600"
                            : "bg-indigo-300 dark:bg-indigo-500"
                        } h-6 w-8 lg:h-5 lg:w-7 xl:h-6  hover:cursor-pointer xl:w-8 rounded-full text-xs text-indigo-600 dark:text-indigo-300`}
                      >
                        mph
                      </button>
                    </div>
                    <div className="mt-4 flex items-center">
                      <DotLottieReact
                        className="ml-[-1.5rem] w-25 lg:w-20 md:w-30 xl:w-25 2xl:w-30"
                        src="https://lottie.host/a9e9b9df-19e7-4826-98c8-62d90004d892/3AkE1chlBz.lottie"
                        loop
                        autoplay
                      />
                      <p className="ml-[1rem] text-2xl lg:text-3xl lg:ml-[-.5rem] md:text-4xl text-indigo-600 md:ml-[1rem]  xl:ml-[1rem] xl:text-3xl 2xl:ml-[1.5rem] 2xl:text-4xl dark:text-indigo-300">
                        {toggleSwitch.wind
                          ? current.wind_kph
                          : current.wind_mph}
                        <span className="text-lg">
                          {toggleSwitch.wind ? "kph" : "mph"}
                        </span>{" "}
                        <span className="absolute right-5 bottom-2 flex items-center gap-1 text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-base">
                          <FaCompass />
                          {current.wind_dir}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4th block of the grid */}
              <div className="faint-white transition-all duration-300 ease-in dark:bg-dark-mode break-inside-avoid rounded-2xl px-6 py-4 dark:text-white">
                <h1 className="mb-2 md:text-lg">Today's Astro</h1>
                <div className="columns-1 md:columns-2 lg:columns-1 xl:columns-2">
                  <div className="mb-2 flex min-h-[40%] min-w-[50%] break-inside-avoid items-center justify-between rounded-2xl px-4 py-2 shadow-sm/50 shadow-black">
                    <div>
                      <h1 className="md:text-lg lg:text-base xl:text-lg dark:text-gray-400">Sunrise</h1>
                      <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-2xl font-bold">
                        {(forecast[0]?.astro.sunrise).slice(0, 5)}{" "}
                        <span className="text-base md:text-lg lg:text-sm xl:text-lg font-normal dark:text-gray-300">
                          {forecast[0]?.astro.sunrise?.slice(6, 8)}
                        </span>
                      </h2>
                    </div>
                    <img src="/sunrise.svg" className="w-12 md:w-15 lg:w-12 xl:w-15" alt="" />
                  </div>
                  <div className="mb-2 flex min-h-[40%] min-w-[50%] break-inside-avoid items-center justify-between rounded-2xl px-4 py-2 shadow-sm/50 shadow-black">
                    <div>
                      <h1 className="md:text-lg lg:text-base xl:text-lg dark:text-gray-400">Sunset</h1>
                      <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-2xl font-bold">
                        {(forecast[0]?.astro.sunset).slice(0, 5)}{" "}
                        <span className="text-base md:text-lg lg:text-sm xl:text-lg font-normal dark:text-gray-300">
                          {forecast[0]?.astro.sunset?.slice(6, 8)}
                        </span>
                      </h2>
                    </div>
                    <img src="/sunset.svg" className="w-12 md:w-15 lg:w-12 xl:w-15" alt="" />
                  </div>
                  <div className="flex min-w-[50%] break-inside-avoid flex-col items-start justify-between rounded-2xl px-4 py-2 shadow-sm/50 shadow-black">
                    <h1 className="md:text-lg lg:text-base xl:text-lg  dark:text-gray-400">
                      Length of the day
                    </h1>
                    <div className="m-auto flex h-[8rem] lg:h-[3rem] xl:h-[8rem] w-[90%] md:w-[80%] items-center justify-between lg:w-full xl:w-[90%] 2xl:w-[80%]">
                      <h2 className="text-3xl md:text-4xl lg:text-2xl font-bold xl:text-3xl 2xl:text-4xl">
                        {dayDuration.hours}
                        <span className="text-base md:text-xl xl:text-xl  lg:text-base font-normal dark:text-gray-300">
                          H
                        </span>{" "}
                        {dayDuration.mins}
                        <span className="text-base lg:text-base md:text-xl xl:text-xl font-normal dark:text-gray-300">
                          M
                        </span>{" "}
                      </h2>
                      <img
                        className="w-15 xl:w-12 lg:w-12"
                        src={dark ? "dark_length.svg" : "/length.svg"}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 5th block of the grid */}
            <div className="mt-4  flex gap-4 flex-wrap lg:flex-wrap xl:flex-nowrap">
              <div className="faint-white transition-all duration-300 ease-in dark:bg-dark-mode 2xl:max-w-[60%] h-[18rem] rounded-2xl px-6 py-4 md:h-[20rem] max-w-full xl:h-auto xl:max-w-[55%] dark:text-white">
                <h1 className="mb-2 md:text-lg">Hourly Forecast</h1>
                {/* hourly forecast scrollable div */}
                <div
                  draggable="false"
                  ref={HourlyForecastRef}
                  onMouseMove={(e) => draggingDiv(e, HourlyForecastRef)}
                  onMouseDown={() => setDragging(true)}
                  className="hourlyForecastDiv"
                >
                  {todayHours?.map((item, index) => {
                    let hour = item.time.slice(11, 13);
                    let timeOfTheDay = "AM";
                    if (hour < "12") {
                      timeOfTheDay = "AM";
                    } else {
                      timeOfTheDay = "PM";
                    }
                    if (hour == "00") {
                      hour = "12";
                      timeOfTheDay = "AM";
                    }
                    if (hour > "12") {
                      hour = "0" + (hour - 12).toString();
                    }
                    if (hour < "10") {
                      hour = hour.slice(1);
                    }
                    return (
                      <div
                        draggable="false"
                        key={index}
                        className={`${
                          dragging ? "cursor-grab" : "cursor-default"
                        } mb-4 flex w-[5rem] shrink-0 flex-col items-center justify-between rounded-xl px-2 py-4 shadow-sm/50 shadow-black`}
                      >
                        <p className="font-bold whitespace-nowrap dark:text-gray-300">
                          {hour + " " + timeOfTheDay}
                        </p>
                        <img
                          draggable="false"
                          src={item.condition.icon}
                          className=""
                          alt=""
                        />

                        <p>
                          {toggleSwitch.celsius
                            ? item.feelslike_c
                            : item.feelslike_f}
                          °{toggleSwitch.celsius ? "C" : "F"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 6th block of the grid */}
              <div className="faint-white transition-all duration-300 ease-in dark:bg-dark-mode w-full rounded-2xl px-6 py-4 dark:text-white">
                <h1 className="mb-2 md:text-lg">3-Days Forecast</h1>
                {forecast?.map((item, index) => {
                  const date = moment(item?.date);
                  const today = moment();
                  let label;

                  if (date.isSame(today, "day")) {
                    label = "Today";
                  } else if (date.isSame(today.clone().add(1, "day"), "day")) {
                    label = "Tomorrow";
                  } else {
                    label = date.format("dddd");
                  }

                  return (
                    <div
                      key={index}
                      className="mb-4 flex shrink-0 items-center justify-between rounded-xl px-4 pr-0 shadow-sm/50 shadow-black"
                    >
                      <div className="flex items-center xl:gap-4">
                        <div className="w-[8rem] md:w-[15rem]">
                          <p className="text-sm md:text-base font-bold">{label}</p>
                          <p className="text-xs md:text-sm dark:text-gray-400">
                            {item?.day?.condition?.text}
                          </p>
                        </div>
                        <p className="text-lg md:text-2xl">
                          {toggleSwitch.celsius
                            ? item?.day?.avgtemp_c
                            : item?.day?.avgtemp_f}
                          °{toggleSwitch.celsius ? "C" : "F"}
                        </p>
                      </div>

                      <img className="w-12 md:w-15" src={item?.day?.condition?.icon} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </section>
      
      
     
    </>
  );
};

export default Weather;
