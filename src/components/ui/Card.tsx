import React from "react";

interface CardProps extends React.ComponentPropsWithoutRef<"article"> {
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article className={`card ${className}`.trim()} {...props}>
      {children}
    </article>
  );
}
