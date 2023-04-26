import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import SkyConditionIllustration from "@/components/SkyConditionIllustration";
import { useUpcomingForecast } from "@/hooks/useForecast";

export default function CardUpcomingDays() {
  const [forecastData, setForecastData] = useState(null);
  const [mobileList, setMobileList] = useState(null);
  const { data, loading, error } = useUpcomingForecast();

  useEffect(() => {
    if (data) {
      const forecastList = data.dailyForecastList;
      const mobileList = [...forecastList];
      setForecastData(forecastList);
      mobileList.splice(3, 3);
      setMobileList(mobileList);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="col-span-full">
        <Card cloudBg={true}>
          <p className="uppercase text-white">Loading</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full">
        <Card cloudBg={true}>
          <p className="uppercase text-white">{error.message}</p>
        </Card>
      </div>
    );
  }

  if (forecastData) {
    return (
      <div className="col-span-full">
        <Card height="h-full" padding="p-8">
          <div className="h-full justify-evenly items-center gap-4 text-violet-300 hidden lg:flex">
            {forecastData.map((weatherData) => (
              <WeatherItem
                key={weatherData.weekDay}
                weatherData={weatherData}
              />
            ))}
          </div>
          <div className="h-full justify-evenly items-center gap-4 text-violet-300 flex lg:hidden">
            {mobileList.map((weatherData) => (
              <WeatherItem
                key={weatherData.weekDay}
                weatherData={weatherData}
              />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <Card cloudBg={true}>No data</Card>
    </div>
  );
}

function WeatherItem({ weatherData }) {
  const { weatherCode, weekDay, temperatureMin, temperatureMax } = weatherData;
  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="font-bold text-sm capitalize">{weekDay}</p>
      <div className="h-16 flex justify-center">
        <SkyConditionIllustration
          weatherCode={weatherCode}
          customStyle={"w-16 h-16"}
        />
      </div>
      <p className="uppercase flex justify-center gap-1 font-bold text-base">
        <span className="text-white">{temperatureMax}°</span>
        <span>{temperatureMin}°</span>
      </p>
    </div>
  );
}
