"use client";

interface LoaderProps {
  className?: string;
  size?: string;
}

export function Loader({ className, size = "sm" }: LoaderProps) {
  return (
    <div className={`flex  flex-grow items-center justify-center ${className}`}>
      <div
        className={`
        ${size === "sm" && "h-6 w-6 border-4 "} 
        ${size === "md" && "h-10 w-10 border-4 "}
        ${size === "lg" && "h-16 w-16 border-8 "}
          animate-spin rounded-full  border-primary border-solid border-t-transparent`}
      ></div>
    </div>
  );
}
