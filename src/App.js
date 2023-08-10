import './App.css';
import TopButtons from "./components/TopButtons";
import TimeAndLocation from './components/TimeAndLocation';
import TempratureAndDetails from './components/TempratureAndDetails';
import Forecast from './components/Forecast';
import InputSection from './components/InputSection';
import getFormattedWeatherData from './services/weatherService';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function App() {
  const [query, setQuery] = useState({ q: "delhi" })
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then((data) => {
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units])

  async function formatBackground() {
    if (!weather) return "bg-gradient-to-br from-black-700 to-blue-700";
    
    // const imageUrl = await getUnsplashImageUrl(weather);
    const imageUrl = "https://unsplash.com/photos/mBQIfKlvowM";
    console.log(imageUrl);const value = `bg-cover bg-center bg-fixed flex items-center justify-center" style={{ backgroundImage: "url('${imageUrl}')" }}`;

    console.log(value);
    return value;
  }
  const imageUrl = "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
  

  async function getUnsplashImageUrl(weather) {
    const unsplashApiKey = 'RLCYII65wh9EUmogmZ0Ux1Lzqn4BxtRMeAgz5V7rgCw';
    const query = encodeURIComponent(weather.details);
    // console.log(weather.details)
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}`;
  
    const response = await axios.get(url);
    const photo = response.data;
    return photo.urls.full;
  }

  return (
    <div className="bg-image" style={{
      backgroundImage: `url(${imageUrl})`
      // backgroundImage: `url(${externalImage})`,
      
    }}>
      <div className={`lg-auto mx-auto max-w-screen-md mt-4 mb-4 py-5 px-32 rounded-3xl bg-black bg-opacity-25 bg-gradient-to-br backdrop-filter backdrop-blur-lg h-fit shadow-inner shadow-gray-100`}>
        <TopButtons setQuery={setQuery}/>
        <InputSection setQuery={setQuery} units ={units} setUnits={setUnits}/>
        {weather && (
          <div>
            <TimeAndLocation weather={weather}/>
            <TempratureAndDetails weather={weather}/>
            <Forecast title="Hour-by-Hour Forecast" items={weather.hourly} />

            <Forecast title="daily Forecast" items={weather.daily}/>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
