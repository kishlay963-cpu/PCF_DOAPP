import * as React from "react";

type StatusVariant = "on-track" | "at-risk" | "blocked";

interface CoverageMetric {
  coverageCount: number;
  dataFrequency: string;
  dataTypes: string;
  geography: string;
  history: string;
}

interface DataObjectsAndMeasure {
  costScore: number;
  fundamentalsScore: number;
  overallScore: number;
  performanceScore: number;
  riskScore: number;
  sentimentScore: number;
  technicalScore: number;
  valuationsScore: number;
}

interface DatasetDetail {
  businessUnit: string;
  coverageCount: number;
  dataFrequency: string;
  dataTypes: string[];
  geography: string[];
  history: string;
  description: string;
  domain: string;
  subdomain: string;
  features: string[];
  languages: string[];
  marketingUrl: string;
  minimumDataFrequency: string;
  name: string;
  regions: string[];
  tags: string[];
  timePeriod: string;
  coverageMetric: CoverageMetric;
  dataObjectsAndMeasure: DataObjectsAndMeasure;
}

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
  detail: DatasetDetail;
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
    deadline: "2025-12-05",
    detail: {
      businessUnit: "Capital Markets",
      coverageCount: 128,
      dataFrequency: "Intraday (5 min)",
      dataTypes: ["Orders", "Executions", "Venue analytics"],
      geography: ["Global", "Americas", "EMEA", "APAC"],
      history: "24 months of intraday snapshots maintained with regulatory retention.",
      description: "Comprehensive trade execution dataset harmonised across LSEG order books and partner venues for post-trade analytics and regulatory review.",
      domain: "Markets",
      subdomain: "Equities & Trading",
      features: [
        "Real-time venue harmonisation with venue liquidity markers",
        "Machine learning anomaly detection scoring for compliance triage",
        "Entitlement-ready extracts aligned to regional regulatory standards",
      ],
      languages: ["English", "Japanese"],
      marketingUrl: "https://lseg.com/datasets/global-equity-trades",
      minimumDataFrequency: "15 minutes",
      name: "Global Equity Trades",
      regions: ["Global", "Americas", "EMEA", "APAC"],
      tags: ["Markets", "Execution", "Regulatory"],
      timePeriod: "2019 - Present",
      coverageMetric: {
        coverageCount: 128,
        dataFrequency: "Intraday (5 min)",
        dataTypes: "Listed equity and single-stock derivative trades",
        geography: "Global coverage with venue-level depth",
        history: "24 months of archival records",
      },
      dataObjectsAndMeasure: {
        costScore: 86,
        fundamentalsScore: 72,
        overallScore: 88,
        performanceScore: 84,
        riskScore: 77,
        sentimentScore: 69,
        technicalScore: 82,
        valuationsScore: 91,
      },
    },
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
    deadline: "2025-12-19",
    detail: {
      businessUnit: "Sustainable Finance",
      coverageCount: 860,
      dataFrequency: "Weekly refresh",
      dataTypes: ["Issuer disclosures", "Fund KPIs", "Controversy signals"],
      geography: ["Global", "Americas", "Europe", "Asia"],
      history: "Ten-year longitudinal history including back-cast scores.",
      description: "Unified ESG scoring vault consolidating issuer scores, controversy screens, and fund-level sustainability analytics.",
      domain: "Sustainable Investing",
      subdomain: "ESG Scoring",
      features: [
        "Materiality-weighted scoring framework aligned to SASB and TCFD",
        "Dynamic controversy heat map with narrative summaries",
        "ESG fund look-through with asset-level transparency",
      ],
      languages: ["English", "French", "German", "Mandarin"],
      marketingUrl: "https://lseg.com/datasets/esg-ratings-vault",
      minimumDataFrequency: "Weekly",
      name: "ESG Ratings Vault",
      regions: ["Global", "Americas", "Europe", "Asia"],
      tags: ["ESG", "Sustainability", "Ratings"],
      timePeriod: "2014 - Present",
      coverageMetric: {
        coverageCount: 860,
        dataFrequency: "Weekly refresh",
        dataTypes: "Issuer-level ESG factors and fund KPIs",
        geography: "Global issuers with regional scoring overlays",
        history: "10-year retrievable history",
      },
      dataObjectsAndMeasure: {
        costScore: 64,
        fundamentalsScore: 83,
        overallScore: 79,
        performanceScore: 76,
        riskScore: 71,
        sentimentScore: 74,
        technicalScore: 68,
        valuationsScore: 70,
      },
    },
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
    deadline: "2026-01-11",
    detail: {
      businessUnit: "Rates & Credit",
      coverageCount: 312,
      dataFrequency: "Daily end-of-day",
      dataTypes: ["Yield curves", "Forward curves", "Vol surfaces"],
      geography: ["Global", "Emerging Markets", "Developed Markets"],
      history: "Historical span from 2005 with monthly archiving.",
      description: "Calibrated sovereign yield curves with spline smoothing, benchmark spreads, and volatility overlays for risk and valuation teams.",
      domain: "Fixed Income",
      subdomain: "Curve Analytics",
      features: [
        "Regime-aware smoothing with macro factor adjustments",
        "Forward projection engine with scenario stress testing",
        "Volatility surface exports optimised for risk engines",
      ],
      languages: ["English", "Spanish"],
      marketingUrl: "https://lseg.com/datasets/fixed-income-curves",
      minimumDataFrequency: "Daily",
      name: "Fixed Income Curves",
      regions: ["Global", "Emerging Markets", "Developed Markets"],
      tags: ["Rates", "Risk", "Valuation"],
      timePeriod: "2005 - Present",
      coverageMetric: {
        coverageCount: 312,
        dataFrequency: "Daily end-of-day",
        dataTypes: "Government bond and swap reference curves",
        geography: "Global coverage with EM detail",
        history: "20 years of calibrated curves",
      },
      dataObjectsAndMeasure: {
        costScore: 58,
        fundamentalsScore: 81,
        overallScore: 83,
        performanceScore: 85,
        riskScore: 88,
        sentimentScore: 55,
        technicalScore: 79,
        valuationsScore: 87,
      },
    },
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
    deadline: "2026-02-02",
    detail: {
      businessUnit: "Compliance Intelligence",
      coverageCount: 62,
      dataFrequency: "Near real-time",
      dataTypes: ["Alert narratives", "Control IDs", "Trade context"],
      geography: ["Global", "Americas", "APAC"],
      history: "Rolling 18 months with case audit trail.",
      description: "Surveillance dataset delivering ML-prioritised alerts, related meta-data, and case progression context for compliance teams.",
      domain: "Compliance",
      subdomain: "Surveillance",
      features: [
        "Adaptive risk scoring with supervisory tuning controls",
        "Embedded workflow integration with case management APIs",
        "Explainability pack with contributing signal breakdown",
      ],
      languages: ["English"],
      marketingUrl: "https://lseg.com/datasets/trade-surveillance-alerts",
      minimumDataFrequency: "10 minutes",
      name: "Trade Surveillance Alerts",
      regions: ["Global", "Americas", "APAC"],
      tags: ["Compliance", "Surveillance", "Risk"],
      timePeriod: "2021 - Present",
      coverageMetric: {
        coverageCount: 62,
        dataFrequency: "Near real-time",
        dataTypes: "Alert narratives with case enrichment",
        geography: "Global venues with APAC depth",
        history: "18 months rolling history",
      },
      dataObjectsAndMeasure: {
        costScore: 73,
        fundamentalsScore: 66,
        overallScore: 75,
        performanceScore: 78,
        riskScore: 92,
        sentimentScore: 60,
        technicalScore: 71,
        valuationsScore: 68,
      },
    },
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

const scoreLabels: Record<keyof DataObjectsAndMeasure, string> = {
  costScore: "Cost",
  fundamentalsScore: "Fundamentals",
  overallScore: "Overall",
  performanceScore: "Performance",
  riskScore: "Risk",
  sentimentScore: "Sentiment",
  technicalScore: "Technical",
  valuationsScore: "Valuations",
};

const scoreOrder: (keyof DataObjectsAndMeasure)[] = [
  "overallScore",
  "performanceScore",
  "riskScore",
  "valuationsScore",
  "fundamentalsScore",
  "technicalScore",
  "sentimentScore",
  "costScore",
];

const toSlug = (value: string) => value.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();

export interface DataTableViewProps {
  title: string;
  subtitle: string;
}

const statusOptions: { value: StatusVariant | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on-track", label: "On track" },
  { value: "at-risk", label: "At risk" },
  { value: "blocked", label: "Blocked" },
];

const formatDate = (value: string) => {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

export const DataTableView: React.FC<DataTableViewProps> = ({ title, subtitle }) => {
  const [statusFilter, setStatusFilter] = React.useState<StatusVariant | "all">("all");
  const [dgoFilter, setDgoFilter] = React.useState<string>("all");
  const [deadlineMap, setDeadlineMap] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    rows.forEach(row => {
      initial[row.datasetName] = row.deadline;
    });
    return initial;
  });
  const [selectedRow, setSelectedRow] = React.useState<TableRow | null>(null);
  const closeDetail = React.useCallback(() => setSelectedRow(null), []);
  const openDetail = React.useCallback((row: TableRow) => {
    setSelectedRow(row);
  }, []);
  const dgoFilterIdRef = React.useRef(`dgo-filter-${Math.random().toString(36).slice(2, 8)}`);
  const dgoFilterId = dgoFilterIdRef.current;

  React.useEffect(() => {
    if (!selectedRow) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDetail();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDetail, selectedRow]);

  const dgoOptions = React.useMemo(() => {
    const unique = Array.from(new Set(rows.map(row => row.dgo)));
    return ["all", ...unique];
  }, []);

  const filteredRows = React.useMemo(() => {
    return rows.filter(row => {
      const statusMatches = statusFilter === "all" || row.status === statusFilter;
      const dgoMatches = dgoFilter === "all" || row.dgo === dgoFilter;
      return statusMatches && dgoMatches;
    });
  }, [statusFilter, dgoFilter]);

  const totals = React.useMemo(() => {
    const summary = {
      total: rows.length,
      onTrack: rows.filter(row => row.status === "on-track").length,
      atRisk: rows.filter(row => row.status === "at-risk").length,
      blocked: rows.filter(row => row.status === "blocked").length,
    };
    return summary;
  }, []);

  const filteredSummary = React.useMemo(() => {
    const summary = {
      total: filteredRows.length,
      onTrack: filteredRows.filter(row => row.status === "on-track").length,
      atRisk: filteredRows.filter(row => row.status === "at-risk").length,
      blocked: filteredRows.filter(row => row.status === "blocked").length,
    };
    return summary;
  }, [filteredRows]);

  const isFiltered = statusFilter !== "all" || dgoFilter !== "all";

  const riskTotal = filteredSummary.atRisk + filteredSummary.blocked;
  const blockedShare = filteredSummary.total > 0
    ? Math.round((filteredSummary.blocked / filteredSummary.total) * 100)
    : 0;

  const nextDeadline = React.useMemo(() => {
    const upcoming = filteredRows
      .map(row => ({
        value: deadlineMap[row.datasetName],
        sortKey: new Date(deadlineMap[row.datasetName] ?? "").getTime(),
      }))
      .filter(item => Boolean(item.value) && !Number.isNaN(item.sortKey))
      .sort((a, b) => a.sortKey - b.sortKey);
    return upcoming.length > 0 ? formatDate(upcoming[0].value) : "Not scheduled";
  }, [deadlineMap, filteredRows]);

  const kpiCards = React.useMemo(
    () => [
      {
        label: "In scope",
        value: filteredSummary.total.toString(),
        detail: `of ${totals.total} datasets`,
        accent: "brand" as const,
      },
      {
        label: "On track",
        value: filteredSummary.onTrack.toString(),
        detail: "Steady delivery",
        accent: "emerald" as const,
      },
      {
        label: "Needs attention",
        value: riskTotal.toString(),
        detail: `${filteredSummary.atRisk} at risk · ${filteredSummary.blocked} blocked`,
        accent: "amber" as const,
      },
      {
        label: "Next deadline",
        value: nextDeadline,
        detail: `Blocked share ${blockedShare}%`,
        accent: "slate" as const,
      },
    ],
    [blockedShare, filteredSummary.atRisk, filteredSummary.blocked, filteredSummary.onTrack, filteredSummary.total, nextDeadline, riskTotal, totals.total]
  );

  const handleDeadlineChange = React.useCallback((datasetName: string, value: string) => {
    setDeadlineMap(prev => ({
      ...prev,
      [datasetName]: value,
    }));
  }, []);

  const headerLabel = subtitle || "Data governance portfolio";
  const heading = title || "Strategic datasets readiness";
  const filterBarLabel = `${headerLabel}: ${heading} filters`;
  const filterMetricLabel = `${filteredSummary.total} of ${totals.total} datasets currently in view`;

  const detailTitleId = selectedRow ? `dataset-detail-${toSlug(selectedRow.datasetName)}` : undefined;

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="dt-kpis">
        {kpiCards.map(card => (
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

      <section className="dt-filter-bar" aria-label={filterBarLabel}>
        <div className="dt-filter-bar-left">
          <div className="dt-filter-group">
            <p className="dt-filter-heading">Status</p>
            <div className="dt-filter-chip-group">
              {statusOptions.map(option => (
                <button
                  type="button"
                  key={option.value}
                  className="dt-filter-chip"
                  data-active={statusFilter === option.value}
                  onClick={() => setStatusFilter(option.value)}
                  aria-pressed={statusFilter === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="dt-filter-divider" aria-hidden="true" />
          <div className="dt-filter-group">
            <label className="dt-filter-label" htmlFor={dgoFilterId}>
              Data governance office
            </label>
            <select
              id={dgoFilterId}
              className="dt-filter-select"
              value={dgoFilter}
              onChange={event => setDgoFilter(event.target.value)}
            >
              {dgoOptions.map(option => (
                <option key={option} value={option}>
                  {option === "all" ? "All offices" : option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="dt-filter-bar-right">
          <div className="dt-filter-metric" aria-label={filterMetricLabel}>
            <span className="dt-filter-metric-value">{filteredSummary.total}</span>
            <span className="dt-filter-metric-caption">in view</span>
          </div>
          <button
            type="button"
            className="dt-filter-reset"
            onClick={() => {
              setStatusFilter("all");
              setDgoFilter("all");
            }}
            disabled={!isFiltered}
          >
            Clear filters
          </button>
        </div>
      </section>

      <section className="dt-card dt-table">
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
                {filteredRows.length > 0 ? (
                  filteredRows.map(row => {
                    const slug = toSlug(row.datasetName);
                    const deadlineId = `deadline-${slug}`;
                    const openDetailsForRow = () => openDetail(row);
                    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openDetailsForRow();
                      }
                    };
                    return (
                      <article
                        className="dt-row"
                        key={row.datasetName}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${row.datasetName}`}
                        onClick={openDetailsForRow}
                        onKeyDown={handleKeyDown}
                      >
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
                          <label className="dt-filter-label" htmlFor={deadlineId}>
                            Deadline
                          </label>
                          <input
                            type="date"
                            id={deadlineId}
                            className="dt-date-input"
                            value={deadlineMap[row.datasetName] ?? ""}
                            onChange={event => handleDeadlineChange(row.datasetName, event.target.value)}
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            onKeyDown={event => event.stopPropagation()}
                          />
                          <p className="dt-cell--muted mt-2">Target submission: {formatDate(deadlineMap[row.datasetName])}</p>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="dt-empty">
                    <p className="text-sm font-semibold text-slate-700">No datasets match the current filters.</p>
                    <p>Adjust the filters to widen your results or clear the panel.</p>
                  </div>
                )}
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
            <span>
              <strong>Filters applied:</strong> {isFiltered ? "Custom view" : "All datasets"}
            </span>
          </footer>
      </section>

      {selectedRow ? (
        <div
          className="dt-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={detailTitleId}
          onClick={closeDetail}
        >
          <article className="dt-detail-panel" onClick={event => event.stopPropagation()}>
            <header className="dt-detail-header">
              <div>
                <p className="dt-detail-subtitle">{selectedRow.detail.businessUnit}</p>
                {detailTitleId ? (
                  <h2 className="dt-detail-title" id={detailTitleId}>
                    {selectedRow.datasetName}
                  </h2>
                ) : (
                  <h2 className="dt-detail-title">{selectedRow.datasetName}</h2>
                )}
                <p className="dt-detail-summary">{selectedRow.datasetSummary}</p>
              </div>
              <div className="dt-detail-header-actions">
                <span className="dt-status" data-variant={selectedRow.status}>
                  {statusCopy[selectedRow.status].label}
                </span>
                <button type="button" className="dt-detail-close" onClick={closeDetail}>
                  Close
                </button>
              </div>
            </header>

            <section className="dt-detail-content">
              <div className="dt-detail-metrics">
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Coverage count</p>
                  <p className="dt-detail-metric-value">{selectedRow.detail.coverageCount.toLocaleString()}</p>
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Data frequency</p>
                  <p className="dt-detail-metric-value">{selectedRow.detail.dataFrequency}</p>
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Time period</p>
                  <p className="dt-detail-metric-value">{selectedRow.detail.timePeriod}</p>
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Minimum frequency</p>
                  <p className="dt-detail-metric-value">{selectedRow.detail.minimumDataFrequency}</p>
                </div>
              </div>

              <div className="dt-detail-grid">
                <article className="dt-detail-card lg:col-span-7">
                  <h3 className="dt-detail-card-title">Overview</h3>
                  <p className="dt-detail-body">{selectedRow.detail.description}</p>
                  <dl className="dt-detail-properties">
                    <div>
                      <dt>Domain</dt>
                      <dd>{selectedRow.detail.domain}</dd>
                    </div>
                    <div>
                      <dt>Subdomain</dt>
                      <dd>{selectedRow.detail.subdomain}</dd>
                    </div>
                    <div>
                      <dt>Business unit</dt>
                      <dd>{selectedRow.detail.businessUnit}</dd>
                    </div>
                    <div>
                      <dt>History</dt>
                      <dd>{selectedRow.detail.history}</dd>
                    </div>
                  </dl>
                  <div className="dt-detail-chip-group">
                    {selectedRow.detail.dataTypes.map(type => (
                      <span key={type} className="dt-detail-chip">
                        {type}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="dt-detail-card lg:col-span-5">
                  <h3 className="dt-detail-card-title">Coverage metric</h3>
                  <dl className="dt-detail-properties dt-detail-properties--stacked">
                    <div>
                      <dt>Coverage count</dt>
                      <dd>{selectedRow.detail.coverageMetric.coverageCount.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt>Data frequency</dt>
                      <dd>{selectedRow.detail.coverageMetric.dataFrequency}</dd>
                    </div>
                    <div>
                      <dt>Data types</dt>
                      <dd>{selectedRow.detail.coverageMetric.dataTypes}</dd>
                    </div>
                    <div>
                      <dt>Geography</dt>
                      <dd>{selectedRow.detail.coverageMetric.geography}</dd>
                    </div>
                    <div>
                      <dt>History</dt>
                      <dd>{selectedRow.detail.coverageMetric.history}</dd>
                    </div>
                  </dl>
                </article>

                <article className="dt-detail-card lg:col-span-7">
                  <h3 className="dt-detail-card-title">Data objects &amp; measures</h3>
                  <div className="dt-detail-scores">
                    {scoreOrder.map(key => (
                      <div className="dt-detail-score" key={key}>
                        <p className="dt-detail-score-label">{scoreLabels[key]}</p>
                        <p className="dt-detail-score-value">{selectedRow.detail.dataObjectsAndMeasure[key]}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="dt-detail-card lg:col-span-5">
                  <h3 className="dt-detail-card-title">Features &amp; benefits</h3>
                  <ul className="dt-detail-list">
                    {selectedRow.detail.features.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="dt-detail-card lg:col-span-6">
                  <h3 className="dt-detail-card-title">Distribution &amp; localisation</h3>
                  <div className="dt-detail-distribution">
                    <div>
                      <p className="dt-detail-micro-label">Regions</p>
                      <div className="dt-detail-chip-group">
                        {selectedRow.detail.regions.map(region => (
                          <span key={region} className="dt-detail-chip">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Geography coverage</p>
                      <div className="dt-detail-chip-group">
                        {selectedRow.detail.geography.map(item => (
                          <span key={item} className="dt-detail-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Languages</p>
                      <div className="dt-detail-chip-group">
                        {selectedRow.detail.languages.map(language => (
                          <span key={language} className="dt-detail-chip">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Tags</p>
                      <div className="dt-detail-chip-group">
                        {selectedRow.detail.tags.map(tag => (
                          <span key={tag} className="dt-detail-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>

                <article className="dt-detail-card lg:col-span-6">
                  <h3 className="dt-detail-card-title">Commercial &amp; access</h3>
                  <dl className="dt-detail-properties dt-detail-properties--stacked">
                    <div>
                      <dt>Marketing site</dt>
                      <dd>
                        <a className="dt-detail-link" href={selectedRow.detail.marketingUrl} target="_blank" rel="noreferrer">
                          {selectedRow.detail.marketingUrl}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Minimum cadence</dt>
                      <dd>{selectedRow.detail.minimumDataFrequency}</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </section>
          </article>
        </div>
      ) : null}
    </div>
  );
};
