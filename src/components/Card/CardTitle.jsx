import { Icon } from "@iconify/react"

export function CardTitle({icon, children}) {

  if(icon) {
    return (
      <span className="flex items-center gap-1 font-bold text-violet-300">
        <Icon icon={icon} className="inline-block text-2xl" />
        {children}
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 font-bold text-violet-300">
      {children}
    </span>
  )
}
