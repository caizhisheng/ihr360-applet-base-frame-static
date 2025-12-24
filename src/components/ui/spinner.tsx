import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  spinning?: boolean
  tip?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", spinning = true, tip, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4 border-2",
      md: "h-8 w-8 border-3",
      lg: "h-12 w-12 border-4"
    }

    if (!spinning) return <>{children}</>

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "animate-spin rounded-full border-primary border-t-transparent",
              sizeClasses[size]
            )}
          />
          {tip && <div className="text-sm text-muted-foreground">{tip}</div>}
        </div>
        {children && <div className="opacity-50">{children}</div>}
      </div>
    )
  }
)

Spinner.displayName = "Spinner"

export { Spinner }
