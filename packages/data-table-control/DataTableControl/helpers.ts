import type { DatasetDetail, StatusVariant, TableRow } from "./types";

export const toSlug = (value: string) => value.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();

export const cloneDetail = (detail: DatasetDetail): DatasetDetail => ({
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

export const cloneRow = (row: TableRow): TableRow => ({
  ...row,
  detail: cloneDetail(row.detail),
});

export const cloneDetailMap = (source: Record<string, DatasetDetail>): Record<string, DatasetDetail> => {
  const result: Record<string, DatasetDetail> = {};
  Object.keys(source).forEach(key => {
    result[key] = cloneDetail(source[key]);
  });
  return result;
};

export const createEmptyDetail = (datasetName: string): DatasetDetail => ({
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

export const normaliseStatus = (value: unknown, fallback?: StatusVariant): StatusVariant => {
  if (value === "on-track" || value === "at-risk" || value === "blocked") {
    return value;
  }
  if (fallback === "on-track" || fallback === "at-risk" || fallback === "blocked") {
    return fallback;
  }
  return "on-track";
};

export const normaliseText = (value: string | null | undefined) => (value ?? "").trim().toLowerCase();
