"use client";

export default function Heading({ heading, subheading, className }: any) {
  return (
    <div className={className}>
      <div className="text-3xl font-bold">{heading}</div>
      <div className="text-md">{subheading}</div>
    </div>
  );
}
