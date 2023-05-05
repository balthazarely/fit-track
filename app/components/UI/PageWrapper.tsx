"use client";

interface WrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: WrapperProps) {
  return <div className="mx-auto px-4 max-w-5xl">{children}</div>;
}
