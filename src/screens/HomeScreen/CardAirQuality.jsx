import { Card, CardTitle } from "@/components/Card";
import { useCurrentAirQuality } from "@/hooks/useAirQuality/useCurrentAirQuality";

function CardAirQuality() {
  const { data, loading, error } = useCurrentAirQuality();

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
        <Card className="col-span-full xl:col-span-1">
          <p className="uppercase text-white">{error.message}</p>
        </Card>
      </div>
    );
  }

  if (data) {
    return (
      <div className="col-span-full xl:col-span-1">
        <Card padding="p-8 pb-4">
          <div className="flex flex-col items-center h-full">
            <div className="grow">
              <CardTitle icon="ph:leaf-fill">Qualidade do ar</CardTitle>
            </div>
            <div className="grow text-center py-8">
              <p className="mb-1 font-bold text-lg leading-none text-emerald-300">
                {data.europeanAQI.description}
              </p>
              <p className="font-bold text-5xl leading-none text-violet-100">
                {data.europeanAQI.value}
              </p>
            </div>
            <div className="w-full justify-self-end flex justify-between gap-4 text-violet-300">
              {data.infos.map(({ value, description, descriptionMini }) => {
                return (
                  <div key={description} className="text-center">
                    <p>
                      <span className="font-bold text-emerald-300">
                        {value}
                      </span>
                    </p>
                    <p className="uppercase">
                      <span>{description}</span>
                      {descriptionMini && <span>{descriptionMini}</span>}
                    </p>
                  </div>
                );
              })}
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

export default CardAirQuality;
