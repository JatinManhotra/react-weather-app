import React from "react";
import Weather from "./components/Weather";
import WeatherContextProvider from "./context/WeatherContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {Routes,Route, Navigate} from "react-router-dom"
import SavedCities from "./components/SavedCities";
import WeatherMap from "./components/WeatherMap";
import NotFound from "./components/error components/NotFound";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
      <WeatherContextProvider>
        <header>
          <Navbar />
        </header>
        <main>
        <div className="flex selection:bg-blue-500/70 selection:text-white dark:selection:bg-white/70 dark:selection:text-black">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
            <Route path="/dashboard" element={ <Weather />}/>
            <Route path="/saved" element={ <SavedCities />}/>
            <Route path="/weather-map" element={ <WeatherMap />}/>
            <Route path="*" element={ <NotFound />}/>
          </Routes>
         
          </div>
        </main>
        <footer>
        <Footer/>
        </footer>
      </WeatherContextProvider>
    </>
  );
};

export default App;
