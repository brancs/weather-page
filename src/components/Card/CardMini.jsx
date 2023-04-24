import { Icon } from "@iconify/react";
import { Card } from "@/components/Card";

export function CardMini({iconId, title, value, unitMeasurement}) {
  return (
    <Card padding={"py-3 px-4"}>
      <div className="flex flex-col xl:flex-row xl:items-center gap-3">
        <Icon icon={iconId} className="text-white text-opacity-40 text-[32px]" />
        <div>
          <p className="text-xs text-white text-opacity-80">{title}</p>
          <p>
            <span className="text-lg font-bold text-white text-opacity-80">{value}</span>{" "}
            <span className="text-sm font-bold text-violet-200">{unitMeasurement}</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
