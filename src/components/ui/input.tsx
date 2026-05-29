import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "h-12 w-full rounded-lg border border-border bg-surface px-4 text-body text-foreground placeholder:text-foreground-subtle",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "focus:border-terracotta focus:outline-none focus:[box-shadow:var(--shadow-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "invalid:border-error",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-small font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-small text-error">{error}</p>
      ) : hint ? (
        <p className="text-small text-foreground-muted">{hint}</p>
      ) : null}
    </div>
  );
}
