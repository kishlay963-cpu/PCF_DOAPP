export type StatusVariant = "on-track" | "at-risk" | "blocked";

export interface CoverageMetric {
  coverageCount: number;
  dataFrequency: string;
  dataTypes: string;
  geography: string;
  history: string;
}

export interface DataObjectsAndMeasure {
  costScore: number;
  fundamentalsScore: number;
  overallScore: number;
  performanceScore: number;
  riskScore: number;
  sentimentScore: number;
  technicalScore: number;
  valuationsScore: number;
}

export interface DatasetDetail {
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

export interface ChangeVersion {
  version: number;
  submittedAt: string;
  row: TableRow;
}

export type SearchType = "dataset" | "domain" | "subdomain" | "owner" | "dgo" | "spoc";

export interface SearchEntry {
  type: SearchType;
  value: string;
  searchValue: string;
}
