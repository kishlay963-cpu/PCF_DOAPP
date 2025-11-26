import * as React from "react";

const logoSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title desc">
  <title id="title">Data Trust Shield</title>
  <desc id="desc">Stylised shield surrounding a listening head silhouette</desc>
  <defs>
    <linearGradient id="shield" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4F6BFF" />
      <stop offset="100%" stop-color="#001EFF" />
    </linearGradient>
    <linearGradient id="lines" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#79A2FF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#1E3AFF" stop-opacity="0.4" />
    </linearGradient>
  </defs>
  <path fill="url(#shield)" d="M64 8c20 10 40 10 56 8v42c0 27-20 52-56 62-36-10-56-35-56-62V16c16 2 36 2 56-8z" />
  <path fill="none" stroke="url(#lines)" stroke-width="2" stroke-linecap="round" d="M64 18v92M32 32l64 64M32 64h64M32 96l64-64" />
  <g fill="none" stroke="#A8BEFF" stroke-width="4" stroke-linecap="round">
    <path d="M80 56c0-9.941-8.059-18-18-18s-18 8.059-18 18" />
    <path d="M44 84c0-11.046 8.954-20 20-20s20 8.954 20 20" />
    <path d="M74 62c4.418 0 8 3.582 8 8" />
  </g>
  <circle cx="58" cy="56" r="10" fill="#D6E1FF" />
  <path fill="#001EFF" d="M58 48a8 8 0 1 1 0 16c-1.6 0-2.88-.32-4.4-.8 1.44-1.92 2.32-4.32 2.32-6.8s-.88-4.88-2.32-6.8A11.7 11.7 0 0 1 58 48z" />
  <circle cx="70" cy="64" r="4" fill="#79A2FF" />
</svg>`;

const logoAsset = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvgMarkup)}`;

export type StatusVariant = "on-track" | "at-risk" | "blocked";

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

export interface TableRow {
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

export interface TableSummary {
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

export interface DetailEntry {
  datasetName: string;
  detail: DatasetDetail;
}

interface ChangeVersion {
  version: number;
  submittedAt: string;
  row: TableRow;
}

type SearchType = "dataset" | "domain" | "subdomain" | "owner" | "dgo" | "spoc";

interface SearchEntry {
  type: SearchType;
  value: string;
  searchValue: string;
}

export const defaultRows: TableRow[] = [
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

const normaliseStatus = (value: unknown, fallback?: StatusVariant): StatusVariant => {
  if (value === "on-track" || value === "at-risk" || value === "blocked") {
    return value;
  }
  if (fallback === "on-track" || fallback === "at-risk" || fallback === "blocked") {
    return fallback;
  }
  return "on-track";
};

const searchTypeOrder: SearchType[] = ["dataset", "domain", "subdomain", "owner", "dgo", "spoc"];

const searchTypeConfig: Record<SearchType, { label: string; shortLabel: string }> = {
  dataset: { label: "Dataset name", shortLabel: "DS" },
  domain: { label: "Domain", shortLabel: "DM" },
  subdomain: { label: "Subdomain", shortLabel: "SD" },
  owner: { label: "Data owner", shortLabel: "OW" },
  dgo: { label: "DGO", shortLabel: "GO" },
  spoc: { label: "SPOC", shortLabel: "SP" },
};

const normaliseText = (value: string | undefined | null) => (value ?? "").trim().toLowerCase();

const buildSearchIndex = (rows: TableRow[]): SearchEntry[] => {
  const buckets: Record<SearchType, Map<string, string>> = {
    dataset: new Map<string, string>(),
    domain: new Map<string, string>(),
    subdomain: new Map<string, string>(),
    owner: new Map<string, string>(),
    dgo: new Map<string, string>(),
    spoc: new Map<string, string>(),
  };

  const register = (type: SearchType, rawValue: string | undefined | null) => {
    const candidate = (rawValue ?? "").trim();
    if (!candidate) {
      return;
    }
    const key = candidate.toLowerCase();
    if (!buckets[type].has(key)) {
      buckets[type].set(key, candidate);
    }
  };

  rows.forEach(row => {
    register("dataset", row.datasetName);
    register("domain", row.detail.domain);
    register("subdomain", row.detail.subdomain);
    register("owner", row.dataOwner);
    register("dgo", row.dgo);
    register("spoc", row.doSpoc);
  });

  const entries: SearchEntry[] = [];
  searchTypeOrder.forEach(type => {
    buckets[type].forEach((value, key) => {
      entries.push({
        type,
        value,
        searchValue: key,
      });
    });
  });

  return entries.sort((a, b) => {
    if (a.type === b.type) {
      return a.value.localeCompare(b.value);
    }
    return searchTypeOrder.indexOf(a.type) - searchTypeOrder.indexOf(b.type);
  });
};

export const defaultTableData: TableSummary[] = defaultRows.map(({ detail, ...summary }): TableSummary => ({
  ...summary,
}));

export const defaultDetailData: DetailEntry[] = defaultRows.map(row => ({
  datasetName: row.datasetName,
  detail: cloneDetail(row.detail),
}));

const defaultRegions = Array.from(
  new Set(
    defaultDetailData.flatMap(entry => entry.detail.regions).map(region => region.trim()).filter(Boolean),
  ),
).sort();

const defaultLanguages = Array.from(
  new Set(
    defaultDetailData.flatMap(entry => entry.detail.languages).map(language => language.trim()).filter(Boolean),
  ),
).sort();

const defaultDetailMap: Record<string, DatasetDetail> = defaultDetailData.reduce((acc, entry) => {
  acc[entry.datasetName] = cloneDetail(entry.detail);
  return acc;
}, {} as Record<string, DatasetDetail>);

const cloneDetailMap = (source: Record<string, DatasetDetail>): Record<string, DatasetDetail> => {
  const result: Record<string, DatasetDetail> = {};
  Object.keys(source).forEach(key => {
    result[key] = cloneDetail(source[key]);
  });
  return result;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const createEmptyDetail = (datasetName: string): DatasetDetail => ({
  businessUnit: "",
  coverageCount: 0,
  dataFrequency: "",
  dataTypes: [],
  geography: [],
  history: "",
  description: "",
  domain: "",
  subdomain: "",
  features: [],
  languages: [],
  marketingUrl: "",
  minimumDataFrequency: "",
  name: datasetName,
  regions: [],
  tags: [],
  timePeriod: "",
  coverageMetric: {
    coverageCount: 0,
    dataFrequency: "",
    dataTypes: "",
    geography: "",
    history: "",
  },
  dataObjectsAndMeasure: {
    costScore: 0,
    fundamentalsScore: 0,
    overallScore: 0,
    performanceScore: 0,
    riskScore: 0,
    sentimentScore: 0,
    technicalScore: 0,
    valuationsScore: 0,
  },
});

const buildDeadlineMap = (sourceRows: TableRow[]): Record<string, string> => {
  const next: Record<string, string> = {};
  sourceRows.forEach(row => {
    next[row.datasetName] = row.deadline;
  });
  return next;
};

const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");

const isCoverageMetric = (value: unknown): value is CoverageMetric => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const metric = value as CoverageMetric;
  return (
    typeof metric.coverageCount === "number" &&
    typeof metric.dataFrequency === "string" &&
    typeof metric.dataTypes === "string" &&
    typeof metric.geography === "string" &&
    typeof metric.history === "string"
  );
};

const isDataObjectsAndMeasure = (value: unknown): value is DataObjectsAndMeasure => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const measure = value as DataObjectsAndMeasure;
  return (
    typeof measure.costScore === "number" &&
    typeof measure.fundamentalsScore === "number" &&
    typeof measure.overallScore === "number" &&
    typeof measure.performanceScore === "number" &&
    typeof measure.riskScore === "number" &&
    typeof measure.sentimentScore === "number" &&
    typeof measure.technicalScore === "number" &&
    typeof measure.valuationsScore === "number"
  );
};

const isDatasetDetail = (value: unknown): value is DatasetDetail => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const detail = value as DatasetDetail;
  return (
    typeof detail.businessUnit === "string" &&
    typeof detail.coverageCount === "number" &&
    typeof detail.dataFrequency === "string" &&
    isStringArray(detail.dataTypes) &&
    isStringArray(detail.geography) &&
    typeof detail.history === "string" &&
    typeof detail.description === "string" &&
    typeof detail.domain === "string" &&
    typeof detail.subdomain === "string" &&
    isStringArray(detail.features) &&
    isStringArray(detail.languages) &&
    typeof detail.marketingUrl === "string" &&
    typeof detail.minimumDataFrequency === "string" &&
    typeof detail.name === "string" &&
    isStringArray(detail.regions) &&
    isStringArray(detail.tags) &&
    typeof detail.timePeriod === "string" &&
    isCoverageMetric(detail.coverageMetric) &&
    isDataObjectsAndMeasure(detail.dataObjectsAndMeasure)
  );
};

const isStatusVariantValue = (value: unknown): value is StatusVariant => value === "on-track" || value === "at-risk" || value === "blocked";

const isTableSummary = (value: unknown): value is TableSummary => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const summary = value as TableSummary;
  return (
    typeof summary.datasetName === "string" &&
    typeof summary.datasetSummary === "string" &&
    typeof summary.dataOwner === "string" &&
    typeof summary.dataOwnerRole === "string" &&
    typeof summary.dgo === "string" &&
    typeof summary.doSpoc === "string" &&
    typeof summary.descriptionValidation === "string" &&
    typeof summary.deadline === "string" &&
    isStatusVariantValue(summary.status)
  );
};

const isDetailEntry = (value: unknown): value is DetailEntry => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const entry = value as DetailEntry;
  return typeof entry.datasetName === "string" && isDatasetDetail(entry.detail);
};

const cloneSummaries = (summaries: TableSummary[]): TableSummary[] => summaries.map(summary => ({ ...summary }));

const parseTableSummaries = (dataJson?: string | null): TableSummary[] => {
  if (!dataJson) {
    return cloneSummaries(defaultTableData);
  }
  try {
    const raw: unknown = JSON.parse(dataJson);
    if (!Array.isArray(raw)) {
      return cloneSummaries(defaultTableData);
    }
    const validSummaries = (raw as unknown[]).filter(isTableSummary);
    if (validSummaries.length === 0) {
      return cloneSummaries(defaultTableData);
    }
    return cloneSummaries(validSummaries);
  } catch (error) {
    return cloneSummaries(defaultTableData);
  }
};

const parseDetailEntries = (dataJson?: string | null): Record<string, DatasetDetail> => {
  if (!dataJson) {
    return cloneDetailMap(defaultDetailMap);
  }
  try {
    const raw: unknown = JSON.parse(dataJson);
    const entries: DetailEntry[] = [];
    if (Array.isArray(raw)) {
      (raw as unknown[]).forEach(item => {
        if (isDetailEntry(item)) {
          entries.push(item);
        }
      });
    } else if (raw && typeof raw === "object") {
      Object.entries(raw as Record<string, unknown>).forEach(([key, value]) => {
        if (isDatasetDetail(value)) {
          entries.push({ datasetName: key, detail: value });
        }
      });
    }

    if (entries.length === 0) {
      return cloneDetailMap(defaultDetailMap);
    }

    const detailMap: Record<string, DatasetDetail> = {};
    entries.forEach(entry => {
      detailMap[entry.datasetName] = cloneDetail(entry.detail);
    });
    return detailMap;
  } catch (error) {
    return cloneDetailMap(defaultDetailMap);
  }
};

const mergeRows = (summaries: TableSummary[], detailMap: Record<string, DatasetDetail>): TableRow[] =>
  summaries.map(summary => ({
    ...summary,
    detail: cloneDetail(detailMap[summary.datasetName] ?? defaultDetailMap[summary.datasetName] ?? createEmptyDetail(summary.datasetName)),
  }));

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

const parseOptionList = (source: string, fallback: string[]): string[] => {
  if (!source) {
    return [...fallback];
  }
  try {
    const parsed: unknown = JSON.parse(source);
    if (!Array.isArray(parsed)) {
      return [...fallback];
    }
    return Array.from(
      new Set(
        parsed
          .map(item => (typeof item === "string" ? item : String(item)))
          .map(entry => entry.trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
  } catch (error) {
    return [...fallback];
  }
};

const buildRowMap = (rows: TableRow[]): Record<string, TableRow> => {
  const result: Record<string, TableRow> = {};
  rows.forEach(row => {
    result[row.datasetName] = cloneRow(row);
  });
  return result;
};

const serialiseChangeRequest = (map: Record<string, ChangeVersion[]>): string =>
  JSON.stringify(
    {
      datasets: map,
    },
    null,
    2,
  );

interface ChangeVersionDraft {
  version?: unknown;
  submittedAt?: unknown;
  row?: Partial<TableRow> | null | undefined;
}

const sanitiseChangeVersion = (entry: unknown, fallbackRow?: TableRow): ChangeVersion | null => {
  if (!entry || typeof entry !== "object") {
    return null;
  }
  const candidate = entry as ChangeVersionDraft;
  const rawVersion = typeof candidate.version === "number" ? candidate.version : Number(candidate.version);
  const version = Number.isFinite(rawVersion) && rawVersion > 0 ? Math.floor(rawVersion) : 1;
  const submittedAt = typeof candidate.submittedAt === "string" && candidate.submittedAt ? candidate.submittedAt : new Date().toISOString();
  const rowSource = candidate.row ?? fallbackRow;
  if (!rowSource) {
    return null;
  }
  const detailSource = rowSource.detail ?? fallbackRow?.detail;
  if (!detailSource) {
    return null;
  }
  const row: TableRow = {
    datasetName: rowSource.datasetName ?? fallbackRow?.datasetName ?? "",
    datasetSummary: rowSource.datasetSummary ?? fallbackRow?.datasetSummary ?? "",
    dataOwner: rowSource.dataOwner ?? fallbackRow?.dataOwner ?? "",
    dataOwnerRole: rowSource.dataOwnerRole ?? fallbackRow?.dataOwnerRole ?? "",
    dgo: rowSource.dgo ?? fallbackRow?.dgo ?? "",
    doSpoc: rowSource.doSpoc ?? fallbackRow?.doSpoc ?? "",
    descriptionValidation: rowSource.descriptionValidation ?? fallbackRow?.descriptionValidation ?? "",
    status: normaliseStatus(rowSource.status, fallbackRow?.status),
    deadline: rowSource.deadline ?? fallbackRow?.deadline ?? "",
    detail: cloneDetail(detailSource),
  };
  return {
    version,
    submittedAt,
    row,
  };
};

const parseChangeRequestJson = (source: string, rowMap: Record<string, TableRow>): Record<string, ChangeVersion[]> => {
  if (!source) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(source);
    if (!isRecord(parsed)) {
      return {};
    }
    const datasetsCandidate = (parsed as { datasets?: unknown }).datasets;
    if (!isRecord(datasetsCandidate)) {
      return {};
    }
    const map: Record<string, ChangeVersion[]> = {};
    Object.keys(datasetsCandidate).forEach(key => {
      const entries = datasetsCandidate[key];
      if (!Array.isArray(entries)) {
        return;
      }
      const sanitised = entries
        .map(item => sanitiseChangeVersion(item, rowMap[key]))
        .filter((item): item is ChangeVersion => Boolean(item))
        .sort((a, b) => a.version - b.version);
      if (sanitised.length > 0) {
        map[key] = sanitised.map(item => ({
          version: item.version,
          submittedAt: item.submittedAt,
          row: cloneRow(item.row),
        }));
      }
    });
    return map;
  } catch (error) {
    return {};
  }
};

export interface DataTableViewProps {
  title: string;
  subtitle: string;
  tableJson?: string;
  detailJson?: string;
  userName?: string;
  regionOptionsJson?: string;
  languageOptionsJson?: string;
  changeRequestJson?: string;
  onChangeRequestUpdate?: (payload: string) => void;
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

const formatTimestamp = (value: string) => {
  if (!value) {
    return "Pending";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const DataTableView: React.FC<DataTableViewProps> = ({
  title,
  subtitle,
  tableJson,
  detailJson,
  userName,
  regionOptionsJson,
  languageOptionsJson,
  changeRequestJson,
  onChangeRequestUpdate,
}) => {
  const tableSource = tableJson ?? "";
  const detailSource = detailJson ?? "";
  const initialRowsRef = React.useRef<TableRow[]>([]);
  if (initialRowsRef.current.length === 0) {
    const initialSummaries = parseTableSummaries(tableSource);
    const initialDetails = parseDetailEntries(detailSource);
    initialRowsRef.current = mergeRows(initialSummaries, initialDetails);
  }
  const initialRows = initialRowsRef.current;

  const originalRowMapRef = React.useRef<Record<string, TableRow>>({});
  if (Object.keys(originalRowMapRef.current).length === 0) {
    originalRowMapRef.current = buildRowMap(initialRows);
  }

  const parsedRegionOptions = React.useMemo(() => parseOptionList(regionOptionsJson ?? "", defaultRegions), [regionOptionsJson]);
  const parsedLanguageOptions = React.useMemo(
    () => parseOptionList(languageOptionsJson ?? "", defaultLanguages),
    [languageOptionsJson],
  );

  const regionOptions = React.useMemo(() => {
    const fromData = initialRows.flatMap(row => row.detail.regions);
    return Array.from(new Set([...parsedRegionOptions, ...fromData])).map(item => item.trim()).filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, [initialRows, parsedRegionOptions]);

  const languageOptions = React.useMemo(() => {
    const fromData = initialRows.flatMap(row => row.detail.languages);
    return Array.from(new Set([...parsedLanguageOptions, ...fromData])).map(item => item.trim()).filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, [initialRows, parsedLanguageOptions]);

  const initialChangeHistoryRef = React.useRef<Record<string, ChangeVersion[]>>({});
  if (Object.keys(initialChangeHistoryRef.current).length === 0) {
    initialChangeHistoryRef.current = parseChangeRequestJson(changeRequestJson ?? "", originalRowMapRef.current);
  }

  const [changeHistoryMap, setChangeHistoryMap] = React.useState<Record<string, ChangeVersion[]>>(initialChangeHistoryRef.current);
  const changeHistorySourceRef = React.useRef(changeRequestJson ?? "");

  const [rows, setRows] = React.useState<TableRow[]>(initialRows);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSearchFilter, setActiveSearchFilter] = React.useState<SearchEntry | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const searchListIdRef = React.useRef(`dt-search-${Math.random().toString(36).slice(2, 8)}`);
  const [statusFilter, setStatusFilter] = React.useState<StatusVariant | "all">("all");
  const [dgoFilter, setDgoFilter] = React.useState<string>("all");
  const [deadlineMap, setDeadlineMap] = React.useState<Record<string, string>>(() => buildDeadlineMap(initialRows));
  const [selectedRow, setSelectedRow] = React.useState<TableRow | null>(null);
  const [editingRow, setEditingRow] = React.useState<TableRow | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLanding, setIsLanding] = React.useState(true);
  const [selectedDatasetName, setSelectedDatasetName] = React.useState<string | null>(null);
  const [activeVersionMap, setActiveVersionMap] = React.useState<Record<string, number>>({});
  const activeVersionIndex = selectedDatasetName ? activeVersionMap[selectedDatasetName] ?? 0 : 0;

  const searchIndex = React.useMemo(() => buildSearchIndex(rows), [rows]);

  const suggestions = React.useMemo(() => {
    if (!searchOpen) {
      return [];
    }
    const query = searchInput.trim().toLowerCase();
    const base = query ? searchIndex.filter(entry => entry.searchValue.includes(query)) : searchIndex;
    const filtered = activeSearchFilter
      ? base.filter(entry => !(entry.type === activeSearchFilter.type && entry.searchValue === activeSearchFilter.searchValue))
      : base;
    return filtered.slice(0, 8);
  }, [activeSearchFilter, searchIndex, searchInput, searchOpen]);

  React.useEffect(() => {
    if (!searchOpen) {
      return;
    }
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [searchOpen]);

  React.useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  const resetSearchInput = React.useCallback(() => {
    setSearchInput("");
    setSearchQuery("");
    setActiveSearchFilter(null);
  }, []);

  const clearSearch = React.useCallback(() => {
    resetSearchInput();
    setSearchOpen(false);
  }, [resetSearchInput]);

  const applySearchQuery = React.useCallback((raw: string) => {
    const next = raw.trim();
    setActiveSearchFilter(null);
    setSearchQuery(next);
    setSearchInput(next);
  }, []);

  const handleSearchToggle = React.useCallback(() => {
    if (searchOpen) {
      setSearchOpen(false);
      return;
    }
    const seed = activeSearchFilter ? activeSearchFilter.value : searchQuery;
    setSearchInput(seed);
    setSearchOpen(true);
  }, [activeSearchFilter, searchOpen, searchQuery]);

  const handleSearchInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setSearchInput(nextValue);
      if (activeSearchFilter) {
        setActiveSearchFilter(null);
      }
      setSearchQuery(nextValue);
    },
    [activeSearchFilter],
  );

  const handleSearchKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (activeSearchFilter) {
          setSearchOpen(false);
        } else {
          applySearchQuery(searchInput);
          setSearchOpen(false);
        }
      }
      if (event.key === "Escape") {
        event.preventDefault();
        if (searchInput.trim()) {
          resetSearchInput();
        } else {
          setSearchOpen(false);
        }
      }
    },
    [activeSearchFilter, applySearchQuery, resetSearchInput, searchInput],
  );

  const handleSuggestionSelect = React.useCallback((entry: SearchEntry) => {
    setActiveSearchFilter(entry);
    setSearchQuery(entry.value);
    setSearchInput(entry.value);
    setSearchOpen(false);
  }, []);

  const rowMatchesSearch = React.useCallback(
    (row: TableRow) => {
      if (activeSearchFilter) {
        const target = activeSearchFilter.searchValue;
        switch (activeSearchFilter.type) {
          case "dataset":
            return normaliseText(row.datasetName) === target;
          case "domain":
            return normaliseText(row.detail.domain) === target;
          case "subdomain":
            return normaliseText(row.detail.subdomain) === target;
          case "owner":
            return normaliseText(row.dataOwner) === target;
          case "dgo":
            return normaliseText(row.dgo) === target;
          case "spoc":
            return normaliseText(row.doSpoc) === target;
          default:
            return true;
        }
      }
      const query = searchQuery.trim().toLowerCase();
      if (!query) {
        return true;
      }
      const primaryFields = [
        row.datasetName,
        row.datasetSummary,
        row.detail.domain,
        row.detail.subdomain,
        row.dataOwner,
        row.dataOwnerRole,
        row.dgo,
        row.doSpoc,
        row.descriptionValidation,
      ];
      if (primaryFields.some(value => normaliseText(value).includes(query))) {
        return true;
      }
      const listFields: string[][] = [
        row.detail.tags,
        row.detail.features,
        row.detail.languages,
        row.detail.regions,
        row.detail.dataTypes,
      ];
      return listFields.some(list => list.some(item => normaliseText(item).includes(query)));
    },
    [activeSearchFilter, searchQuery],
  );

  const hasSearch = React.useMemo(() => activeSearchFilter !== null || searchQuery.trim().length > 0, [activeSearchFilter, searchQuery]);

  const searchPillValue = activeSearchFilter ? activeSearchFilter.value : searchQuery.trim();
  const searchPillType: SearchType | "query" = activeSearchFilter ? activeSearchFilter.type : "query";
  const searchPillBadge = activeSearchFilter ? searchTypeConfig[activeSearchFilter.type].shortLabel : "TXT";
  const searchPillLabel = activeSearchFilter ? searchTypeConfig[activeSearchFilter.type].label : "Text search";
  const showSearchPill = searchPillValue.length > 0;
  const searchToggleLabel = searchOpen ? "Collapse search" : "Expand search";
  const searchListId = searchListIdRef.current;
  const showEmptySuggestions = searchOpen && searchInput.trim().length > 0 && suggestions.length === 0;

  const getRowForVersion = React.useCallback(
    (datasetName: string, versionIndex: number): TableRow => {
      const history = changeHistoryMap[datasetName] ?? [];
      if (versionIndex > 0) {
        const changeEntry = history[versionIndex - 1];
        if (changeEntry) {
          return cloneRow(changeEntry.row);
        }
      }
      const original = originalRowMapRef.current[datasetName];
      if (original) {
        return cloneRow(original);
      }
      const latest = rows.find(row => row.datasetName === datasetName);
      if (latest) {
        return cloneRow(latest);
      }
      return {
        datasetName,
        datasetSummary: "",
        dataOwner: "",
        dataOwnerRole: "",
        dgo: "",
        doSpoc: "",
        descriptionValidation: "",
        status: "on-track",
        deadline: "",
        detail: createEmptyDetail(datasetName),
      };
    },
    [changeHistoryMap, rows],
  );

  const datasetSourceRef = React.useRef({ table: tableSource, detail: detailSource });

  const closeDetail = React.useCallback(() => {
    setSelectedRow(null);
    setEditingRow(null);
    setSelectedDatasetName(null);
    setIsEditing(false);
  }, []);

  const openDetail = React.useCallback(
    (row: TableRow) => {
      const datasetName = row.datasetName;
      setSelectedDatasetName(datasetName);
      setActiveVersionMap(prev => ({
        ...prev,
        [datasetName]: 0,
      }));
      const baseRow = getRowForVersion(datasetName, 0);
      setSelectedRow(baseRow);
      setEditingRow(cloneRow(baseRow));
      setIsEditing(false);
    },
    [getRowForVersion],
  );

  const handleVersionChange = React.useCallback(
    (datasetName: string, versionIndex: number) => {
      setActiveVersionMap(prev => ({
        ...prev,
        [datasetName]: versionIndex,
      }));
      if (!isEditing) {
        const nextRow = getRowForVersion(datasetName, versionIndex);
        setSelectedRow(nextRow);
      }
    },
    [getRowForVersion, isEditing],
  );

  const enterDashboard = React.useCallback(() => {
    setIsLanding(false);
  }, []);

  const goHome = React.useCallback(() => {
    closeDetail();
    setStatusFilter("all");
    setDgoFilter("all");
    clearSearch();
    setIsLanding(true);
  }, [clearSearch, closeDetail]);

  const dgoFilterIdRef = React.useRef(`dgo-filter-${Math.random().toString(36).slice(2, 8)}`);
  const dgoFilterId = dgoFilterIdRef.current;

  React.useEffect(() => {
    if (datasetSourceRef.current.table === tableSource && datasetSourceRef.current.detail === detailSource) {
      return;
    }
    datasetSourceRef.current = { table: tableSource, detail: detailSource };
    const summaries = parseTableSummaries(tableSource);
    const details = parseDetailEntries(detailSource);
    const mergedRows = mergeRows(summaries, details);
    initialRowsRef.current = mergedRows;
    originalRowMapRef.current = buildRowMap(mergedRows);
    setRows(mergedRows);
    setDeadlineMap(buildDeadlineMap(mergedRows));
    setSelectedRow(null);
    setEditingRow(null);
    setIsEditing(false);
    setSelectedDatasetName(null);
    setActiveVersionMap({});
    const refreshedHistory = parseChangeRequestJson(changeHistorySourceRef.current, originalRowMapRef.current);
    initialChangeHistoryRef.current = refreshedHistory;
    setChangeHistoryMap(refreshedHistory);
  }, [tableSource, detailSource]);

  React.useEffect(() => {
    const nextSource = changeRequestJson ?? "";
    if (changeHistorySourceRef.current === nextSource) {
      return;
    }
    changeHistorySourceRef.current = nextSource;
    const parsed = parseChangeRequestJson(nextSource, originalRowMapRef.current);
    initialChangeHistoryRef.current = parsed;
    setChangeHistoryMap(parsed);
    if (!selectedDatasetName) {
      return;
    }
    const versions = parsed[selectedDatasetName] ?? [];
    const boundedIndex = Math.min(activeVersionIndex, versions.length);
    setActiveVersionMap(prev => ({
      ...prev,
      [selectedDatasetName]: boundedIndex,
    }));
    if (!isEditing) {
      const nextRow = getRowForVersion(selectedDatasetName, boundedIndex);
      setSelectedRow(nextRow);
    }
  }, [changeRequestJson, selectedDatasetName, activeVersionIndex, isEditing, getRowForVersion]);

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
      const searchMatches = rowMatchesSearch(row);
      return statusMatches && dgoMatches && searchMatches;
    });
  }, [dgoFilter, rowMatchesSearch, rows, statusFilter]);

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

  const isFiltered = statusFilter !== "all" || dgoFilter !== "all" || hasSearch;

  const portfolioRiskTotal = totals.atRisk + totals.blocked;
  const totalCoveragePoints = React.useMemo(
    () => rows.reduce((sum, row) => sum + row.detail.coverageMetric.coverageCount, 0),
    [rows],
  );
  const uniqueDomains = React.useMemo(() => new Set(rows.map(row => row.detail.domain)).size, [rows]);
  const portfolioNextDeadline = React.useMemo(() => {
    const upcoming = rows
      .map(row => {
        const deadlineValue = deadlineMap[row.datasetName] ?? row.deadline ?? "";
        return {
          value: deadlineValue,
          sortKey: new Date(deadlineValue).getTime(),
        };
      })
      .filter(item => Boolean(item.value) && !Number.isNaN(item.sortKey))
      .sort((a, b) => a.sortKey - b.sortKey);
    if (upcoming.length === 0) {
      return "Not scheduled";
    }
    const nextValue = upcoming[0].value ?? "";
    return nextValue ? formatDate(nextValue) : "Not scheduled";
  }, [deadlineMap, rows]);
  const landingHighlights = React.useMemo(
    () => [
      {
        label: "Curated datasets",
        value: totals.total.toString(),
        detail: `${uniqueDomains} strategic domains`,
      },
      {
        label: "Risk & blocked",
        value: portfolioRiskTotal.toString(),
        detail: `${totals.atRisk} at risk | ${totals.blocked} blocked`,
      },
      {
        label: "Coverage points",
        value: totalCoveragePoints.toLocaleString(),
        detail: "Records under governance",
      },
      {
        label: "Next checkpoint",
        value: portfolioNextDeadline,
        detail: "Governance council review",
      },
    ],
    [portfolioNextDeadline, portfolioRiskTotal, totalCoveragePoints, totals.atRisk, totals.blocked, totals.total, uniqueDomains],
  );

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
        detail: `${filteredSummary.atRisk} at risk | ${filteredSummary.blocked} blocked`,
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
    if (!editingRow) {
      return;
    }
    const canonicalName = selectedDatasetName ?? editingRow.datasetName;
    const updatedRow = cloneRow(editingRow);
    const existingHistory = changeHistoryMap[canonicalName] ?? [];
    const nextVersionNumber = existingHistory.length === 0 ? 1 : existingHistory[existingHistory.length - 1].version + 1;
    const timestamp = new Date().toISOString();
    const nextEntry: ChangeVersion = {
      version: nextVersionNumber,
      submittedAt: timestamp,
      row: cloneRow(updatedRow),
    };
    const canonicalHistory = [...existingHistory, nextEntry];
    const renamed = canonicalName !== updatedRow.datasetName;
    const nextHistoryMap: Record<string, ChangeVersion[]> = {
      ...changeHistoryMap,
      [canonicalName]: canonicalHistory,
    };
    if (renamed) {
      delete nextHistoryMap[canonicalName];
      nextHistoryMap[updatedRow.datasetName] = canonicalHistory;
    }

    setChangeHistoryMap(nextHistoryMap);

    setRows(prev =>
      prev.map(row => (row.datasetName === canonicalName ? cloneRow(updatedRow) : row)),
    );

    setDeadlineMap(prev => {
      const next = { ...prev };
      const nextDeadline = updatedRow.deadline ?? "";
      delete next[canonicalName];
      next[updatedRow.datasetName] = nextDeadline;
      return next;
    });

    if (renamed) {
      const originalEntry = originalRowMapRef.current[canonicalName];
      if (originalEntry) {
        delete originalRowMapRef.current[canonicalName];
        originalRowMapRef.current[updatedRow.datasetName] = originalEntry;
      }
    }

    setSelectedRow(cloneRow(updatedRow));
    setEditingRow(null);
    setIsEditing(false);

    setSelectedDatasetName(updatedRow.datasetName);
    setActiveVersionMap(prev => {
      const next = { ...prev, [updatedRow.datasetName]: canonicalHistory.length };
      if (renamed) {
        delete next[canonicalName];
      }
      return next;
    });

    const serialised = serialiseChangeRequest(nextHistoryMap);
    changeHistorySourceRef.current = serialised;
    initialChangeHistoryRef.current = nextHistoryMap;
    if (onChangeRequestUpdate) {
      onChangeRequestUpdate(serialised);
    }
  }, [changeHistoryMap, editingRow, onChangeRequestUpdate, selectedDatasetName]);

  const headerLabel = subtitle || "Data governance portfolio";
  const heading = title || "Strategic datasets readiness";
  const filterBarLabel = `${headerLabel}: ${heading} filters`;
  const filterMetricLabel = `${filteredSummary.total} of ${totals.total} datasets currently in view`;
  const trimmedUserName = userName?.trim();
  const displayName = trimmedUserName && trimmedUserName.length > 0 ? trimmedUserName : "Data Steward";
  const changeHistoryEntries = selectedDatasetName ? changeHistoryMap[selectedDatasetName] ?? [] : [];
  const activeChangeEntry = activeVersionIndex > 0 ? changeHistoryEntries[activeVersionIndex - 1] : undefined;
  const viewingBadge = activeVersionIndex === 0 ? "Original" : `Version ${activeChangeEntry?.version ?? activeVersionIndex}`;
  const viewingTimestampLabel = activeVersionIndex === 0 ? "Recorded from source" : formatTimestamp(activeChangeEntry?.submittedAt ?? "");

  const detailRow = isEditing && editingRow ? editingRow : selectedRow;
  const detailTitleId = detailRow ? `dataset-detail-${toSlug(detailRow.datasetName)}` : undefined;

  return (
    <div className="dt-app-shell">
      <header className="dt-app-header" aria-label="Data Trust navigation">
        <div className="dt-app-brand">
          <img className="dt-app-logo" src={logoAsset} alt="Data Trust shield" />
          <div className="dt-app-heading">
            <p className="dt-app-eyebrow">{headerLabel}</p>
            <h1 className="dt-app-title">{heading}</h1>
          </div>
        </div>
        <div className="dt-app-user">
          <div className="dt-app-user-meta">
            <span className="dt-app-user-label">Signed in as</span>
            <span className="dt-app-user-name">{displayName}</span>
          </div>
          {!isLanding ? (
            <button type="button" className="dt-app-link" onClick={goHome}>
              Back to landing
            </button>
          ) : null}
        </div>
      </header>

      <main className="dt-app-content">
        {isLanding ? (
          <div className="dt-home">
            <article className="dt-card dt-home-hero">
              <div className="dt-home-hero-visual" aria-hidden="true">
                <img className="dt-home-logo" src={logoAsset} alt="" />
              </div>
              <div className="dt-home-hero-copy">
                <p className="dt-home-eyebrow">Data Trust Office</p>
                <h2 className="dt-home-title">Clarity and confidence for your strategic datasets</h2>
                <p className="dt-home-body">
                  Monitor readiness, unblock governance actions, and move critical data assets forward with confidence.
                </p>
                <div className="dt-home-actions">
                  <button type="button" className="dt-home-button dt-home-button--primary" onClick={enterDashboard}>
                    DGO Login
                  </button>
                  <button type="button" className="dt-home-button" onClick={enterDashboard}>
                    Data Owner Login
                  </button>
                </div>
              </div>
            </article>
            <section className="dt-home-highlights" aria-label="Portfolio snapshot">
              {landingHighlights.map(item => (
                <article className="dt-home-highlight" key={item.label}>
                  <p className="dt-home-highlight-label">{item.label}</p>
                  <p className="dt-home-highlight-value">{item.value}</p>
                  <p className="dt-home-highlight-detail">{item.detail}</p>
                </article>
              ))}
            </section>
          </div>
        ) : (
          <>
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
                  <div className="dt-filter-search" data-open={searchOpen} ref={searchContainerRef}>
                    <button
                      type="button"
                      className="dt-filter-search-toggle"
                      onClick={handleSearchToggle}
                      aria-label={searchToggleLabel}
                      aria-expanded={searchOpen}
                      aria-controls={searchOpen && suggestions.length > 0 ? searchListId : undefined}
                    >
                      <svg className="dt-filter-search-toggle-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path
                          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l4.25 4.24a1 1 0 0 0 1.42-1.42L15.5 14zm-5 0a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    {searchOpen ? (
                      <div className="dt-filter-search-field">
                        <input
                          ref={searchInputRef}
                          type="text"
                          className="dt-filter-search-input"
                          placeholder="Search datasets, domains, owners..."
                          value={searchInput}
                          onChange={handleSearchInputChange}
                          onKeyDown={handleSearchKeyDown}
                          aria-controls={suggestions.length > 0 ? searchListId : undefined}
                        />
                        {searchInput.trim().length > 0 || activeSearchFilter ? (
                          <button
                            type="button"
                            className="dt-filter-search-clear"
                            onClick={resetSearchInput}
                            aria-label="Clear search text"
                          >
                            Clear
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                    {searchOpen ? (
                      suggestions.length > 0 ? (
                        <ul className="dt-filter-search-suggestions" role="listbox" id={searchListId}>
                          {suggestions.map(entry => (
                            <li key={`${entry.type}-${entry.value}`}>
                              <button type="button" className="dt-filter-search-option" onClick={() => handleSuggestionSelect(entry)}>
                                <span className={`dt-filter-search-icon dt-filter-search-icon--${entry.type}`}>
                                  {searchTypeConfig[entry.type].shortLabel}
                                </span>
                                <span className="dt-filter-search-option-copy">
                                  <span className="dt-filter-search-option-text">{entry.value}</span>
                                  <span className="dt-filter-search-context">{searchTypeConfig[entry.type].label}</span>
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : showEmptySuggestions ? (
                        <div className="dt-filter-search-empty">No matches found</div>
                      ) : null
                    ) : null}
                  </div>
                  {showSearchPill ? (
                    <div
                      className="dt-filter-search-pill"
                      role="status"
                      aria-label={`Search filtered by ${searchPillLabel}: ${searchPillValue}`}
                    >
                      <span className={`dt-filter-search-icon dt-filter-search-icon--${searchPillType}`}>
                        {searchPillBadge}
                      </span>
                      <span className="dt-filter-search-pill-text">{searchPillValue}</span>
                      <button
                        type="button"
                        className="dt-filter-search-pill-clear"
                        onClick={clearSearch}
                        aria-label="Clear search filter"
                      >
                        ×
                      </button>
                    </div>
                  ) : null}
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
                      clearSearch();
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
            </div>

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
                      <div className="dt-detail-header-context" aria-live="polite">
                        <span className="dt-detail-badge">{viewingBadge}</span>
                        <span className="dt-detail-context">{viewingTimestampLabel}</span>
                      </div>
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
            {selectedDatasetName && changeHistoryEntries.length > 0 ? (
              <aside className="dt-detail-history" aria-label="Change history">
                <h3 className="dt-detail-history-title">Change history</h3>
                <ul className="dt-detail-history-list">
                  <li>
                    <button
                      type="button"
                      className="dt-detail-history-item"
                      data-active={activeVersionIndex === 0}
                      onClick={() => handleVersionChange(selectedDatasetName, 0)}
                      disabled={isEditing}
                    >
                      <span className="dt-detail-history-label">Original</span>
                      <span className="dt-detail-history-meta">Source of truth</span>
                    </button>
                  </li>
                  {changeHistoryEntries.map((entry, index) => {
                    const versionIndex = index + 1;
                    return (
                      <li key={`${entry.version}-${entry.submittedAt}`}>
                        <button
                          type="button"
                          className="dt-detail-history-item"
                          data-active={activeVersionIndex === versionIndex}
                          onClick={() => handleVersionChange(selectedDatasetName, versionIndex)}
                          disabled={isEditing && activeVersionIndex !== versionIndex}
                        >
                          <span className="dt-detail-history-label">Version {entry.version}</span>
                          <span className="dt-detail-history-meta">Saved {formatTimestamp(entry.submittedAt)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            ) : null}
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
                              <MultiselectComboBox
                                id={`${detailTitleId ?? toSlug(detailRow.datasetName)}-regions`}
                                ariaLabel="Select regions"
                                values={detailRow.detail.regions}
                                options={regionOptions}
                                onChange={next => updateEditingDetailField("regions", next)}
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
                              <MultiselectComboBox
                                id={`${detailTitleId ?? toSlug(detailRow.datasetName)}-languages`}
                                ariaLabel="Select languages"
                                values={detailRow.detail.languages}
                                options={languageOptions}
                                onChange={next => updateEditingDetailField("languages", next)}
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
          </>
        )}
      </main>
    </div>
  );
};

interface MultiselectComboBoxProps {
  id: string;
  ariaLabel: string;
  values: string[];
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (next: string[]) => void;
}

const MultiselectComboBox: React.FC<MultiselectComboBoxProps> = ({
  id,
  ariaLabel,
  values,
  options,
  placeholder,
  disabled,
  onChange,
}) => {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const normalisedValues = React.useMemo(() => values.map(value => value.trim()).filter(Boolean), [values]);

  const filteredOptions = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    return options
      .map(option => option.trim())
      .filter(Boolean)
      .filter(option => !normalisedValues.includes(option))
      .filter(option => option.toLowerCase().includes(search));
  }, [options, normalisedValues, query]);

  const commitValue = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || normalisedValues.includes(trimmed)) {
        setQuery("");
        return;
      }
      onChange([...normalisedValues, trimmed]);
      setQuery("");
    },
    [normalisedValues, onChange],
  );

  const removeValue = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      onChange(normalisedValues.filter(item => item !== trimmed));
    },
    [normalisedValues, onChange],
  );

  const closeList = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFocus = React.useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleBlur = React.useCallback(() => {
    window.setTimeout(() => {
      setIsOpen(false);
    }, 120);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const candidate = filteredOptions[0] ?? query;
        commitValue(candidate);
        closeList();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeList();
      } else if (event.key === "ArrowDown" && filteredOptions.length > 0) {
        setIsOpen(true);
      } else if (event.key === "Backspace" && !query && normalisedValues.length > 0) {
        event.preventDefault();
        removeValue(normalisedValues[normalisedValues.length - 1]);
      }
    },
    [closeList, commitValue, filteredOptions, normalisedValues, query, removeValue],
  );

  const handleOptionMouseDown = React.useCallback(
    (option: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (disabled) {
        return;
      }
      commitValue(option);
      closeList();
      inputRef.current?.focus();
    },
    [closeList, commitValue, disabled],
  );

  const placeholderText = placeholder ?? "Search";
  const listboxId = `${id}-list`;

  return (
    <div
      className="dt-combobox"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen && filteredOptions.length > 0}
      aria-owns={listboxId}
      data-disabled={disabled ? "true" : undefined}
    >
      <div className="dt-combobox-control" onClick={() => inputRef.current?.focus()}>
        {normalisedValues.map(value => (
          <span className="dt-combobox-chip" key={value}>
            {value}
            <button
              type="button"
              className="dt-combobox-chip-remove"
              onClick={() => removeValue(value)}
              aria-label={`Remove ${value}`}
              disabled={disabled}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          ref={inputRef}
          className="dt-combobox-input"
          type="text"
          aria-label={ariaLabel}
          value={query}
          placeholder={normalisedValues.length === 0 ? placeholderText : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={event => {
            setQuery(event.target.value);
            if (!disabled) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      {isOpen && filteredOptions.length > 0 ? (
        <ul className="dt-combobox-list" id={listboxId} role="listbox">
          {filteredOptions.map(option => (
            <li key={option}>
              <button
                type="button"
                className="dt-combobox-option"
                onMouseDown={handleOptionMouseDown(option)}
                disabled={disabled}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
