import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 md:px-[50px]",
          !fluid && "container",
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: "default" | "muted" | "primary" | "slate";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, bg = "default", ...props }, ref) => {
    const bgStyles = {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      slate: "bg-slate-50/50",
    };

    return (
      <section
        ref={ref}
        className={cn("py-16 md:py-24", bgStyles[bg], className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
