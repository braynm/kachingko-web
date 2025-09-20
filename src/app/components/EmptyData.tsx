import { BanknoteX } from "lucide-react"

type EmptyDataProps = {
  title: string,
  description?: string,
  actionButton?: React.ReactNode,
  emptyIcon?: React.ComponentType<{ className?: string }>
}

export function EmptyData(props: EmptyDataProps) {
  const { title, description, actionButton, emptyIcon: EmptyIcon } = props
  // return <div className={'flex flex-col items-center justify-center py-16 px-4 text-center'}>
  return <div className={'flex flex-col items-center justify-center text-center'}>
    {/* Large Icon */}
    <div className="mb-6 rounded-full bg-muted p-6">
      {EmptyIcon && <EmptyIcon className="h-16 w-16 text-muted-foreground" />}
      {!EmptyIcon && <BanknoteX className="h-16 w-16 text-muted-foreground" />}
    </div>

    {/* Title */}
    <h3 className="mb-2 text-xl font-semibold text-foreground">
      {title}
    </h3>

    {/* Description */}
    {description && <p className="mb-6 w-sm text-sm text-muted-foreground leading-relaxed">
      {description}
    </p>}

    {/* Optional Action Button */}
    {actionButton && (
      <div className="mt-2">
        {actionButton}
      </div>
    )}
  </div>
}
