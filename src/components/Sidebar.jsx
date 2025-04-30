import React, { useContext, useEffect, useState, useRef } from "react";
import { SiAccuweather } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { WeatherContext } from "../context/WeatherContext";
import Lottie from "lottie-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {menuV2} from "../assets/menuV2.json"

const Sidebar = () => {
  const { dark, setDark } = useContext(WeatherContext);
  const [isOpen, setIsOpen] = useState(false);
  const lottieRef = useRef();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    lottieRef.current.setDirection(isOpen ? -1 : 1);
    lottieRef.current.play();
  };

  const getStyle = (path, darkColor, lightColor) => {
    if (location.pathname === `/${path}`) {
      return dark
        ? { filter: `drop-shadow(0px 0px 10px ${darkColor})` }
        : { filter: `drop-shadow(0px 0px 10px ${lightColor})` };
    }
    return {};
  };

  function toggleDark() {
    setDark((prev) => !prev);
  }

  return (
    <>
      <div
        onClick={toggleMenu}
        className="dark:bg-dark-mode faint-white absolute top-[2rem] left-[.5rem] z-50 w-10 rounded-md p-2 md:hidden hover:cursor-pointer"
      >
        <Lottie
          className={dark ? "lottie" : null}
          lottieRef={lottieRef}
          animationData={menuV2}
          loop={false}
          autoplay={false}
        />
      </div>
      <aside
        className={`sideBar z-49 m-0 flex rounded-none ${isOpen ? "opened-sidebar" : "closed-sidebar"}`}
      >
        <div className="mt-15">
          <Link to={"/dashboard"} onClick={toggleMenu} className="faint-white dark:bg-dark-mode m-auto mt-3 flex w-fit flex-col items-center rounded-md px-4 py-2 shadow-sm/50 shadow-black/50 hover:cursor-pointer dark:text-white">
            <SiAccuweather className="text-3xl text-orange-400" />
            <h1 className="mt-1 text-sm">Weather<span className="text-orange-400 text-lg font-bold">31</span></h1>
          </Link>
          <div className="mt-3 flex flex-col items-start gap-2 text-2xl hover:cursor-pointer">
            <Link onClick={toggleMenu}
              to={"/dashboard"}
              className={`${dark === true && location.pathname === "/dashboard" ? "shadow-gray-400/50" : ""} ${dark === false && location.pathname === "/dashboard" ? "shadow-gray-700" : ""} dark:bg-dark-mode faint-white flex w-full items-center gap-2 rounded-md px-4 py-2 shadow dark:text-white`}
            >
              <MdDashboard className="text-xl text-gray-500" />
              <h1 className="text-base">Dashboard</h1>
            </Link>
            <Link onClick={toggleMenu}
              to={"/saved"}
              className={`${dark === true && location.pathname === "/saved" ? "shadow-rose-500/50" : ""} ${dark === false && location.pathname === "/saved" ? "shadow-rose-700" : ""} dark:bg-dark-mode faint-white flex w-full items-center gap-2 rounded-md px-4 py-2 shadow dark:text-white`}
            >
              <MdFavorite className="text-xl text-red-400 dark:text-red-600" />
              <h1 className="text-base">Saved</h1>
            </Link>
            <Link onClick={toggleMenu}
              to={"/weather-map"}
              className={`${dark === true && location.pathname === "/weather-map" ? "shadow-amber-500/50" : ""} ${dark === false && location.pathname === "/weather-map" ? "shadow-amber-700" : ""} dark:bg-dark-mode faint-white flex w-full items-center gap-2 rounded-md px-4 py-2 shadow dark:text-white`}
            >
              <FaMapMarkerAlt className="text-xl text-amber-600 dark:text-amber-700" />
              <h1 className="text-base">Map</h1>
            </Link>
          </div>
          <div
            onClick={toggleDark}
            className="dark:bg-dark-mode faint-white mt-2 flex w-full items-center gap-2 rounded-md px-4 py-2 shadow-sm/50 shadow-black/50 hover:cursor-pointer dark:text-white"
          >
            {dark ? (
              <MdSunny className="text-xl text-amber-500" />
            ) : (
              <IoMdMoon />
            )}
            <h1 className="text-base">Change Theme</h1>
          </div>
        </div>
      </aside>

      <aside className="sideBar">
        <div className="grow">
          <Link to={"/dashboard"} className="mt-3 flex flex-col items-center hover:cursor-pointer">
            <SiAccuweather className="text-3xl text-orange-400" />
            <h1 className="mt-1 text-sm">Weather<span className="text-orange-400 text-lg font-bold">31</span></h1>
          </Link>
          <div className="mt-6 flex flex-col items-center gap-5 text-2xl hover:cursor-pointer">
            <Link to={"/dashboard"} className="group relative">
              <MdDashboard
                style={getStyle(
                  "dashboard",
                  "rgb(117, 124, 138)",
                  "rgb(53, 56, 62)",
                )}
                className="text-gray-500"
              />
              <div className="toolTip">Dashboard</div>
            </Link>

            <Link to={"/saved"} className="group relative">
              <MdFavorite
                className="text-red-400 dark:text-red-600"
                style={getStyle("saved", "rgb(255, 69, 72)", "rgb(255,0,0)")}
              />
              <div className="toolTip">Saved</div>
            </Link>

            <Link to={"/weather-map"} className="group relative">
              <FaMapMarkerAlt
                className="text-amber-600 dark:text-amber-700"
                style={getStyle(
                  "weather-map",
                  "rgb(186, 93, 27)",
                  "rgb(255, 106, 0)",
                )}
              />
              <div className="toolTip">Map</div>
            </Link>
          </div>
        </div>
        <div
          onClick={toggleDark}
          className="group relative m-auto mb-8 text-2xl hover:cursor-pointer"
        >
          {dark ? <MdSunny className="text-amber-500" /> : <IoMdMoon />}
          <div className="toolTip">Change Theme</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
