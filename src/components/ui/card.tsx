import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type CardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>;

export function Card({ title, description, className, children }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-orange-300 p-5 shadow-[0_22px_40px_-30px_rgba(74,79,87,0.24)] transition duration-300",
        className,
      )}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
