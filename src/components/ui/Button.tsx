"use client";

import Link from "next/link";
import { trackEvent, type TrackingEventName } from "@/src/lib/tracking";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  track?: {
    event: TrackingEventName;
    payload: Record<string, unknown>;
  };
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  target,
  rel,
  type = "button",
  onClick,
  track,
}: ButtonProps) {
  const composedClassName = `btn btn--${variant} ${className}`.trim();

  const handleClick = () => {
    if (track) {
      trackEvent(track.event, track.payload);
    }
    onClick?.();
  };

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          className={composedClassName}
          href={href}
          target={target}
          rel={rel ?? "noopener noreferrer"}
          onClick={handleClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={composedClassName} href={href} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={composedClassName} onClick={handleClick}>
      {children}
    </button>
  );
}
