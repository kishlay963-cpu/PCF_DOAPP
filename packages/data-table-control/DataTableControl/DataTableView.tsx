import * as React from "react";
import { defaultLanguages, defaultRegions } from "./data";
import { cloneRow, createEmptyDetail, normaliseText, toSlug } from "./helpers";
import type {
  ChangeVersion,
  CoverageMetric,
  DataObjectsAndMeasure,
  DatasetDetail,
  SearchEntry,
  SearchType,
  StatusVariant,
  TableRow,
} from "./types";
import { searchTypeConfig, scoreLabels, scoreOrder, statusCopy } from "./constants";
import { buildSearchIndex } from "./search";
import {
  buildDeadlineMap,
  buildRowMap,
  mergeRows,
  parseChangeRequestJson,
  parseDetailEntries,
  parseOptionList,
  parseTableSummaries,
  serialiseChangeRequest,
} from "./dataTransforms";
import { formatDate, formatTimestamp } from "./formatters";
import { DatasetTable } from "./components/DatasetTable";
import type { DatasetRowMetadata } from "./components/DatasetTable";
import { DetailPanel } from "./components/DetailPanel";
import { FilterBar, SearchUiHandlers, SearchUiState } from "./components/FilterBar";
import { LandingHighlight, LandingView } from "./components/LandingView";
import { KpiCard, KpiGrid } from "./components/KpiGrid";
import type { ComparisonSection } from "./components/ComparisonView";

const logoSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title desc">
  <title id="title">Data Trust Shield</title>
  <desc id="desc">Stylised shield surrounding a listening head silhouette</desc>
  <defs>
    <linearGradient id="shield" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#4F6BFF" />
      <stop offset="100%" stop-color="#001EFF" />
    </linearGradient>
    <linearGradient id="lines" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7FA9FF" />
      <stop offset="100%" stop-color="#1634FF" />
    </linearGradient>
  </defs>
  <path fill="url(#shield)" d="M64 8l40 12v36c0 27.6-18.6 52.2-40 60-21.4-7.8-40-32.4-40-60V20z" />
  <circle cx="64" cy="56" r="20" fill="#FFFFFF" opacity="0.85" />
  <path fill="none" stroke="url(#lines)" stroke-width="4" stroke-linecap="round" d="M44 60c8-6 16-6 24 0s16 6 24 0" />
  <circle cx="70" cy="52" r="6" fill="#001EFF" />
</svg>`;

const logoAsset = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvgMarkup)}`;

type ComparisonSectionId =
  | "header"
  | "metrics"
  | "overview"
  | "stewardship"
  | "coverage"
  | "scores"
  | "features"
  | "distribution"
  | "access";

interface ComparisonFieldSpec {
  key: string;
  label: string;
  section: ComparisonSectionId;
  getter: (row: TableRow) => string;
}

const comparisonSectionMeta: Record<ComparisonSectionId, { title: string }> = {
  header: { title: "Portfolio summary" },
  metrics: { title: "Readiness metrics" },
  overview: { title: "Narrative & classification" },
  stewardship: { title: "Stewardship & governance" },
  coverage: { title: "Coverage metric" },
  scores: { title: "Data objects & measures" },
  features: { title: "Features & benefits" },
  distribution: { title: "Distribution & localisation" },
  access: { title: "Commercial & access" },
};

const comparisonSectionOrder: ComparisonSectionId[] = [
  "header",
  "metrics",
  "overview",
  "stewardship",
  "coverage",
  "scores",
  "features",
  "distribution",
  "access",
];

const joinList = (values: string[]) => values.join(", ");
const joinLines = (values: string[]) => values.join("\n");

const buildComparisonFieldSpec = (): ComparisonFieldSpec[] => {
  const baseSpec: ComparisonFieldSpec[] = [
    { key: "datasetName", label: "Dataset name", section: "header", getter: row => row.datasetName },
    { key: "datasetSummary", label: "Summary", section: "header", getter: row => row.datasetSummary },
    { key: "businessUnit", label: "Business unit", section: "header", getter: row => row.detail.businessUnit },
    { key: "coverageCount", label: "Coverage count", section: "metrics", getter: row => row.detail.coverageCount.toLocaleString() },
    { key: "dataFrequency", label: "Data frequency", section: "metrics", getter: row => row.detail.dataFrequency },
    { key: "timePeriod", label: "Time period", section: "metrics", getter: row => row.detail.timePeriod },
    {
      key: "minimumDataFrequency",
      label: "Minimum frequency",
      section: "metrics",
      getter: row => row.detail.minimumDataFrequency,
    },
    { key: "overviewDescription", label: "Narrative overview", section: "overview", getter: row => row.detail.description },
    { key: "domain", label: "Domain", section: "overview", getter: row => row.detail.domain },
    { key: "subdomain", label: "Subdomain", section: "overview", getter: row => row.detail.subdomain },
    { key: "history", label: "History", section: "overview", getter: row => row.detail.history },
    { key: "dataTypes", label: "Data types", section: "overview", getter: row => joinLines(row.detail.dataTypes) },
    {
      key: "status",
      label: "Status",
      section: "stewardship",
      getter: row => statusCopy[row.status].label,
    },
    { key: "descriptionValidation", label: "Readiness notes", section: "stewardship", getter: row => row.descriptionValidation },
    { key: "dataOwner", label: "Data owner", section: "stewardship", getter: row => row.dataOwner },
    { key: "dataOwnerRole", label: "Owner role", section: "stewardship", getter: row => row.dataOwnerRole },
    { key: "dgo", label: "Data governance office", section: "stewardship", getter: row => row.dgo },
    { key: "doSpoc", label: "DO SPOC", section: "stewardship", getter: row => row.doSpoc },
    { key: "deadline", label: "Target deadline", section: "stewardship", getter: row => formatDate(row.deadline) },
    {
      key: "coverageMetric.coverageCount",
      label: "Coverage metric · Count",
      section: "coverage",
      getter: row => row.detail.coverageMetric.coverageCount.toLocaleString(),
    },
    {
      key: "coverageMetric.dataFrequency",
      label: "Coverage metric · Frequency",
      section: "coverage",
      getter: row => row.detail.coverageMetric.dataFrequency,
    },
    {
      key: "coverageMetric.dataTypes",
      label: "Coverage metric · Data types",
      section: "coverage",
      getter: row => row.detail.coverageMetric.dataTypes,
    },
    {
      key: "coverageMetric.geography",
      label: "Coverage metric · Geography",
      section: "coverage",
      getter: row => row.detail.coverageMetric.geography,
    },
    {
      key: "coverageMetric.history",
      label: "Coverage metric · History",
      section: "coverage",
      getter: row => row.detail.coverageMetric.history,
    },
    {
      key: "features",
      label: "Features & benefits",
      section: "features",
      getter: row => joinLines(row.detail.features),
    },
    {
      key: "regions",
      label: "Regions",
      section: "distribution",
      getter: row => joinList(row.detail.regions),
    },
    {
      key: "geography",
      label: "Geography coverage",
      section: "distribution",
      getter: row => joinList(row.detail.geography),
    },
    {
      key: "languages",
      label: "Languages",
      section: "distribution",
      getter: row => joinList(row.detail.languages),
    },
    {
      key: "tags",
      label: "Tags",
      section: "distribution",
      getter: row => joinList(row.detail.tags),
    },
    {
      key: "marketingUrl",
      label: "Marketing site",
      section: "access",
      getter: row => row.detail.marketingUrl,
    },
    {
      key: "minimumCadence",
      label: "Minimum cadence",
      section: "access",
      getter: row => row.detail.minimumDataFrequency,
    },
  ];

  const scoreSpec: ComparisonFieldSpec[] = scoreOrder.map(key => ({
    key: `score.${key}`,
    label: `${scoreLabels[key]}`,
    section: "scores",
    getter: row => row.detail.dataObjectsAndMeasure[key].toString(),
  }));

  return [...baseSpec, ...scoreSpec];
};

const comparisonFieldSpec = buildComparisonFieldSpec();

const deriveApprovedRows = (baseRows: TableRow[], historyMap: Record<string, ChangeVersion[]>): TableRow[] => {
  const entryMap = new Map<string, { index: number; row: TableRow }>();
  baseRows.forEach((row, index) => {
    entryMap.set(row.datasetName, { index, row: cloneRow(row) });
  });

  const additionalRows: TableRow[] = [];

  Object.entries(historyMap).forEach(([key, history]) => {
    const approvedEntries = history.filter(entry => entry.status === "approved");
    if (approvedEntries.length === 0) {
      return;
    }
    const latestApproved = approvedEntries[approvedEntries.length - 1];
    const updatedRow = cloneRow(latestApproved.row);
    const existing = entryMap.get(key);
    if (existing) {
      entryMap.delete(key);
      entryMap.set(updatedRow.datasetName, { index: existing.index, row: updatedRow });
    } else {
      additionalRows.push(updatedRow);
    }
  });

  const orderedEntries = Array.from(entryMap.values()).sort((a, b) => a.index - b.index).map(entry => entry.row);

  if (additionalRows.length > 0) {
    additionalRows
      .sort((a, b) => a.datasetName.localeCompare(b.datasetName))
      .forEach(row => {
        orderedEntries.push(cloneRow(row));
      });
  }

  return orderedEntries;
};

const buildComparisonData = (
  baseline: TableRow | null,
  candidate: TableRow | null,
): { sections: ComparisonSection[]; fieldDiff: Record<string, boolean>; sectionDiff: Record<string, boolean> } => {
  if (!baseline || !candidate) {
    const emptySections: ComparisonSection[] = comparisonSectionOrder.map(section => ({
      id: section,
      title: comparisonSectionMeta[section].title,
      rows: [],
    }));
    return { sections: emptySections, fieldDiff: {}, sectionDiff: {} };
  }

  const rowsBySection = new Map<ComparisonSectionId, ComparisonSection["rows"]>();
  comparisonSectionOrder.forEach(section => {
    rowsBySection.set(section, []);
  });

  const fieldDiff: Record<string, boolean> = {};
  const sectionDiff: Record<string, boolean> = {};

  comparisonFieldSpec.forEach(spec => {
    const baselineValue = spec.getter(baseline);
    const candidateValue = spec.getter(candidate);
    const changed = baselineValue !== candidateValue;
    fieldDiff[spec.key] = changed;
    if (changed) {
      sectionDiff[spec.section] = true;
    } else {
      sectionDiff[spec.section] ??= false;
    }
    const sectionRows = rowsBySection.get(spec.section);
    if (sectionRows) {
      sectionRows.push({
        key: spec.key,
        label: spec.label,
        baseline: baselineValue,
        target: candidateValue,
        changed,
      });
    }
  });

  const sections: ComparisonSection[] = comparisonSectionOrder.map(section => ({
    id: section,
    title: comparisonSectionMeta[section].title,
    rows: rowsBySection.get(section) ?? [],
  }));

  return { sections, fieldDiff, sectionDiff };
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

  const initialRows = React.useMemo(() => {
    const initialSummaries = parseTableSummaries(tableSource);
    const initialDetails = parseDetailEntries(detailSource);
    return mergeRows(initialSummaries, initialDetails);
  }, [detailSource, tableSource]);

  const baselineRowMapRef = React.useRef<Record<string, TableRow>>(buildRowMap(initialRows));

  const parsedRegionOptions = React.useMemo(() => parseOptionList(regionOptionsJson ?? "", defaultRegions), [regionOptionsJson]);
  const parsedLanguageOptions = React.useMemo(() => parseOptionList(languageOptionsJson ?? "", defaultLanguages), [languageOptionsJson]);

  const regionOptions = React.useMemo(() => {
    const fromData = initialRows.flatMap(row => row.detail.regions);
    return Array.from(new Set([...parsedRegionOptions, ...fromData]))
      .map(item => item.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [initialRows, parsedRegionOptions]);

  const languageOptions = React.useMemo(() => {
    const fromData = initialRows.flatMap(row => row.detail.languages);
    return Array.from(new Set([...parsedLanguageOptions, ...fromData]))
      .map(item => item.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [initialRows, parsedLanguageOptions]);

  const initialChangeHistoryRef = React.useRef<Record<string, ChangeVersion[]>>(
    parseChangeRequestJson(changeRequestJson ?? "", baselineRowMapRef.current),
  );

  const [changeHistoryMap, setChangeHistoryMap] = React.useState<Record<string, ChangeVersion[]>>(initialChangeHistoryRef.current);
  const changeHistorySourceRef = React.useRef(changeRequestJson ?? "");

  const approvedRowsSeedRef = React.useRef<TableRow[] | null>(null);
  approvedRowsSeedRef.current ??= deriveApprovedRows(initialRows, initialChangeHistoryRef.current);

  const [rows, setRows] = React.useState<TableRow[]>(approvedRowsSeedRef.current ?? initialRows);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSearchFilter, setActiveSearchFilter] = React.useState<SearchEntry | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const searchListIdRef = React.useRef(`dt-search-${Math.random().toString(36).slice(2, 8)}`);
  const [statusFilter, setStatusFilter] = React.useState<StatusVariant | "all">("all");
  const [dgoFilter, setDgoFilter] = React.useState<string>("all");
  const [deadlineMap, setDeadlineMap] = React.useState<Record<string, string>>(() =>
    buildDeadlineMap(approvedRowsSeedRef.current ?? initialRows),
  );


  const syncApprovedState = React.useCallback(
    (nextHistoryMap: Record<string, ChangeVersion[]>) => {
      const nextRows = deriveApprovedRows(rows, nextHistoryMap);
      setRows(nextRows);
      setDeadlineMap(buildDeadlineMap(nextRows));
      baselineRowMapRef.current = buildRowMap(nextRows);
      const serialised = serialiseChangeRequest(nextHistoryMap);
      changeHistorySourceRef.current = serialised;
      initialChangeHistoryRef.current = nextHistoryMap;
      if (onChangeRequestUpdate) {
        onChangeRequestUpdate(serialised);
      }
    },
    [onChangeRequestUpdate, rows],
  );
  const [selectedRow, setSelectedRow] = React.useState<TableRow | null>(null);
  const [editingRow, setEditingRow] = React.useState<TableRow | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLanding, setIsLanding] = React.useState(true);
  const [compareMode, setCompareMode] = React.useState<"inline" | "side-by-side">("inline");
  const [selectedDatasetName, setSelectedDatasetName] = React.useState<string | null>(null);
  const [activeVersionMap, setActiveVersionMap] = React.useState<Record<string, number>>({});
  const activeVersionIndex = selectedDatasetName ? activeVersionMap[selectedDatasetName] ?? 0 : 0;
  const dgoFilterIdRef = React.useRef(`dgo-filter-${Math.random().toString(36).slice(2, 8)}`);
  const trimmedUserName = userName?.trim();
  const displayName = trimmedUserName && trimmedUserName.length > 0 ? trimmedUserName : "Data Steward";

  const searchListId = searchListIdRef.current;
  const dgoFilterId = dgoFilterIdRef.current;

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

  const hasSearch = React.useMemo(() => activeSearchFilter !== null || searchQuery.trim().length > 0, [activeSearchFilter, searchQuery]);

  const searchPillValue = activeSearchFilter ? activeSearchFilter.value : searchQuery.trim();
  const searchPillType: SearchType | "query" = activeSearchFilter ? activeSearchFilter.type : "query";
  const searchPillBadge = activeSearchFilter ? searchTypeConfig[activeSearchFilter.type].shortLabel : "TXT";
  const searchPillLabel = activeSearchFilter ? searchTypeConfig[activeSearchFilter.type].label : "Text search";
  const showSearchPill = searchPillValue.length > 0;
  const searchToggleLabel = searchOpen ? "Collapse search" : "Expand search";
  const showEmptySuggestions = searchOpen && searchInput.trim().length > 0 && suggestions.length === 0;

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

  const filteredRows = React.useMemo(() => {
    return rows.filter(row => {
      if (statusFilter !== "all" && row.status !== statusFilter) {
        return false;
      }
      if (dgoFilter !== "all" && normaliseText(row.dgo) !== normaliseText(dgoFilter)) {
        return false;
      }
      return rowMatchesSearch(row);
    });
  }, [dgoFilter, rowMatchesSearch, rows, statusFilter]);

  const rowMetadata = React.useMemo<Record<string, DatasetRowMetadata>>(() => {
    const meta: Record<string, DatasetRowMetadata> = {};
    rows.forEach(row => {
      const history = changeHistoryMap[row.datasetName] ?? [];
      let pendingCount = 0;
      let latestPendingVersion: number | undefined;
      let latestApproved: ChangeVersion | undefined;
      history.forEach(entry => {
        if (entry.status === "approved") {
          if (!latestApproved || entry.version > latestApproved.version) {
            latestApproved = entry;
          }
        } else {
          pendingCount += 1;
          if (!latestPendingVersion || entry.version > latestPendingVersion) {
            latestPendingVersion = entry.version;
          }
        }
      });
      meta[row.datasetName] = {
        pendingCount,
        pendingLabel: pendingCount > 0 && latestPendingVersion ? `Pending v${latestPendingVersion}` : undefined,
        baselineLabel: latestApproved ? `Approved v${latestApproved.version}` : "Original dataset",
        hasApprovedBaseline: Boolean(latestApproved),
        approvedBy: latestApproved?.approval?.by,
        approvedAt: latestApproved?.approval?.at ?? latestApproved?.submittedAt,
      };
    });
    return meta;
  }, [changeHistoryMap, rows]);

  const dgoOptions = React.useMemo(() => {
    const values = new Set<string>();
    rows.forEach(row => {
      values.add(row.dgo);
    });
    return ["all", ...Array.from(values).sort((a, b) => a.localeCompare(b))];
  }, [rows]);

  const totals = React.useMemo(() => {
    const summary = {
      total: rows.length,
      onTrack: 0,
      atRisk: 0,
      blocked: 0,
    };
    rows.forEach(row => {
      if (row.status === "on-track") {
        summary.onTrack += 1;
      }
      if (row.status === "at-risk") {
        summary.atRisk += 1;
      }
      if (row.status === "blocked") {
        summary.blocked += 1;
      }
    });
    return summary;
  }, [rows]);

  const filteredSummary = React.useMemo(() => {
    const summary = {
      total: filteredRows.length,
      onTrack: 0,
      atRisk: 0,
      blocked: 0,
    };
    filteredRows.forEach(row => {
      if (row.status === "on-track") {
        summary.onTrack += 1;
      }
      if (row.status === "at-risk") {
        summary.atRisk += 1;
      }
      if (row.status === "blocked") {
        summary.blocked += 1;
      }
    });
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
      .filter(item => item.value && !Number.isNaN(item.sortKey))
      .sort((a, b) => a.sortKey - b.sortKey);
    if (upcoming.length === 0) {
      return "Not scheduled";
    }
    const nextValue = upcoming[0].value ?? "";
    return nextValue ? formatDate(nextValue) : "Not scheduled";
  }, [deadlineMap, rows]);

  const landingHighlights: LandingHighlight[] = React.useMemo(
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
      .filter(item => item.value && !Number.isNaN(item.sortKey))
      .sort((a, b) => a.sortKey - b.sortKey);
    return upcoming.length > 0 ? formatDate(upcoming[0].value ?? "") : "Not scheduled";
  }, [deadlineMap, filteredRows]);

  const kpiCards: KpiCard[] = React.useMemo(
    () => [
      {
        label: "In scope",
        value: filteredSummary.total.toString(),
        detail: `of ${totals.total} datasets`,
        accent: "brand",
      },
      {
        label: "On track",
        value: filteredSummary.onTrack.toString(),
        detail: "Steady delivery",
        accent: "emerald",
      },
      {
        label: "Needs attention",
        value: riskTotal.toString(),
        detail: `${filteredSummary.atRisk} at risk | ${filteredSummary.blocked} blocked`,
        accent: "amber",
      },
      {
        label: "Next deadline",
        value: nextDeadline,
        detail: `Blocked share ${blockedShare}%`,
        accent: "slate",
      },
    ],
    [blockedShare, filteredSummary.atRisk, filteredSummary.blocked, filteredSummary.onTrack, filteredSummary.total, nextDeadline, riskTotal, totals.total],
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

  const getRowForVersion = React.useCallback(
    (datasetName: string, versionIndex: number): TableRow => {
      const history = changeHistoryMap[datasetName] ?? [];
      if (versionIndex > 0) {
        const changeEntry = history[versionIndex - 1];
        if (changeEntry) {
          return cloneRow(changeEntry.row);
        }
      }
      const original = baselineRowMapRef.current[datasetName];
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
      const nextRow = getRowForVersion(datasetName, versionIndex);
      setSelectedRow(nextRow);
      setEditingRow(cloneRow(nextRow));
      setIsEditing(false);
    },
    [getRowForVersion],
  );

  const handleCompareModeChange = React.useCallback((mode: "inline" | "side-by-side") => {
    setCompareMode(mode);
  }, []);

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
    const datasetKey = selectedDatasetName ?? editingRow.datasetName;
    const updatedRow = cloneRow(editingRow);
    const existingHistory = changeHistoryMap[datasetKey] ?? [];
    const nextVersionNumber = existingHistory.length === 0 ? 1 : existingHistory[existingHistory.length - 1].version + 1;
    const timestamp = new Date().toISOString();
    const submitterName = displayName;
    const nextEntry: ChangeVersion = {
      version: nextVersionNumber,
      submittedAt: timestamp,
      submittedBy: submitterName,
      status: "pending",
      row: cloneRow(updatedRow),
    };
    const nextHistory = [...existingHistory, nextEntry];
    const nextHistoryMap: Record<string, ChangeVersion[]> = {
      ...changeHistoryMap,
      [datasetKey]: nextHistory,
    };

    setChangeHistoryMap(nextHistoryMap);
    syncApprovedState(nextHistoryMap);

    setSelectedRow(cloneRow(updatedRow));
    setEditingRow(null);
    setIsEditing(false);
    setSelectedDatasetName(datasetKey);
    setActiveVersionMap(prev => ({
      ...prev,
      [datasetKey]: nextHistory.length,
    }));
  }, [changeHistoryMap, displayName, editingRow, selectedDatasetName, syncApprovedState]);

  const handleApproveActiveVersion = React.useCallback(() => {
    if (!selectedDatasetName || activeVersionIndex === 0) {
      return;
    }
    const history = changeHistoryMap[selectedDatasetName];
    if (!history || history.length < activeVersionIndex) {
      return;
    }
    const changeIndex = activeVersionIndex - 1;
    const targetEntry = history[changeIndex];
    if (!targetEntry || targetEntry.status === "approved") {
      return;
    }
    const approvalTimestamp = new Date().toISOString();
    const approverName = displayName;
    const approvedEntry: ChangeVersion = {
      ...targetEntry,
      status: "approved",
      approval: {
        by: approverName,
        at: approvalTimestamp,
      },
    };
    const nextHistory = history.map((entry, index) => (index === changeIndex ? approvedEntry : entry));
    const nextHistoryMap: Record<string, ChangeVersion[]> = {
      ...changeHistoryMap,
      [selectedDatasetName]: nextHistory,
    };
    setChangeHistoryMap(nextHistoryMap);
    syncApprovedState(nextHistoryMap);

    const approvedRow = cloneRow(approvedEntry.row);
    setSelectedRow(approvedRow);
    setEditingRow(null);
    setIsEditing(false);
    setActiveVersionMap(prev => ({
      ...prev,
      [selectedDatasetName]: 0,
    }));
    setCompareMode("inline");
  }, [activeVersionIndex, changeHistoryMap, displayName, selectedDatasetName, setCompareMode, syncApprovedState]);

  const enterDashboard = React.useCallback(() => {
    setIsLanding(false);
  }, []);

  const goHome = React.useCallback(() => {
    setIsLanding(true);
    closeDetail();
  }, [closeDetail]);

  const headerLabel = subtitle || "Data governance portfolio";
  const heading = title || "Strategic datasets readiness";
  const filterBarLabel = `${headerLabel}: ${heading} filters`;
  const filterMetricLabel = `${filteredSummary.total} of ${totals.total} datasets currently in view`;
  const detailRow = isEditing && editingRow ? editingRow : selectedRow;
  const detailTitleId = detailRow ? `dataset-detail-${toSlug(detailRow.datasetName)}` : undefined;

  const baselineRow = React.useMemo(() => {
    if (!selectedDatasetName) {
      return null;
    }
    return baselineRowMapRef.current[selectedDatasetName] ?? rows.find(row => row.datasetName === selectedDatasetName) ?? null;
  }, [rows, selectedDatasetName]);

  const { sections: comparisonSections, fieldDiff, sectionDiff } = React.useMemo(() => buildComparisonData(baselineRow, detailRow), [baselineRow, detailRow]);

  const selectedMetadata = selectedDatasetName ? rowMetadata[selectedDatasetName] : undefined;
  const baselineLabel = selectedMetadata?.baselineLabel ?? "Original dataset";

  const changeHistoryEntries = selectedDatasetName ? changeHistoryMap[selectedDatasetName] ?? [] : [];
  const activeChangeEntry = activeVersionIndex > 0 ? changeHistoryEntries[activeVersionIndex - 1] : undefined;
  const viewingBadge = activeVersionIndex === 0 ? baselineLabel : `Version ${activeChangeEntry?.version ?? activeVersionIndex}`;
  const viewingTimestampLabel = activeVersionIndex === 0
    ? selectedMetadata?.approvedAt
      ? `Approved ${formatTimestamp(selectedMetadata.approvedAt)}`
      : "Recorded from source"
    : activeChangeEntry?.status === "approved"
      ? `Approved ${formatTimestamp(activeChangeEntry.approval?.at ?? activeChangeEntry.submittedAt)}`
      : `Submitted ${formatTimestamp(activeChangeEntry?.submittedAt ?? "")}`;
  const activeVersion = activeChangeEntry;
  const canApprove = activeVersionIndex > 0 && activeChangeEntry?.status !== "approved";
  const comparisonTargetLabel =
    activeVersionIndex === 0
      ? baselineLabel
      : `Version ${activeChangeEntry?.version ?? activeVersionIndex} (${activeChangeEntry?.status === "approved" ? "Approved" : "Pending"})`;

  const searchState: SearchUiState = {
    open: searchOpen,
    toggleLabel: searchToggleLabel,
    listId: searchListId,
    inputValue: searchInput,
    inputRef: searchInputRef,
    containerRef: searchContainerRef,
    suggestions,
    activeFilter: activeSearchFilter,
    showEmptySuggestions,
    pill: {
      visible: showSearchPill,
      value: searchPillValue,
      type: searchPillType,
      badge: searchPillBadge,
      label: searchPillLabel,
    },
  };

  const searchHandlers: SearchUiHandlers = {
    onToggle: handleSearchToggle,
    onInputChange: handleSearchInputChange,
    onInputKeyDown: handleSearchKeyDown,
    onResetInput: resetSearchInput,
    onSuggestionSelect: handleSuggestionSelect,
    onClearSearch: clearSearch,
  };

  const filtersAppliedLabel = isFiltered ? "Custom view" : "All datasets";

  const handleClearFilters = React.useCallback(() => {
    setStatusFilter("all");
    setDgoFilter("all");
    clearSearch();
  }, [clearSearch]);

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
          <LandingView logoAsset={logoAsset} highlights={landingHighlights} onEnter={enterDashboard} />
        ) : (
          <>
            <div className="flex w-full flex-col gap-6">
              <KpiGrid cards={kpiCards} />
              <FilterBar
                labelId={filterBarLabel}
                statusFilter={statusFilter}
                onStatusFilterChange={value => setStatusFilter(value)}
                dgoFilter={dgoFilter}
                onDgoFilterChange={value => setDgoFilter(value)}
                dgoOptions={dgoOptions}
                dgoSelectId={dgoFilterId}
                metricLabel={filterMetricLabel}
                filteredCount={filteredSummary.total}
                isFiltered={isFiltered}
                onClearFilters={handleClearFilters}
                searchState={searchState}
                searchHandlers={searchHandlers}
              />
              <DatasetTable
                rows={filteredRows}
                deadlineMap={deadlineMap}
                onDeadlineChange={handleDeadlineChange}
                onRowSelect={openDetail}
                filtersAppliedLabel={filtersAppliedLabel}
                rowMetadata={rowMetadata}
              />
            </div>
            <DetailPanel
              detailRow={detailRow}
              detailTitleId={detailTitleId}
              isEditing={isEditing}
              viewingBadge={viewingBadge}
              viewingTimestampLabel={viewingTimestampLabel}
              selectedDatasetName={selectedDatasetName}
              changeHistoryEntries={changeHistoryEntries}
              activeVersionIndex={activeVersionIndex}
              activeVersion={activeVersion}
              baselineRow={baselineRow}
              baselineLabel={baselineLabel}
              comparisonTargetLabel={comparisonTargetLabel}
              comparisonSections={comparisonSections}
              sectionDiff={sectionDiff}
              fieldDiff={fieldDiff}
              compareMode={compareMode}
              onCompareModeChange={handleCompareModeChange}
              regionOptions={regionOptions}
              languageOptions={languageOptions}
              onApproveActiveVersion={handleApproveActiveVersion}
              canApprove={canApprove}
              onClose={closeDetail}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onSaveEdit={saveEdit}
              onVersionChange={handleVersionChange}
              onUpdateRowField={updateEditingRowField}
              onUpdateDetailField={updateEditingDetailField}
              onUpdateCoverageMetricField={updateCoverageMetricField}
              onUpdateScoreField={updateScoreField}
            />
          </>
        )}
      </main>
    </div>
  );
};
