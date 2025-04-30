import React, { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { WeatherContext } from "../context/WeatherContext";
import { useNavigate } from "react-router-dom";
import WeatherMapSkeleton from "./skeleton/WeatherMapSkeleton";
import ErrorOccurred from "./error components/ErrorOccurred";

const WeatherMap = () => {
  const {
    location,
    current,
    savedCities,
    savedCitiesWeatherData,
    fetchWeather,
    dark,
    toggleSwitch,
    loading,
    errorMsg
  } = useContext(WeatherContext);

  const lat = location?.lat;
  const lon = location?.lon;
  const name = location?.name;
  const weatherText = current?.condition?.text;
  const weatherIcon = current?.condition?.icon;

  const navigate = useNavigate();

  const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      },
    });
    return null;
  };

  const getCityNameFromLatLon = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    );
    const data = await res.json();
    return data?.address?.city || data?.address?.town || data?.address?.village;
  };

  const handleMapClick = async (lat, lon) => {
    const cityName = await getCityNameFromLatLon(lat, lon);

    if (cityName) {
      navigate("/dashboard");
      fetchWeather(cityName);
    }
  };

  if(loading){
    return <WeatherMapSkeleton/>
  }

  if(errorMsg){
    return <ErrorOccurred/>
  }

  return (
    <section className="z-48 main-container dark:bg-dark-mode faint-white mr-2 rounded-lg pl-2 pt-4 md:p-4 md:pr-2 transition-all duration-300 ease-in dark:text-white">
      <h1 className="mb-4 pl-2 xl:text-lg">Weather Map</h1>
      
        <div>
          {lat !== undefined ||
          lon !== undefined ||
          savedCitiesWeatherData?.length > 0 ? (
            <MapContainer
              center={[lat, lon]}
              zoom={2}
              className="w-full min-h-[70vh] " 
            >
              {!dark ? (
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              ) : (
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
              )}
              <MapClickHandler onMapClick={handleMapClick} />

              <Marker position={[lat, lon]}>
                <Popup>
                  <h1 className="md:text-base font-bold">{name}</h1>
                  
                  <div className="flex gap-2 items-center">
                  <div className="w-12 md:w-15">
                  <img className="w-fit" src={weatherIcon} alt="" />
                  <h2 className="md:text-sm text-center">{weatherText}</h2>
                  </div>
                  
                  <h3 className="text-lg md:text-xl">{toggleSwitch.celsius ? current?.feelslike_c : current?.feelslike_f}°{toggleSwitch.celsius ? "C" : "F"}</h3>
                  </div>
                </Popup>
              </Marker>

              {savedCitiesWeatherData.map((item, index) => {
                const { lat, lon, name } = item.data.location;
                const weatherText = item.data.current.condition.text;
                const weatherIcon = item.data.current.condition.icon;
                

                return (
                  <Marker key={index} position={[lat, lon]}>
                    <Popup>
                    <h1 className=" md:text-base  font-bold">{name}</h1>
                  
                  <div className="flex gap-2 items-center">
                  <div className="w-12 md:w-15">
                  <img className="w-fit" src={weatherIcon} alt="" />
                  <h2 className="md:text-sm text-center">{weatherText}</h2>
                  </div>
                  
                  <h3 className="text-lg md:text-xl">{toggleSwitch.celsius ? item?.data?.current?.feelslike_c : item?.data?.current?.feelslike_f}°{toggleSwitch.celsius ? "C" : "F"}</h3>
                  </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          ) : (
            <p>Failed to fetch weather map data</p>
          )}
        </div>
      
    </section>
  );
};

export default WeatherMap;
