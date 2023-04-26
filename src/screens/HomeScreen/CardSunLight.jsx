// @ts-nocheck
import { Card, CardTitle } from "@/components/Card";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import useSunlightChart from "@/hooks/useSunlightChart";
import { Icon } from "@iconify/react";

ChartJS.register(...registerables);

function CardSunLight({ data, loading, error }) {
  const { chartOptions, chartData, setSunlightChartData, showChart } =
    useSunlightChart();

  useEffect(() => {
    if (data) setSunlightChartData(data);
  }, [data, setSunlightChartData]);

  if (!showChart) {
    return (
      <div className="col-span-full xl:col-span-1">
        <Card>
          <div className="h-full grid place-content-center">
            <p className="flex items-center gap-1 text-4xl font-bold">
              <Icon icon={"ph:cloud-moon-fill"} className="inline-block text-4xl text-violet-300" />
              <span>Boa noite</span>
            </p>
          </div>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="col-span-full xl:col-span-1">
        <Card>
          <p className="uppercase text-white">Loading</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full xl:col-span-1">
        <Card>
          <p className="uppercase text-white">{error.message}</p>
        </Card>
      </div>
    );
  }

  if (data && chartData && chartOptions) {
    return (
      <div className="col-span-full xl:col-span-1">
        <Card height="h-full max-h-96 md:max-h-none" padding="p-4 pt-8">
          <div className="flex flex-col items-center h-full">
            <div className="grow">
              <CardTitle icon="ph:sun-fill">Horário do sol</CardTitle>
            </div>
            <div className="grow text-center py-8 px-12 lg:px-4">
              <div>
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="flex gap-4"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-span-full xl:col-span-1">
      <Card>No data</Card>
    </div>
  );
}

export default CardSunLight;
