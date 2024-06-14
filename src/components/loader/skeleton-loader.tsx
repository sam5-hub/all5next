import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-128 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
