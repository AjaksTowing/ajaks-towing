import { cn } from "@/cn";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={cn("mx-auto mt-16 max-w-[106rem] px-4 md:mt-36", className)}
      {...restProps}
    >
      {children}
    </Comp>
  );
}
