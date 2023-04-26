import CardTodayWeather from './CardTodayWeather';
import CardAirQuality from './CardAirQuality';
import CardSunLight from './CardSunLight';
import CardUpcomingDays from './CardUpcomingDays';
import { useCurrentForecast } from '@/hooks/useForecast';

export default function HomeScreen() {
  const {data, loading, error} = useCurrentForecast();

  return (
    <>
      <div className="w-full col-span-full md:col-span-4 2xl:col-span-5">
        <CardTodayWeather data={data}  loading={loading}  error={error} />
      </div>
      <div className="w-full col-span-full md:col-span-7 2xl:col-span-6 grid grid-cols-2 gap-8">
        <CardAirQuality />
        <CardSunLight data={data}  loading={loading}  error={error} />
        <CardUpcomingDays />
      </div>
    </>
  )
}
