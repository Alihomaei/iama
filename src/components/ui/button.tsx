import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary",
  outline:
    "border border-primary text-primary hover:bg-primary-50 focus-visible:ring-primary",
  ghost:
    "text-foreground hover:bg-primary-50 focus-visible:ring-primary",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-5 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type ButtonProps = ButtonBaseProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: false; href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { asChild: true; href: string })
  );

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      variants[variant],
      sizes[size],
      className
    );

    if ("asChild" in props && props.asChild) {
      const { asChild, ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement> & { asChild: true };
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorProps}
        />
      );
    }

    const { asChild, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: false };
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, variants as buttonVariants };
