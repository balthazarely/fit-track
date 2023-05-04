"use client";

interface WrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: WrapperProps) {
  return <div className="border-2 border-red-500 max-w-5xl">{children}</div>;
}
