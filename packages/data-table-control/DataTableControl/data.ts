import { cloneDetail } from "./helpers";
import type { DatasetDetail, DetailEntry, TableRow, TableSummary } from "./types";

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
      description:
        "Comprehensive trade execution dataset harmonised across LSEG order books and partner venues for post-trade analytics and regulatory review.",
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
      description:
        "Unified ESG scoring vault consolidating issuer scores, controversy screens, and fund-level sustainability analytics.",
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
      description:
        "Calibrated sovereign yield curves with spline smoothing, benchmark spreads, and volatility overlays for risk and valuation teams.",
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
      description:
        "Surveillance dataset delivering ML-prioritised alerts, related meta-data, and case progression context for compliance teams.",
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

export const defaultTableData: TableSummary[] = defaultRows.map(({ detail, ...summary }) => ({
  ...summary,
}));

export const defaultDetailData: DetailEntry[] = defaultRows.map(row => ({
  datasetName: row.datasetName,
  detail: cloneDetail(row.detail),
}));

export const defaultDetailMap: Record<string, DatasetDetail> = defaultDetailData.reduce(
  (acc, entry) => {
    acc[entry.datasetName] = cloneDetail(entry.detail);
    return acc;
  },
  {} as Record<string, DatasetDetail>,
);

export const defaultRegions = Array.from(
  new Set(
    defaultDetailData.flatMap(entry => entry.detail.regions).map(region => region.trim()).filter(Boolean),
  ),
).sort();

export const defaultLanguages = Array.from(
  new Set(
    defaultDetailData.flatMap(entry => entry.detail.languages).map(language => language.trim()).filter(Boolean),
  ),
).sort();
