import { searchTypeOrder } from "./constants";
import type { SearchEntry, SearchType, TableRow } from "./types";

export const buildSearchIndex = (rows: TableRow[]): SearchEntry[] => {
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
