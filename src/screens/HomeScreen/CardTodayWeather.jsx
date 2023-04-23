/* eslint-disable @next/next/no-img-element */
import Card from "@/components/Card";
import CardMini from "@/components/CardMini";
import SkyConditionIllustration from "@/components/SkyConditionIllustration";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import useNominatimApi from "@/hooks/useNominatimApi";
import { Icon } from "@iconify/react";

function CardTodayWeather() {
  const {data, loading, error} = useCurrentWeather();
  const {city, state} = useNominatimApi();

  if(loading) {
    return (
      <Card cloudBg={true}>
        <p className='uppercase text-white'>Loading</p>
      </Card>
    );
  }

  if(error) {
    return (
      <Card cloudBg={true}>
        <p className='uppercase text-white'>{error.message}</p>
      </Card>
    );
  }
  
  if(data) {
    return (
      <Card cloudBg={true} padding="p-3">
        <SkyConditionIllustration weatherCode={data.weatherCode} isDay={data.isDay} />
        <div className="h-full grid">
          <div className="justify-self-end place-self-top">
            <span className="flex items-center gap-1 text-sm font-bold text-violet-300 pt-5 pe-5">
              <Icon icon={"ph:map-pin-fill"} className="inline-block text-white text-opacity-40 text-xl" />
              {city}, {state}
            </span>
          </div>
          <div className="justify-self-center place-self-center">
            <span className="text-[88px] leading-[88px] font-bold relative">
              {data.temperature.current}
              <span className="text-2xl leading-[88px] absolute top-0">°C</span>
            </span>
            <div className="flex justify-center gap-2 mt-4">
              <p className="text-xl leading-none font-bold text-violet-300">{data.temperature.min}°</p>
              <p className="text-xl leading-none font-bold">{data.temperature.max}°</p>
            </div>
          </div>
          <div className="place-self-end w-full flex gap-2 justify-between">
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

  return (
    <Card cloudBg={true}>
      No data
    </Card>
  );
}

export default CardTodayWeather;