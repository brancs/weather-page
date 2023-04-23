import CardTodayWeather from './CardTodayWeather';
import CardAirQuality from './CardAirQuality';
import CardSunLight from './CardSunLight';
import CardSixDays from './CardSixDays';

export default function HomeScreen() {
  return (
    <>
      <div className="w-full col-span-full lg:col-span-5">
        <CardTodayWeather />
      </div>
      <div className="w-full col-span-full lg:col-span-6 grid gap-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <CardAirQuality />
          <CardSunLight />
        </div>
        <CardSixDays />
      </div>
    </>
  )
}
