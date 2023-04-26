import { makeDateHourOnlyList } from '@/utils/currentTimeIndex';
import { toCustomString } from '@/utils/fDate';
import { useEffect, useState } from 'react';

export default function useSunlightChart() {
  const [sunlightChartData, setSunlightChartData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    if (sunlightChartData) {
      const currentDate = new Date();
      currentDate.setMinutes(0); 
      const currentDateZero = toCustomString(currentDate);
      const dateHourOnlyList = makeDateHourOnlyList();
      const uvIndexClearSkyList = sunlightChartData.uvIndexClearSky;
      const tempList = dateHourOnlyList.map((hour, index) => {
        return {
          time: hour,
          uvIndex: uvIndexClearSkyList[index]
        };
      });
      const labels = tempList.map(({time}) => time);
      const zeroSunrise = new Date(sunlightChartData.sunrise);
      const zeroSunset = new Date(sunlightChartData.sunset);

      zeroSunrise.setMinutes(0);
      zeroSunset.setHours(zeroSunset.getHours() + 1);
      zeroSunset.setMinutes(0);

      if(currentDate > zeroSunset) setShowChart(false);

      setChartData({
        labels: labels,
        datasets: [{
          label: 'UV Index',
          data: tempList.map(({uvIndex}) => uvIndex),
          pointBackgroundColor: tempList.map(({time}) => time === currentDateZero ? "#F6C833" : "transparent"),
          pointBorderColor: tempList.map(({time}) => time === currentDateZero ? "#F6C833" : "transparent"),
          pointBorderWidth: 10,
          pointHoverBorderWidth: 10,
          fill: true,
          borderColor: '#DAD8F7',
          borderJoinStyle: "round",
          tension: 0.4
        }]
      });
      setChartOptions({
        responsive: true,
        scales: {
          x: {
            min: toCustomString(zeroSunrise),
            max: toCustomString(zeroSunset),
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              color: "#DAD8F7",
              font: {
                family: "Lato, sans-serif",
                size: 12,
                weight: "bold",
              },
              callback: (text, index, values) => {
                const today = new Date();
                today.setHours(text);
                today.setMinutes(0);

                if (index === 0 || index === values.length - 1) {
                  return `${today.toLocaleTimeString("pt-br", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`;
                }
              },
            },
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      });
    }
  }, [sunlightChartData]);

  return {
    setSunlightChartData,
    chartOptions,
    chartData,
    showChart
  }
}
