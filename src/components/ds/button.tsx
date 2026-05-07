import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type DSButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "success" | "warning";
type DSButtonSize = "sm" | "md" | "lg" | "icon";

interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DSButtonVariant;
  size?: DSButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantMap: Record<DSButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90",
};

const sizeMap: Record<DSButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, DSButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "DSButton";
