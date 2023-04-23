import { useGeolocation } from "../useGeolocation";

export function useAirQualityApi() {
  const {latitude, longitude} = useGeolocation();
  const baseUrl = "https://air-quality-api.open-meteo.com/v1/air-quality?";
  const userLatitude = latitude;
  const userLongitude = longitude;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function makeUserUrl(parameters) {
    return `${baseUrl}latitude=${userLatitude}&longitude=${userLongitude}${parameters}&domains=cams_global&timezone=${userTimezone}`
  }

  async function getCurrentAirQualityInfo() {
    const url = makeUserUrl("&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi");
    try {
      const rawResponse = await fetch(url);
      const response = await rawResponse.json();

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getCurrentAirQualityInfo
  };
};