import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [latitude, setLatitude] = useState("-23.54");
  const [longitude, setLongitude] = useState("-46.78"); 

  function successFunction(position) {
      const latitude = position.coords.latitude.toFixed(2);
      const longitude = position.coords.longitude.toFixed(2);

      setLatitude(latitude);
      setLongitude(longitude);
  }

  function errorFunction(){
      alert("Geocoder failed");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }, []);

  return {
    latitude,
    longitude
  };
}