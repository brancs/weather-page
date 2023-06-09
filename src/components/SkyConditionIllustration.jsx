/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function SkyConditionIllustration({weatherCode, isDay=true, customStyle=""}) {
  const baseImgPath = `/images/skyConditions/`;

  const skyConditions = [
    {id:0, path: `${baseImgPath}${!isDay ? "night/" : ""}clear-sky.svg`},
    {id:1, path: `${baseImgPath}${!isDay ? "night/" : ""}mainly-clear.svg`},
    {id:2, path: `${baseImgPath}${!isDay ? "night/" : ""}partly-cloudy.svg`},
    {id:3, path: `${baseImgPath}overcast.svg`},
    {id:45, path: `${baseImgPath}${!isDay ? "night/" : ""}fog.svg`},
    {id:48, path: `${baseImgPath}${!isDay ? "night/" : ""}fog.svg`},
    {id:51, path: `${baseImgPath}drizzle.svg`},
    {id:53, path: `${baseImgPath}drizzle.svg`},
    {id:55, path: `${baseImgPath}drizzle.svg`},
    {id:56, path: `${baseImgPath}drizzle.svg`},
    {id:57, path: `${baseImgPath}drizzle.svg`},
    {id:61, path: `${baseImgPath}rain.svg`},
    {id:63, path: `${baseImgPath}rain.svg`},
    {id:65, path: `${baseImgPath}rain.svg`},
    {id:66, path: `${baseImgPath}rain.svg`},
    {id:67, path: `${baseImgPath}rain.svg`},
    {id:71, path: `${baseImgPath}snow.svg`},
    {id:73, path: `${baseImgPath}snow.svg`},
    {id:75, path: `${baseImgPath}snow.svg`},
    {id:77, path: `${baseImgPath}snow.svg`},
    {id:80, path: `${baseImgPath}rain-showers.svg`},
    {id:81, path: `${baseImgPath}rain-showers.svg`},
    {id:82, path: `${baseImgPath}rain-showers.svg`},
    {id:85, path: `${baseImgPath}snow-showers.svg`},
    {id:86, path: `${baseImgPath}snow-showers.svg`},
    {id:95, path: `${baseImgPath}thunderstorm.svg`},
    {id:96, path: `${baseImgPath}thunderstorm.svg`},
    {id:99, path: `${baseImgPath}thunderstorm.svg`},
  ];

  const result = skyConditions.filter(({id}) => id === weatherCode);

  if(!result[0].path) return null;

  if(customStyle.length > 0) {
    return (
      <img className={customStyle}
        src={result[0].path} 
        alt={result[0].path} 
      />
    );
  }

  return (
    <img 
      src={result[0].path} 
      alt={result[0].path} 
      className="absolute top-0 left-0 translate-x-[-30%] translate-y-[-35%]" 
    />
  )
}
