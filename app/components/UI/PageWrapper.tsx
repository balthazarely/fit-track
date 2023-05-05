"use client";

interface WrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: WrapperProps) {
  return <div className=" max-w-5xl">{children}</div>;
}
