import axios from "axios";
import { useEffect, useState } from "react";
import weatherCodes from "../assets/weathercode.json";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchWeater = async () => {
      try {
        const res = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=37.5&longitude=127&current_weather=true",
        );
        const { temperature, weathercode, is_day } = res.data.current_weather;
        setWeather({
          temp: temperature,
          weatherInfo: weatherCodes[weathercode]?.[is_day ? "day" : "night"],
        });
      } catch (error) {
        console.error("로딩실패", error);
        setError("날씨 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeater();
  }, []);
  return (
    <div className="flex flex-col items-center gap-2 text-4xl">
      {isLoading ? (
        <p>불러오는 중…</p>
      ) : error ? (
        <p>{error}</p>
      ) : weather?.temp != null && weather.weatherInfo ? (
        <>
          <img
            src={weather.weatherInfo.image}
            alt={weather.weatherInfo.description}
            className=" h-30"
          />
          <p>서울</p>
          <p>{weather.weatherInfo.description}</p>
          <p className=" font-bold">{weather.temp}°C</p>
        </>
      ) : (
        <p>불러올 수 없음</p>
      )}
    </div>
  );
};

export default Weather;
