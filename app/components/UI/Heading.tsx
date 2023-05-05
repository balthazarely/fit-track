"use client";

export default function Heading({ heading, subheading }: any) {
  return (
    <div>
      <div className="text-3xl font-bold">{heading}</div>
      <div className="text-md">{subheading}</div>
    </div>
  );
}
