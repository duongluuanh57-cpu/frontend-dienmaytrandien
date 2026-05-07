import { cn } from "@/lib/utils";
import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "p" | "small" | "large" | "lead" | "muted";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-black tracking-tighter lg:text-5xl uppercase",
  h2: "scroll-m-20 text-3xl font-black tracking-tight first:mt-0 uppercase",
  h3: "scroll-m-20 text-2xl font-black tracking-tight uppercase",
  h4: "scroll-m-20 text-xl font-bold tracking-tight uppercase",
  p: "leading-relaxed [&:not(:first-child)]:mt-6",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
  lead: "text-xl text-muted-foreground font-medium",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, children, ...props }, ref) => {
    const Component = as || (variant.startsWith("h") ? (variant as React.ElementType) : "p");

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
