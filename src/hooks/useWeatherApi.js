import useGeolocation from "./useGeolocation";

export default function useWeatherApi() {
  const {latitude, longitude} = useGeolocation();
  const baseUrl = "https://api.open-meteo.com/v1/forecast?";
  const userLatitude = latitude;
  const userLongitude = longitude;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function makeUserUrl(parameters) {
    return `${baseUrl}latitude=${userLatitude}&longitude=${userLongitude}${parameters}&forecast_days=1&timezone=${userTimezone}`
  }

  async function getCurrentWeatherInfo() {
    const url = makeUserUrl("&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,windspeed_10m,precipitation_probability,relativehumidity_2m,weathercode,is_day");
    try {
      const rawResponse = await fetch(url);
      const response = await rawResponse.json();

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getCurrentWeatherInfo
  };
};