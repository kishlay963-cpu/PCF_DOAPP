import type { DataObjectsAndMeasure, SearchType, StatusVariant } from "./types";

export const searchTypeOrder: SearchType[] = ["dataset", "domain", "subdomain", "owner", "dgo", "spoc"];

export const searchTypeConfig: Record<SearchType, { label: string; shortLabel: string }> = {
  dataset: { label: "Dataset", shortLabel: "DST" },
  domain: { label: "Domain", shortLabel: "DOM" },
  subdomain: { label: "Subdomain", shortLabel: "SUB" },
  owner: { label: "Data owner", shortLabel: "OWN" },
  dgo: { label: "Data group", shortLabel: "DGO" },
  spoc: { label: "SPOC", shortLabel: "POC" },
};

export const statusCopy: Record<StatusVariant, { label: string; description: string }> = {
  "on-track": {
    label: "On track",
    description: "Delivery aligned; next checkpoint in weekly steering.",
  },
  "at-risk": {
    label: "At risk",
    description: "Action required: validate dependencies before freeze.",
  },
  blocked: {
    label: "Blocked",
    description: "Escalated to DGO leadership for unblock.",
  },
};

export const statusOptions: { value: StatusVariant | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on-track", label: "On track" },
  { value: "at-risk", label: "At risk" },
  { value: "blocked", label: "Blocked" },
];

export const scoreLabels: Record<keyof DataObjectsAndMeasure, string> = {
  costScore: "Cost",
  fundamentalsScore: "Fundamentals",
  overallScore: "Overall",
  performanceScore: "Performance",
  riskScore: "Risk",
  sentimentScore: "Sentiment",
  technicalScore: "Technical",
  valuationsScore: "Valuations",
};

export const scoreOrder: (keyof DataObjectsAndMeasure)[] = [
  "overallScore",
  "performanceScore",
  "riskScore",
  "valuationsScore",
  "fundamentalsScore",
  "technicalScore",
  "sentimentScore",
  "costScore",
];
