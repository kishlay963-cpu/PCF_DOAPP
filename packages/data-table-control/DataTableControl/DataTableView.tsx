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

const initialRows: TableRow[] = [
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

const cloneDetail = (detail: DatasetDetail): DatasetDetail => ({
  ...detail,
  dataTypes: [...detail.dataTypes],
  geography: [...detail.geography],
  features: [...detail.features],
  languages: [...detail.languages],
  regions: [...detail.regions],
  tags: [...detail.tags],
  coverageMetric: { ...detail.coverageMetric },
  dataObjectsAndMeasure: { ...detail.dataObjectsAndMeasure },
});

const cloneRow = (row: TableRow): TableRow => ({
  ...row,
  detail: cloneDetail(row.detail),
});

const parseCommaSeparated = (value: string) =>
  value
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

const parseLineSeparated = (value: string) =>
  value
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);

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
  const [rows, setRows] = React.useState<TableRow[]>(initialRows);
  const [statusFilter, setStatusFilter] = React.useState<StatusVariant | "all">("all");
  const [dgoFilter, setDgoFilter] = React.useState<string>("all");
  const [deadlineMap, setDeadlineMap] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    initialRows.forEach(row => {
      initial[row.datasetName] = row.deadline;
    });
    return initial;
  });
  const [selectedRow, setSelectedRow] = React.useState<TableRow | null>(null);
  const [editingRow, setEditingRow] = React.useState<TableRow | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const closeDetail = React.useCallback(() => {
    setSelectedRow(null);
    setEditingRow(null);
    setIsEditing(false);
  }, []);
  const openDetail = React.useCallback((row: TableRow) => {
    setSelectedRow(row);
    setEditingRow(cloneRow(row));
    setIsEditing(false);
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
        if (isEditing) {
          setEditingRow(cloneRow(selectedRow));
          setIsEditing(false);
        } else {
          closeDetail();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDetail, isEditing, selectedRow]);

  const dgoOptions = React.useMemo(() => {
    const unique = Array.from(new Set(rows.map(row => row.dgo)));
    return ["all", ...unique];
  }, [rows]);

  const filteredRows = React.useMemo(() => {
    return rows.filter(row => {
      const statusMatches = statusFilter === "all" || row.status === statusFilter;
      const dgoMatches = dgoFilter === "all" || row.dgo === dgoFilter;
      return statusMatches && dgoMatches;
    });
  }, [rows, statusFilter, dgoFilter]);

  const totals = React.useMemo(() => {
    const summary = {
      total: rows.length,
      onTrack: rows.filter(row => row.status === "on-track").length,
      atRisk: rows.filter(row => row.status === "at-risk").length,
      blocked: rows.filter(row => row.status === "blocked").length,
    };
    return summary;
  }, [rows]);

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
    setRows(prev =>
      prev.map(row =>
        row.datasetName === datasetName
          ? {
              ...row,
              deadline: value,
            }
          : row,
      ),
    );
  }, []);

  const updateEditingRowField = <K extends keyof TableRow>(key: K, value: TableRow[K]) => {
    setEditingRow(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateEditingDetailField = <K extends keyof DatasetDetail>(key: K, value: DatasetDetail[K]) => {
    setEditingRow(prev =>
      prev
        ? {
            ...prev,
            detail: {
              ...prev.detail,
              [key]: value,
            },
          }
        : prev,
    );
  };

  const updateCoverageMetricField = <K extends keyof CoverageMetric>(key: K, value: CoverageMetric[K]) => {
    setEditingRow(prev =>
      prev
        ? {
            ...prev,
            detail: {
              ...prev.detail,
              coverageMetric: {
                ...prev.detail.coverageMetric,
                [key]: value,
              },
            },
          }
        : prev,
    );
  };

  const updateScoreField = <K extends keyof DataObjectsAndMeasure>(key: K, value: DataObjectsAndMeasure[K]) => {
    setEditingRow(prev =>
      prev
        ? {
            ...prev,
            detail: {
              ...prev.detail,
              dataObjectsAndMeasure: {
                ...prev.detail.dataObjectsAndMeasure,
                [key]: value,
              },
            },
          }
        : prev,
    );
  };

  const startEdit = React.useCallback(() => {
    if (!selectedRow) {
      return;
    }
    setEditingRow(cloneRow(selectedRow));
    setIsEditing(true);
  }, [selectedRow]);

  const cancelEdit = React.useCallback(() => {
    if (!selectedRow) {
      setEditingRow(null);
      setIsEditing(false);
      return;
    }
    setEditingRow(cloneRow(selectedRow));
    setIsEditing(false);
  }, [selectedRow]);

  const saveEdit = React.useCallback(() => {
    if (!selectedRow || !editingRow) {
      return;
    }
    const previousName = selectedRow.datasetName;
    const updatedRow = cloneRow(editingRow);

    setRows(prev =>
      prev.map(row => (row.datasetName === previousName ? cloneRow(updatedRow) : row)),
    );

    setDeadlineMap(prev => {
      const next = { ...prev };
      const nextDeadline = updatedRow.deadline ?? "";
      delete next[previousName];
      next[updatedRow.datasetName] = nextDeadline;
      return next;
    });

    setSelectedRow(cloneRow(updatedRow));
    setEditingRow(cloneRow(updatedRow));
    setIsEditing(false);
  }, [editingRow, selectedRow]);

  const headerLabel = subtitle || "Data governance portfolio";
  const heading = title || "Strategic datasets readiness";
  const filterBarLabel = `${headerLabel}: ${heading} filters`;
  const filterMetricLabel = `${filteredSummary.total} of ${totals.total} datasets currently in view`;

  const detailRow = isEditing && editingRow ? editingRow : selectedRow;
  const detailTitleId = detailRow ? `dataset-detail-${toSlug(detailRow.datasetName)}` : undefined;

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

      {detailRow ? (
        <div
          className="dt-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={detailTitleId}
          onClick={() => {
            if (!isEditing) {
              closeDetail();
            }
          }}
        >
          <article className="dt-detail-panel" onClick={event => event.stopPropagation()}>
            <header className="dt-detail-header">
              <div className="dt-detail-header-main">
                {isEditing ? (
                  <input
                    className="dt-input dt-input--caps"
                    value={detailRow.detail.businessUnit}
                    onChange={event => updateEditingDetailField("businessUnit", event.target.value)}
                    placeholder="Business unit"
                  />
                ) : (
                  <p className="dt-detail-subtitle">{detailRow.detail.businessUnit}</p>
                )}
                {detailTitleId ? (
                  <h2 className="dt-detail-title" id={detailTitleId}>
                    {isEditing ? (
                      <input
                        className="dt-input dt-input--heading"
                        value={detailRow.datasetName}
                        onChange={event => updateEditingRowField("datasetName", event.target.value)}
                        placeholder="Dataset name"
                      />
                    ) : (
                      detailRow.datasetName
                    )}
                  </h2>
                ) : (
                  <h2 className="dt-detail-title">
                    {isEditing ? (
                      <input
                        className="dt-input dt-input--heading"
                        value={detailRow.datasetName}
                        onChange={event => updateEditingRowField("datasetName", event.target.value)}
                        placeholder="Dataset name"
                      />
                    ) : (
                      detailRow.datasetName
                    )}
                  </h2>
                )}
                {isEditing ? (
                  <textarea
                    className="dt-textarea"
                    value={detailRow.datasetSummary}
                    onChange={event => updateEditingRowField("datasetSummary", event.target.value)}
                    placeholder="High-level summary"
                  />
                ) : (
                  <p className="dt-detail-summary">{detailRow.datasetSummary}</p>
                )}
              </div>
              <div className="dt-detail-header-actions">
                {isEditing ? (
                  <>
                    <select
                      className="dt-select"
                      value={detailRow.status}
                      onChange={event => updateEditingRowField("status", event.target.value as StatusVariant)}
                    >
                      {statusOptions
                        .filter(option => option.value !== "all")
                        .map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                    <button type="button" className="dt-detail-action" onClick={cancelEdit}>
                      Cancel
                    </button>
                    <button type="button" className="dt-detail-action dt-detail-action--primary" onClick={saveEdit}>
                      Save changes
                    </button>
                  </>
                ) : (
                  <>
                    <span className="dt-status" data-variant={detailRow.status}>
                      {statusCopy[detailRow.status].label}
                    </span>
                    <button type="button" className="dt-detail-action" onClick={startEdit}>
                      Edit details
                    </button>
                    <button type="button" className="dt-detail-action" onClick={closeDetail}>
                      Close
                    </button>
                  </>
                )}
              </div>
            </header>

            <section className="dt-detail-content">
              <div className="dt-detail-metrics">
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Coverage count</p>
                  {isEditing ? (
                    <input
                      type="number"
                      className="dt-input dt-input--metric"
                      value={detailRow.detail.coverageCount}
                      onChange={event => updateEditingDetailField("coverageCount", Number(event.target.value) || 0)}
                      min={0}
                    />
                  ) : (
                    <p className="dt-detail-metric-value">{detailRow.detail.coverageCount.toLocaleString()}</p>
                  )}
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Data frequency</p>
                  {isEditing ? (
                    <input
                      className="dt-input dt-input--metric"
                      value={detailRow.detail.dataFrequency}
                      onChange={event => updateEditingDetailField("dataFrequency", event.target.value)}
                    />
                  ) : (
                    <p className="dt-detail-metric-value">{detailRow.detail.dataFrequency}</p>
                  )}
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Time period</p>
                  {isEditing ? (
                    <input
                      className="dt-input dt-input--metric"
                      value={detailRow.detail.timePeriod}
                      onChange={event => updateEditingDetailField("timePeriod", event.target.value)}
                    />
                  ) : (
                    <p className="dt-detail-metric-value">{detailRow.detail.timePeriod}</p>
                  )}
                </div>
                <div className="dt-detail-metric">
                  <p className="dt-detail-metric-label">Minimum frequency</p>
                  {isEditing ? (
                    <input
                      className="dt-input dt-input--metric"
                      value={detailRow.detail.minimumDataFrequency}
                      onChange={event => updateEditingDetailField("minimumDataFrequency", event.target.value)}
                    />
                  ) : (
                    <p className="dt-detail-metric-value">{detailRow.detail.minimumDataFrequency}</p>
                  )}
                </div>
              </div>

              <div className="dt-detail-grid">
                <article className="dt-detail-card lg:col-span-7">
                  <h3 className="dt-detail-card-title">Overview</h3>
                  {isEditing ? (
                    <textarea
                      className="dt-textarea"
                      value={detailRow.detail.description}
                      onChange={event => updateEditingDetailField("description", event.target.value)}
                      placeholder="Narrative overview"
                    />
                  ) : (
                    <p className="dt-detail-body">{detailRow.detail.description}</p>
                  )}
                  <dl className="dt-detail-properties">
                    <div>
                      <dt>Domain</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.domain}
                            onChange={event => updateEditingDetailField("domain", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.domain
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Subdomain</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.subdomain}
                            onChange={event => updateEditingDetailField("subdomain", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.subdomain
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Business unit</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.businessUnit}
                            onChange={event => updateEditingDetailField("businessUnit", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.businessUnit
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>History</dt>
                      <dd>
                        {isEditing ? (
                          <textarea
                            className="dt-textarea dt-textarea--compact"
                            value={detailRow.detail.history}
                            onChange={event => updateEditingDetailField("history", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.history
                        )}
                      </dd>
                    </div>
                  </dl>
                  {isEditing ? (
                    <textarea
                      className="dt-textarea"
                      value={detailRow.detail.dataTypes.join("\n")}
                      onChange={event => updateEditingDetailField("dataTypes", parseLineSeparated(event.target.value))}
                      placeholder="List each data type on a new line"
                    />
                  ) : (
                    <div className="dt-detail-chip-group">
                      {detailRow.detail.dataTypes.map(type => (
                        <span key={type} className="dt-detail-chip">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </article>

                <article className="dt-detail-card lg:col-span-5">
                  <h3 className="dt-detail-card-title">Stewardship &amp; readiness</h3>
                  <dl className="dt-detail-properties dt-detail-properties--stacked">
                    <div>
                      <dt>Data owner</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.dataOwner}
                            onChange={event => updateEditingRowField("dataOwner", event.target.value)}
                          />
                        ) : (
                          detailRow.dataOwner
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Owner role</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.dataOwnerRole}
                            onChange={event => updateEditingRowField("dataOwnerRole", event.target.value)}
                          />
                        ) : (
                          detailRow.dataOwnerRole
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Data governance office</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.dgo}
                            onChange={event => updateEditingRowField("dgo", event.target.value)}
                          />
                        ) : (
                          detailRow.dgo
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>DO SPOC</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.doSpoc}
                            onChange={event => updateEditingRowField("doSpoc", event.target.value)}
                          />
                        ) : (
                          detailRow.doSpoc
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Readiness notes</dt>
                      <dd>
                        {isEditing ? (
                          <textarea
                            className="dt-textarea dt-textarea--compact"
                            value={detailRow.descriptionValidation}
                            onChange={event => updateEditingRowField("descriptionValidation", event.target.value)}
                          />
                        ) : (
                          detailRow.descriptionValidation
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Target deadline</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            type="date"
                            className="dt-input"
                            value={detailRow.deadline ?? ""}
                            onChange={event => updateEditingRowField("deadline", event.target.value)}
                          />
                        ) : (
                          formatDate(detailRow.deadline)
                        )}
                      </dd>
                    </div>
                  </dl>
                </article>

                <article className="dt-detail-card lg:col-span-5">
                  <h3 className="dt-detail-card-title">Coverage metric</h3>
                  <dl className="dt-detail-properties dt-detail-properties--stacked">
                    <div>
                      <dt>Coverage count</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            type="number"
                            className="dt-input"
                            value={detailRow.detail.coverageMetric.coverageCount}
                            onChange={event => updateCoverageMetricField("coverageCount", Number(event.target.value) || 0)}
                            min={0}
                          />
                        ) : (
                          detailRow.detail.coverageMetric.coverageCount.toLocaleString()
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Data frequency</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.coverageMetric.dataFrequency}
                            onChange={event => updateCoverageMetricField("dataFrequency", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.coverageMetric.dataFrequency
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Data types</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.coverageMetric.dataTypes}
                            onChange={event => updateCoverageMetricField("dataTypes", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.coverageMetric.dataTypes
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Geography</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.coverageMetric.geography}
                            onChange={event => updateCoverageMetricField("geography", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.coverageMetric.geography
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>History</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.coverageMetric.history}
                            onChange={event => updateCoverageMetricField("history", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.coverageMetric.history
                        )}
                      </dd>
                    </div>
                  </dl>
                </article>

                <article className="dt-detail-card lg:col-span-7">
                  <h3 className="dt-detail-card-title">Data objects &amp; measures</h3>
                  <div className="dt-detail-scores">
                    {scoreOrder.map(key => (
                      <div className="dt-detail-score" key={key}>
                        <p className="dt-detail-score-label">{scoreLabels[key]}</p>
                        {isEditing ? (
                          <input
                            type="number"
                            className="dt-input dt-input--score"
                            value={detailRow.detail.dataObjectsAndMeasure[key]}
                            onChange={event => updateScoreField(key, Number(event.target.value) || 0)}
                            min={0}
                            max={100}
                          />
                        ) : (
                          <p className="dt-detail-score-value">{detailRow.detail.dataObjectsAndMeasure[key]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="dt-detail-card lg:col-span-5">
                  <h3 className="dt-detail-card-title">Features &amp; benefits</h3>
                  {isEditing ? (
                    <textarea
                      className="dt-textarea"
                      value={detailRow.detail.features.join("\n")}
                      onChange={event => updateEditingDetailField("features", parseLineSeparated(event.target.value))}
                      placeholder="List each benefit on a new line"
                    />
                  ) : (
                    <ul className="dt-detail-list">
                      {detailRow.detail.features.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>

                <article className="dt-detail-card lg:col-span-6">
                  <h3 className="dt-detail-card-title">Distribution &amp; localisation</h3>
                  <div className="dt-detail-distribution">
                    <div>
                      <p className="dt-detail-micro-label">Regions</p>
                      {isEditing ? (
                        <input
                          className="dt-input"
                          value={detailRow.detail.regions.join(", ")}
                          onChange={event => updateEditingDetailField("regions", parseCommaSeparated(event.target.value))}
                        />
                      ) : (
                        <div className="dt-detail-chip-group">
                          {detailRow.detail.regions.map(region => (
                            <span key={region} className="dt-detail-chip">
                              {region}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Geography coverage</p>
                      {isEditing ? (
                        <input
                          className="dt-input"
                          value={detailRow.detail.geography.join(", ")}
                          onChange={event => updateEditingDetailField("geography", parseCommaSeparated(event.target.value))}
                        />
                      ) : (
                        <div className="dt-detail-chip-group">
                          {detailRow.detail.geography.map(item => (
                            <span key={item} className="dt-detail-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Languages</p>
                      {isEditing ? (
                        <input
                          className="dt-input"
                          value={detailRow.detail.languages.join(", ")}
                          onChange={event => updateEditingDetailField("languages", parseCommaSeparated(event.target.value))}
                        />
                      ) : (
                        <div className="dt-detail-chip-group">
                          {detailRow.detail.languages.map(language => (
                            <span key={language} className="dt-detail-chip">
                              {language}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="dt-detail-micro-label">Tags</p>
                      {isEditing ? (
                        <input
                          className="dt-input"
                          value={detailRow.detail.tags.join(", ")}
                          onChange={event => updateEditingDetailField("tags", parseCommaSeparated(event.target.value))}
                        />
                      ) : (
                        <div className="dt-detail-chip-group">
                          {detailRow.detail.tags.map(tag => (
                            <span key={tag} className="dt-detail-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>

                <article className="dt-detail-card lg:col-span-6">
                  <h3 className="dt-detail-card-title">Commercial &amp; access</h3>
                  <dl className="dt-detail-properties dt-detail-properties--stacked">
                    <div>
                      <dt>Marketing site</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.marketingUrl}
                            onChange={event => updateEditingDetailField("marketingUrl", event.target.value)}
                          />
                        ) : (
                          <a className="dt-detail-link" href={detailRow.detail.marketingUrl} target="_blank" rel="noreferrer">
                            {detailRow.detail.marketingUrl}
                          </a>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Minimum cadence</dt>
                      <dd>
                        {isEditing ? (
                          <input
                            className="dt-input"
                            value={detailRow.detail.minimumDataFrequency}
                            onChange={event => updateEditingDetailField("minimumDataFrequency", event.target.value)}
                          />
                        ) : (
                          detailRow.detail.minimumDataFrequency
                        )}
                      </dd>
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
