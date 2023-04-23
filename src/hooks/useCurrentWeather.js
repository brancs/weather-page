import useWeatherApi from "@/hooks/useWeatherApi";
import { toCustomString } from "@/utils/fDate";
import { useEffect, useState } from "react";

export default function useCurrentWeather() {
  const {
    getCurrentWeatherInfo,
  } = useWeatherApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    async function fetchWeatherApi() {
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
        } = daily;
        const {
          temperature_2m:temperatureList,
          windspeed_10m:windSpeed10mList,
          precipitation_probability:precipitationProbabilityList,
          relativehumidity_2m:relativeHumidityList,
          weathercode:weatherCodeList,
          is_day:isDayList,
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
        };

        setData(currentWeatherData);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherApi();
  }, []);

  return {
    data,
    loading,
    error,
  };
}

function timeOnlyHour(formated = false, hour) {
  const timeNow = new Date();

  if (hour !== undefined) timeNow.setHours(hour);

  timeNow.setMinutes(0);
  timeNow.setSeconds(0);

  if (formated) return toCustomString(timeNow);

  return timeNow;
}

function makeDateHourOnlyList() {
  const hoursIndexes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  let dateHoursList = [];

  hoursIndexes.forEach((hour) => {
    dateHoursList.push(timeOnlyHour(true, hour));
  });

  return dateHoursList;
}

function currentTimeIndex() {
  const dateHourNow = timeOnlyHour(true);
  let dateHoursList = makeDateHourOnlyList();

  return dateHoursList.findIndex((dateHour) => dateHour === dateHourNow);
}
