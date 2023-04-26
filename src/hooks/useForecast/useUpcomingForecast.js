import { useForecastApi } from "@/hooks/useForecast";
import { useEffect, useState } from "react";

export function useUpcomingForecast() {
  const {
    getUpcomingWeatherInfo,
  } = useForecastApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    async function fetchApiData() {
      setLoading(true);

      try {
        const {
          daily,
        } = await getUpcomingWeatherInfo();
        const {
          temperature_2m_min:temperatureMinList,
          temperature_2m_max:temperatureMaxList,
          weathercode: weatherCodeList,
          time
        } = daily;

        const dailyForecastList = weatherCodeList.map((code, index) => {
          return {
            weatherCode: code,
            weekDay: index === 1 ? "Amanhã" : new Date(`${time[index]}T00:00`).toLocaleDateString("pt-br", {weekday: "long"}),
            temperatureMin: Math.trunc(temperatureMinList[index]),
            temperatureMax: Math.trunc(temperatureMaxList[index])
          }
        });

        dailyForecastList.shift();

        const upcomingForecastData = {
          dailyForecastList
        };

        setData(upcomingForecastData);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchApiData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
  };
}
