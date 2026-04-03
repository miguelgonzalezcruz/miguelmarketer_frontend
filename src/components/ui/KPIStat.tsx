import React from "react";

interface KPIStatProps {
  value: string;
  label: string;
  note?: string;
  className?: string;
}

export function KPIStat({ value, label, note, className = "" }: KPIStatProps) {
  return (
    <article className={`kpi-stat ${className}`.trim()}>
      <p className="kpi-stat__value">{value}</p>
      <p className="kpi-stat__label">{label}</p>
      {note ? <p className="kpi-stat__note">{note}</p> : null}
    </article>
  );
}
