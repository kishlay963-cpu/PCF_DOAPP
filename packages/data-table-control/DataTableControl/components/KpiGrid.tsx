import * as React from "react";

export interface KpiCard {
  label: string;
  value: string;
  detail: string;
  accent: "brand" | "emerald" | "amber" | "slate";
}

export interface KpiGridProps {
  cards: KpiCard[];
}

export const KpiGrid: React.FC<KpiGridProps> = ({ cards }) => (
  <section className="dt-kpis">
    {cards.map(card => (
      <article className="dt-kpi" key={card.label}>
        <div className={`dt-kpi-dot dt-kpi-dot--${card.accent}`} />
        <div>
          <p className="dt-kpi-label">{card.label}</p>
          <p className="dt-kpi-value">{card.value}</p>
          <p className="dt-kpi-detail">{card.detail}</p>
        </div>
      </article>
    ))}
  </section>
);
