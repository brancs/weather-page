// @ts-nocheck
import 'chartjs-adapter-date-fns';
import { ptBR } from 'date-fns/locale';
import {Card, CardTitle} from "@/components/Card";
import { makeDateHourOnlyList } from "@/utils/currentTimeIndex";
import { toCustomString } from "@/utils/fDate";
import {
  Chart as ChartJS,
  registerables,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

function CardSunLight({data, loading, error}) {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const currentDate = new Date();
  currentDate.setMinutes(0); 
  const currentDateZero = toCustomString(currentDate);

  useEffect(() => {
    if(data) {
      const dateHourOnlyList = makeDateHourOnlyList();
      const uvIndexClearSkyList = data.uvIndexClearSky;
      const tempList = dateHourOnlyList.map((hour, index) => {
        return {
          time: hour,
          uvIndex: uvIndexClearSkyList[index]
        };
      });

      const labels = tempList.map(({time}) => time);
      const dataChart = {
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
      };

      const zeroSunrise = new Date(data.sunrise);
      const zeroSunset = new Date(data.sunset);

      zeroSunrise.setMinutes(0);
      zeroSunset.setHours(zeroSunset.getHours() + 1);
      zeroSunset.setMinutes(0);

      const chartOptions = {
        responsive:true,
        scales: {
          x: {
            min: toCustomString(zeroSunrise),
            max: toCustomString(zeroSunset),
            border: {
              display: false,
            },
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              color: "#DAD8F7",
              font: {
                family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                size: 12,
                weight: "bold"
              },
              callback: (text, index, values) => {
                const today = new Date();
                today.setHours(text);
                today.setMinutes(0);

                if (index === 0 || index === (values.length - 1)) {
                  return `${today.toLocaleTimeString("pt-br", {hour: "2-digit", minute: "2-digit"})}`;
                }
              },
            },
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        }
      };

      setChartData(dataChart);
      setChartOptions(chartOptions);
    }
  }, [data, currentDateZero])

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

  if(data && chartData && chartOptions) {
    return (
      <Card padding="p-4 pt-8">
        <div className="flex flex-col items-center h-full">
          <div className="grow">
            <CardTitle icon="ph:sun-fill">Horário do sol</CardTitle>
          </div>
          <div className="flex gap-4">
          </div>
          <div className="grow w-full text-center py-8 px-12 lg:px-4">
            <div>
              <Line 
                data={chartData} 
                options={chartOptions}
              />
            </div>
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      No data
    </Card>
  );
}

export default CardSunLight;