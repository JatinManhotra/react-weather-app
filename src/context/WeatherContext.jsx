import React, { createContext, useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import useLocalStorage from "../hooks/useLocalStorage";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const SavedCityRef = useRef();
  const HourlyForecastRef = useRef();

  //declaring states
  const [toggleSwitch, setToggleSwitch] = useState({
    celsius: true,
    pressure: true,
    wind: true,
  });
  const [dragging, setDragging] = useState(false);
  const [dayDuration, setDayDuration] = useState({
    hours: null,
    mins: null,
  });
  const [savedCities, setSavedCities] = useLocalStorage("cityNames", []);
  const [savedCitiesWeatherData, setSavedCitiesWeatherData] = useState([]);

  const [dark, setDark] = useLocalStorage("dark-theme", false);
  const [currentTime, setCurrentTime] = useState();
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [todayHours, setTodayHours] = useState();

  //fetching data from api

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=bf8ef3729d2043b7a7e65537250704&q=${
          city || input
        }&days=${7 || 3}`,
      );
      if (!res.ok) {
        throw new Error("Error occurred, please refresh the page");
      }
      const data = await res.json();

      if (data) {
        setForecast(() => data?.forecast?.forecastday?.map((item) => item));
        setCurrent(() => data?.current);
        setLocation(() => data?.location);

        setLoading(false);
        setErrorMsg(false);
      }
    } catch (error) {
      console.log(error.message);
   
      setLoading(false);
      setErrorMsg(true);
    }
  };


  // add and remove city from local storage
  function addAndRemoveCity(cityName) {
    setSavedCities((prevCities) => {
     
      if (prevCities?.includes(cityName)) {
        return prevCities.filter(city => city !== cityName);
    } else {
      return [...prevCities, cityName];
     
    }});
   
  }

  // enable dragging and scrolling in divs

  function draggingDiv(e, ref) {
    if (!dragging) return;
    const div = ref.current;
    div.scrollLeft -= e.movementX;
  }

  function dragStop() {
    setDragging(false);
  }

  function scrollingDiv(event, ref) {
    event.preventDefault();
    const div = ref.current;
    div.scrollLeft += event.deltaY * 5;
    div.scrollTop += event.deltaY;
  }

  //update ui when clicked on a saved city
  function updateInputFromSavedCities(value) {
   setTimeout(() => {
    fetchWeather(value);
   }, 1000);
  
  }

  useEffect(() => {
    if (!forecast) return;
    setTodayHours(() => forecast[0].hour);
  }, [forecast]);

  useEffect(() => {
    fetchWeather("new delhi");
   
  }, []);

  // update current time data in real time
  useEffect(() => {
    if (!location) return;
    function updateTime() {
      setCurrentTime(moment().tz(location.tz_id));
    }
    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [location]);

  // change theme when dark state changes

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  //fetch data for every saved city

  useEffect(() => {
    const fetchSavedWeatherData = async () => {
      const allData = await Promise.all(
        savedCities.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.weatherapi.com/v1/forecast.json?key=bf8ef3729d2043b7a7e65537250704&q=${city}&days=${
                7 || 3
              }`,
            );
            if (!res.ok) throw new Error("Error fetching city: " + city);
            const data = await res.json();
            return { city, data };
          } catch (err) {
            console.error(err.message);
            return { city, data: null };
          }
        }),
      );

      setSavedCitiesWeatherData(allData);
    };

    if (savedCities?.length > 0) {
      fetchSavedWeatherData();
    }
  }, [savedCities]);

  // adding event listeners for making divs scrollable

  useEffect(() => {
    if (!HourlyForecastRef.current || !SavedCityRef.current) return;
    const div1 = SavedCityRef.current;
    const div2 = HourlyForecastRef.current;
    const handleWheel1 = (e) => scrollingDiv(e, SavedCityRef);
    const handleWheel2 = (e) => scrollingDiv(e, HourlyForecastRef);

    div1.addEventListener("wheel", handleWheel1, { passive: false });
    div2.addEventListener("wheel", handleWheel2, { passive: false });

    return () => {
      div1.removeEventListener("wheel", handleWheel1);
      div2.removeEventListener("wheel", handleWheel2);
    };
  }, [SavedCityRef.current, HourlyForecastRef.current]);

  document.addEventListener("mouseup", dragStop);

  // calculating length of the day

  useEffect(() => {
    if (!forecast) return;
    const sunrise = forecast[0]?.astro?.sunrise;
    const sunset = forecast[0]?.astro?.sunset;

    const sunriseMoment = moment(sunrise, "hh:mm A");
    const sunsetMoment = moment(sunset, "hh:mm A");

    const duration = moment.duration(sunsetMoment.diff(sunriseMoment));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    setDayDuration({
      hours: hours,
      mins: minutes,
    });
  }, [forecast]);

  // updating bg images on basis of weather conditions and time

  useEffect(() => {
    if (!current || !currentTime || !forecast) return;

    const text = current.condition?.text || "";
    const currentTimeMoment = moment(currentTime.format("hh:mm A"), "hh:mm A");
    const sunriseMoment = moment(forecast[0]?.astro?.sunrise, "hh:mm A");
    const sunsetMoment = moment(forecast[0]?.astro?.sunset, "hh:mm A");

    const includesAny = (str, arr) => arr.some((word) => str.includes(word));

    const isNight =
      currentTimeMoment.isBefore(sunriseMoment) ||
      currentTimeMoment.isAfter(sunsetMoment);

    if (includesAny(text, ["Sunny"])) {
      document.body.style.backgroundImage = isNight
        ? "url(/img2.jpeg)"
        : "url(/img1.jpeg)";
      return;
    }

    if (includesAny(text, ["Clear"])) {
      document.body.style.backgroundImage = isNight
        ? "url(/img2.jpeg)"
        : "url(/img1.jpeg)";
      return;
    }

    if (includesAny(text, ["Partly cloudy", "Cloudy", "Overcast", "cloud"])) {
      document.body.style.backgroundImage = "url(/img5.jpeg)";
      return;
    }

    if (
      includesAny(text, [
        "rain",
        "thunder",
        "drizzle",
        "Patchy rain possible",
        "Patchy rain nearby",
        "Light drizzle",
        "Patchy light drizzle",
        "Light rain",
        "Moderate rain",
        "Heavy rain",
        "Thundery outbreaks possible",
        "Patchy light rain with thunder",
        "Moderate or heavy rain with thunder",
      ])
    ) {
      document.body.style.backgroundImage = "url(/img3.jpeg)";
      return;
    }

    if (
      includesAny(text, [
        "snow",
        "Patchy snow possible",
        "Patchy light snow",
        "Blowing snow",
        "Light snow",
        "Moderate snow",
        "Heavy snow",
        "sleet"
      ])
    ) {
      document.body.style.backgroundImage = "url(/img4.jpeg)";
      return;
    }

    document.body.style.backgroundImage = isNight
      ? "url(/img2.jpeg)"
      : "url(/img1.jpeg)";
  }, [current, currentTime, forecast]);

  useEffect(() => {
    if (!current) return;
    console.log(current);
    console.log(forecast);
    console.log(location);
  }, [current]);

  return (
    <WeatherContext.Provider
      value={{
        input,
        setInput,
        current,
        forecast,
        location,
        loading,
        setLoading,
        errorMsg,
        setErrorMsg,
        fetchWeather,
        todayHours,
        currentTime,
        dark,
        setDark,
        toggleSwitch,
        setToggleSwitch,
        dragging,
        setDragging,
        dayDuration,
        setDayDuration,
        savedCities,
        setSavedCities,
        savedCitiesWeatherData,
        setSavedCitiesWeatherData,
      
        addAndRemoveCity,
        draggingDiv,
        dragStop,
        scrollingDiv,
        updateInputFromSavedCities,
        SavedCityRef,
        HourlyForecastRef,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
