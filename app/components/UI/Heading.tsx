"use client";
interface HeadingProps {
  heading: string;
  subheading?: string;
  className?: string;
}

export default function Heading({
  heading,
  subheading,
  className,
}: HeadingProps) {
  return (
    <div className={className}>
      <div className="text-3xl font-bold">{heading}</div>
      <div className="text-md">{subheading}</div>
    </div>
  );
}
