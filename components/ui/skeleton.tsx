import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("skeleton rounded-md", className)}
      {...props}
    />
  );
}

// Specific skeleton components for common patterns
function SkeletonText({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
}

function SkeletonTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("h-8 w-3/4", className)} {...props} />;
}

function SkeletonAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("h-12 w-12 rounded-full", className)} {...props} />;
}

function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <SkeletonTitle />
        <SkeletonText />
        <SkeletonText className="w-2/3" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonTitle, SkeletonAvatar, SkeletonCard };
