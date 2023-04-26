import { useForecastApi } from "@/hooks/useForecast";
import currentTimeIndex from "@/utils/currentTimeIndex";
import { useEffect, useState } from "react";

export function useCurrentForecast() {
  const {
    getCurrentWeatherInfo,
  } = useForecastApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    async function fetchApiData() {
      setLoading(true);

      try {
        const currentHourIndex = currentTimeIndex();
        const {
          daily,
          hourly,
        } = await getCurrentWeatherInfo();
        const {
          temperature_2m_min:temperatureMin,
          temperature_2m_max:temperatureMax,
          sunrise,
          sunset
        } = daily;
        const {
          temperature_2m:temperatureList,
          windspeed_10m:windSpeed10mList,
          precipitation_probability:precipitationProbabilityList,
          relativehumidity_2m:relativeHumidityList,
          weathercode:weatherCodeList,
          is_day:isDayList,
          uv_index_clear_sky:uvIndexClearSky
        } = hourly;

        const temperature= Math.trunc(temperatureList[currentHourIndex]);
        const windSpeed = Math.trunc(windSpeed10mList[currentHourIndex]);
        const precipitationProbability = Math.trunc(precipitationProbabilityList[currentHourIndex]);
        const relativeHumidity = Math.trunc(relativeHumidityList[currentHourIndex]);
        const weatherCode = weatherCodeList[currentHourIndex];
        const isDay = isDayList[currentHourIndex];

        const currentWeatherData = {
          temperature: {
            current: temperature,
            min: Math.trunc(temperatureMin[0]),
            max: Math.trunc(temperatureMax[0]),
          },
          windSpeed,
          precipitationProbability,
          relativeHumidity,
          weatherCode,
          isDay: isDay === 1,
          sunrise: sunrise[0],
          sunset: sunset[0],
          uvIndexClearSky
        };

        setData(currentWeatherData);
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
