import { useGeolocation } from "@/hooks/useGeolocation";

export function useForecastApi() {
  const {latitude, longitude} = useGeolocation();
  const baseUrl = "https://api.open-meteo.com/v1/forecast?";
  const userLatitude = latitude;
  const userLongitude = longitude;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function makeUserUrl(parameters, forecast1Day=true) {
    const forecastParameter = forecast1Day ? `&forecast_days=1` : "";
    return `${baseUrl}latitude=${userLatitude}&longitude=${userLongitude}${parameters}${forecastParameter}&timezone=${userTimezone}`
  }

  async function getCurrentWeatherInfo() {
    const url = makeUserUrl("&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,windspeed_10m,precipitation_probability,relativehumidity_2m,weathercode,is_day,uv_index_clear_sky");
    try {
      const rawResponse = await fetch(url);
      const response = await rawResponse.json();

      return response;
    } catch (error) {
      throw error;
    }
  };

  async function getUpcomingWeatherInfo() {
    const url = makeUserUrl("&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode", false);
    try {
      const rawResponse = await fetch(url);
      const response = await rawResponse.json();

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getCurrentWeatherInfo,
    getUpcomingWeatherInfo
  };
};