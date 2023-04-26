import { useAirQualityApi } from "@/hooks/useAirQuality";
import currentTimeIndex from "@/utils/currentTimeIndex";
import { europeanAQIDescription } from "@/utils/europeanAQIDescription";
import { useEffect, useState } from "react";

export function useCurrentAirQuality() {
  const {
    getCurrentAirQualityInfo,
  } = useAirQualityApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    async function fetchApiData() {
      setLoading(true);

      try {
        const currentHourIndex = currentTimeIndex();
        const { hourly, hourly_units:hourlyUnits } = await getCurrentAirQualityInfo();
        const {
          pm10:pm10List,
          pm2_5:pm25List,
          carbon_monoxide:carbonMonoxideList,
          nitrogen_dioxide:nitrogenDioxideList,
          sulphur_dioxide:sulphurDioxideList,
          ozone:ozoneList,
          european_aqi:europeanAQIList,
        } = hourly;
        const {
          pm10:pm10Unit,
          pm2_5:pm25Unit,
          carbon_monoxide:carbonMonoxideUnit,
          nitrogen_dioxide:nitrogenDioxideUnit,
          sulphur_dioxide:sulphurDioxideUnit,
          ozone:ozoneUnit,
        } = hourlyUnits;

        const pm10 = Math.trunc(pm10List[currentHourIndex]);
        const pm25 = Math.trunc(pm25List[currentHourIndex]);
        const carbonMonoxide = Math.trunc(carbonMonoxideList[currentHourIndex]);
        const nitrogenDioxide = Math.trunc(nitrogenDioxideList[currentHourIndex]);
        const sulphurDioxide = Math.trunc(sulphurDioxideList[currentHourIndex]);
        const ozone = Math.trunc(ozoneList[currentHourIndex]);
        const europeanAQI = europeanAQIList[currentHourIndex];

        const currentAirQualityData = {
          europeanAQI: {
            value: europeanAQI,
            description: europeanAQIDescription(europeanAQI)
          },
          infos:[
            {
              value: pm10,
              description: "pm10",
              unit: pm10Unit
            },
            {
              value: pm25,
              description: "pm2.5",
              unit: pm25Unit
            },
            {
              value: sulphurDioxide,
              description: "SO",
              descriptionMini: "2",
              unit: sulphurDioxideUnit
            },
            {
              value: nitrogenDioxide,
              description: "NO",
              descriptionMini: "2",
              unit: nitrogenDioxideUnit
            },
            {
              value: ozone,
              description: "O",
              descriptionMini: "3",
              unit: ozoneUnit
            },
            {
              value: carbonMonoxide,
              description: "CO",
              unit: carbonMonoxideUnit
            },
          ]
        };

        setData(currentAirQualityData);
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
