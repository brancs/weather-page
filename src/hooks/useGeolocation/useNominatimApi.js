import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";

export function useNominatimApi() {
  const {latitude, longitude} = useGeolocation();
  const [city, setCity] = useState(""); 
  const [state, setState] = useState(""); 
  
  useEffect(() => {
    async function fetchNominatimApi() {
      try {
        const rawResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const response = await rawResponse.json();
        const { address } = response;
        const { city, state } = address;

        setCity(city);
        setState(state);
      } catch (error) {
        throw error;
      }
    }

    fetchNominatimApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    city,
    state,
  };
}
