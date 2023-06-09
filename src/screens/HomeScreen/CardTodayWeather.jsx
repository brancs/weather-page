/* eslint-disable @next/next/no-img-element */
import { Card, CardMini } from "@/components/Card";
import SkyConditionIllustration from "@/components/SkyConditionIllustration";
import { useNominatimApi } from "@/hooks/useGeolocation";
import { Icon } from "@iconify/react";

function CardTodayWeather({ data, loading, error }) {
  const { city, state } = useNominatimApi();

  if (loading) {
    return (
      <Card cloudBg={true}>
        <p className="uppercase text-white">Loading</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card cloudBg={true}>
        <p className="uppercase text-white">{error.message}</p>
      </Card>
    );
  }

  if (data) {
    return (
      <Card cloudBg={true} padding="p-3">
        <SkyConditionIllustration
          weatherCode={data.weatherCode}
          isDay={data.isDay}
        />
        <div className="h-full grid gap-8">
          <div className="justify-self-end place-self-top">
            <span className="flex items-center gap-1 text-sm font-bold text-violet-300 pt-5 pe-5">
              <Icon
                icon={"ph:map-pin-fill"}
                className="inline-block text-white text-opacity-40 text-xl"
              />
              {city}, {state}
            </span>
          </div>
          <div className="justify-self-center place-self-center">
            <p className="h-[100px] text-[88px] leading-[88px] font-bold relative mb-0 lg:mb-3">
              {data.temperature.current}
              <span className="text-2xl leading-[88px] text-violet-300 absolute top-[-16px]">
                °C
              </span>
            </p>
            <div className="flex justify-center gap-2">
              <p className="text-xl leading-none font-bold">
                {data.temperature.max}°
              </p>
              <p className="text-xl leading-none font-bold text-violet-300">
                {data.temperature.min}°
              </p>
            </div>
          </div>
          <div className="place-self-end w-full flex flex-col lg:flex-row gap-2 justify-between">
            <CardMini
              iconId={"ph:wind-fill"}
              title={"Vento"}
              value={data.windSpeed}
              unitMeasurement={"Km/h"}
            />
            <CardMini
              iconId={"ph:drop-fill"}
              title={"Umidade"}
              value={data.relativeHumidity}
              unitMeasurement={"%"}
            />
            <CardMini
              iconId={"ph:cloud-rain-fill"}
              title={"Chuva"}
              value={data.precipitationProbability}
              unitMeasurement={"%"}
            />
          </div>
        </div>
      </Card>
    );
  }

  return <Card cloudBg={true}>No data</Card>;
}

export default CardTodayWeather;
