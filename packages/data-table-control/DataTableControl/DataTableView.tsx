import * as React from "react";

type StatusVariant = "on-track" | "at-risk" | "blocked";

interface TableRow {
  datasetName: string;
  datasetSummary: string;
  dataOwner: string;
  dataOwnerRole: string;
  dgo: string;
  doSpoc: string;
  descriptionValidation: string;
  status: StatusVariant;
  deadline: string;
}

const rows: TableRow[] = [
  {
    datasetName: "Global Equity Trades",
    datasetSummary: "Daily executed orders captured across LSEG venues.",
    dataOwner: "Priya Shah",
    dataOwnerRole: "Director, Capital Markets",
    dgo: "Capital Markets Data Office",
    doSpoc: "Jordan Blake",
    descriptionValidation: "Schema signed off on 10 Nov 2025; lineage & controls refreshed.",
    status: "on-track",
    deadline: "05 Dec 2025",
  },
  {
    datasetName: "ESG Ratings Vault",
    datasetSummary: "Consolidated ESG scoring across issuers and funds.",
    dataOwner: "Marcus Lee",
    dataOwnerRole: "Head of Sustainable Data",
    dgo: "Sustainable Finance DGO",
    doSpoc: "Emily Chen",
    descriptionValidation: "Risk classification pending legal notation review.",
    status: "at-risk",
    deadline: "19 Dec 2025",
  },
  {
    datasetName: "Fixed Income Curves",
    datasetSummary: "Aggregated end-of-day yield curves for sovereign debt.",
    dataOwner: "Ana Rodriguez",
    dataOwnerRole: "Lead Quant Strategist",
    dgo: "Rates & Credit Data Office",
    doSpoc: "Dev Patel",
    descriptionValidation: "Model documentation complete; awaiting quant sign-off.",
    status: "on-track",
    deadline: "11 Jan 2026",
  },
  {
    datasetName: "Trade Surveillance Alerts",
    datasetSummary: "Machine learning anomalies surfaced for compliance review.",
    dataOwner: "Noah Williams",
    dataOwnerRole: "Chief Surveillance Officer",
    dgo: "Compliance Intelligence DGO",
    doSpoc: "Sofia Anders",
    descriptionValidation: "Controls gap identified in APAC ingestion flow.",
    status: "blocked",
    deadline: "02 Feb 2026",
  },
];

const statusCopy: Record<StatusVariant, { label: string; description: string }> = {
  "on-track": {
    label: "On track",
    description: "Delivery aligned; next checkpoint in weekly steering.",
  },
  "at-risk": {
    label: "At risk",
    description: "Action required: validate dependencies before freeze.",
  },
  "blocked": {
    label: "Blocked",
    description: "Escalated to DGO leadership for unblock.",
  },
};

export interface DataTableViewProps {
  title: string;
  subtitle: string;
}

export const DataTableView: React.FC<DataTableViewProps> = ({ title, subtitle }) => {
  const totals = React.useMemo(() => {
    const summary = {
      total: rows.length,
      onTrack: rows.filter(row => row.status === "on-track").length,
      atRisk: rows.filter(row => row.status === "at-risk").length,
      blocked: rows.filter(row => row.status === "blocked").length,
    };
    return summary;
  }, []);

  const headerLabel = subtitle || "Data governance portfolio";
  const heading = title || "Strategic datasets readiness";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="rounded-3xl border border-brand-50 bg-brand-50/80 px-8 py-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">{headerLabel}</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-4 text-slate-700">
          <h2 className="text-3xl font-semibold text-slate-900">{heading}</h2>
          <span className="rounded-full border border-brand-100 bg-white px-4 py-1 text-sm font-semibold text-brand-500">
            {totals.total} active datasets
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> {totals.onTrack} on track
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> {totals.atRisk} at risk
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> {totals.blocked} blocked
          </span>
        </div>
      </header>

      <section className="dt-card">
        <div className="overflow-x-auto">
          <div className="min-w-[960px]">
            <div className="dt-header">
              <span>Dataset Name</span>
              <span>Data Owner</span>
              <span>DGO</span>
              <span>DO Spoc</span>
              <span>Description Validation</span>
              <span>Status</span>
              <span>Deadline</span>
            </div>
            <div className="dt-body">
              {rows.map(row => (
                <article className="dt-row" key={row.datasetName}>
                  <div className="dt-cell">
                    <p className="text-base font-semibold text-slate-900">{row.datasetName}</p>
                    <p className="dt-cell--muted">{row.datasetSummary}</p>
                  </div>
                  <div className="dt-cell">
                    <p className="text-sm font-semibold text-slate-800">{row.dataOwner}</p>
                    <p className="dt-cell--muted">{row.dataOwnerRole}</p>
                  </div>
                  <div className="dt-cell">
                    <p className="text-sm font-semibold text-slate-800">{row.dgo}</p>
                    <p className="dt-cell--muted">Governance Office</p>
                  </div>
                  <div className="dt-cell">
                    <p className="text-sm font-semibold text-slate-800">{row.doSpoc}</p>
                    <p className="dt-cell--muted">Primary contact</p>
                  </div>
                  <div className="dt-cell">
                    <p className="text-sm text-slate-700">{row.descriptionValidation}</p>
                  </div>
                  <div className="dt-cell">
                    <span className="dt-status" data-variant={row.status}>
                      {statusCopy[row.status].label}
                    </span>
                    <p className="dt-cell--muted mt-2">{statusCopy[row.status].description}</p>
                  </div>
                  <div className="dt-cell">
                    <p className="text-sm font-semibold text-slate-800">{row.deadline}</p>
                    <p className="dt-cell--muted">Target regulatory submission</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <footer className="dt-meta">
          <span>
            <strong>Last portfolio review:</strong> 24 Nov 2025
          </span>
          <span>
            <strong>Next governance checkpoint:</strong> 03 Dec 2025
          </span>
          <span>
            <strong>Portfolio owner:</strong> Group Data Council
          </span>
        </footer>
      </section>
    </div>
  );
};
