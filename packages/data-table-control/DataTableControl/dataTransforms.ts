import { defaultDetailData, defaultDetailMap, defaultTableData } from "./data";
import { cloneDetail, cloneDetailMap, cloneRow, createEmptyDetail, normaliseStatus } from "./helpers";
import type {
  ChangeVersion,
  CoverageMetric,
  DataObjectsAndMeasure,
  DatasetDetail,
  DetailEntry,
  StatusVariant,
  TableRow,
  TableSummary,
} from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

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

export const parseTableSummaries = (dataJson?: string | null): TableSummary[] => {
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

export const parseDetailEntries = (dataJson?: string | null): Record<string, DatasetDetail> => {
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

export const mergeRows = (summaries: TableSummary[], detailMap: Record<string, DatasetDetail>): TableRow[] =>
  summaries.map(summary => ({
    ...summary,
    detail: cloneDetail(detailMap[summary.datasetName] ?? defaultDetailMap[summary.datasetName] ?? createEmptyDetail(summary.datasetName)),
  }));

export const parseCommaSeparated = (value: string) =>
  value
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

export const parseLineSeparated = (value: string) =>
  value
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);

export const parseOptionList = (source: string, fallback: string[]): string[] => {
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

export const buildRowMap = (rows: TableRow[]): Record<string, TableRow> => {
  const result: Record<string, TableRow> = {};
  rows.forEach(row => {
    result[row.datasetName] = cloneRow(row);
  });
  return result;
};

export const buildDeadlineMap = (sourceRows: TableRow[]): Record<string, string> => {
  const next: Record<string, string> = {};
  sourceRows.forEach(row => {
    next[row.datasetName] = row.deadline;
  });
  return next;
};

export const serialiseChangeRequest = (map: Record<string, ChangeVersion[]>): string =>
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

export const parseChangeRequestJson = (source: string, rowMap: Record<string, TableRow>): Record<string, ChangeVersion[]> => {
  if (!source) {
    return {};
  }
  try {
    const data: unknown = JSON.parse(source);
    if (!isRecord(data)) {
      return {};
    }
    const datasets = isRecord(data.datasets) ? data.datasets : {};
    const result: Record<string, ChangeVersion[]> = {};
    Object.keys(datasets).forEach(key => {
      const historySource = datasets[key];
      if (!Array.isArray(historySource)) {
        return;
      }
      const fallbackRow = rowMap[key];
      const history: ChangeVersion[] = [];
      historySource.forEach(item => {
        const entry = sanitiseChangeVersion(item, fallbackRow);
        if (entry) {
          history.push(entry);
        }
      });
      if (history.length > 0) {
        result[key] = history.sort((a, b) => a.version - b.version);
      }
    });
    return result;
  } catch (error) {
    return {};
  }
};
