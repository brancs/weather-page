import CardTodayWeather from './CardTodayWeather';
import CardAirQuality from './CardAirQuality';
import CardSunLight from './CardSunLight';
import CardSixDays from './CardSixDays';
import { useCurrentWeather } from '@/hooks/useWeather';

export default function HomeScreen() {
  const {data, loading, error} = useCurrentWeather();

  return (
    <>
      <div className="w-full col-span-full lg:col-span-5">
        <CardTodayWeather data={data}  loading={loading}  error={error} />
      </div>
      <div className="w-full col-span-full lg:col-span-6 grid gap-8">
        <div className="flex flex-col 2xl:flex-row gap-8">
          <CardAirQuality />
          <CardSunLight data={data}  loading={loading}  error={error} />
        </div>
        <CardSixDays />
      </div>
    </>
  )
}
