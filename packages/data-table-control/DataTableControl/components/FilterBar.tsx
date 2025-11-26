import * as React from "react";
import { searchTypeConfig, statusOptions } from "../constants";
import type { SearchEntry, SearchType, StatusVariant } from "../types";

export interface SearchUiState {
  open: boolean;
  toggleLabel: string;
  listId: string;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  suggestions: SearchEntry[];
  activeFilter: SearchEntry | null;
  showEmptySuggestions: boolean;
  pill: {
    visible: boolean;
    value: string;
    type: SearchType | "query";
    badge: string;
    label: string;
  };
}

export interface SearchUiHandlers {
  onToggle: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onResetInput: () => void;
  onSuggestionSelect: (entry: SearchEntry) => void;
  onClearSearch: () => void;
}

export interface FilterBarProps {
  labelId: string;
  statusFilter: StatusVariant | "all";
  onStatusFilterChange: (value: StatusVariant | "all") => void;
  dgoFilter: string;
  onDgoFilterChange: (value: string) => void;
  dgoOptions: string[];
  dgoSelectId: string;
  metricLabel: string;
  filteredCount: number;
  isFiltered: boolean;
  onClearFilters: () => void;
  searchState: SearchUiState;
  searchHandlers: SearchUiHandlers;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  labelId,
  statusFilter,
  onStatusFilterChange,
  dgoFilter,
  onDgoFilterChange,
  dgoOptions,
  dgoSelectId,
  metricLabel,
  filteredCount,
  isFiltered,
  onClearFilters,
  searchState,
  searchHandlers,
}) => {
  const {
    open,
    toggleLabel,
    listId,
    inputValue,
    inputRef,
    containerRef,
    suggestions,
    activeFilter,
    showEmptySuggestions,
    pill,
  } = searchState;

  const {
    onToggle,
    onInputChange,
    onInputKeyDown,
    onResetInput,
    onSuggestionSelect,
    onClearSearch,
  } = searchHandlers;

  return (
    <section className="dt-filter-bar" aria-label={labelId}>
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
                onClick={() => onStatusFilterChange(option.value)}
                aria-pressed={statusFilter === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="dt-filter-divider" aria-hidden="true" />
        <div className="dt-filter-group">
          <label className="dt-filter-label" htmlFor={dgoSelectId}>
            Data governance office
          </label>
          <select
            id={dgoSelectId}
            className="dt-filter-select"
            value={dgoFilter}
            onChange={event => onDgoFilterChange(event.target.value)}
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
        <div className="dt-filter-search" data-open={open} ref={containerRef}>
          <button
            type="button"
            className="dt-filter-search-toggle"
            onClick={onToggle}
            aria-label={toggleLabel}
            aria-expanded={open}
            aria-controls={open && suggestions.length > 0 ? listId : undefined}
          >
            <svg className="dt-filter-search-toggle-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l4.25 4.24a1 1 0 0 0 1.42-1.42L15.5 14zm-5 0a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                fill="currentColor"
              />
            </svg>
          </button>
          {open ? (
            <div className="dt-filter-search-field">
              <input
                ref={inputRef}
                type="text"
                className="dt-filter-search-input"
                placeholder="Search datasets, domains, owners..."
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
                aria-controls={suggestions.length > 0 ? listId : undefined}
              />
              {inputValue.trim().length > 0 || activeFilter ? (
                <button type="button" className="dt-filter-search-clear" onClick={onResetInput} aria-label="Clear search text">
                  Clear
                </button>
              ) : null}
            </div>
          ) : null}
          {open ? (
            suggestions.length > 0 ? (
              <ul className="dt-filter-search-suggestions" role="listbox" id={listId}>
                {suggestions.map(entry => (
                  <li key={`${entry.type}-${entry.value}`}>
                    <button type="button" className="dt-filter-search-option" onClick={() => onSuggestionSelect(entry)}>
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
        {pill.visible ? (
          <div className="dt-filter-search-pill" role="status" aria-label={`Search filtered by ${pill.label}: ${pill.value}`}>
            <span className={`dt-filter-search-icon dt-filter-search-icon--${pill.type}`}>
              {pill.badge}
            </span>
            <span className="dt-filter-search-pill-text">{pill.value}</span>
            <button
              type="button"
              className="dt-filter-search-pill-clear"
              onClick={onClearSearch}
              aria-label="Clear search filter"
            >
              ×
            </button>
          </div>
        ) : null}
        <div className="dt-filter-metric" aria-label={metricLabel}>
          <span className="dt-filter-metric-value">{filteredCount}</span>
          <span className="dt-filter-metric-caption">in view</span>
        </div>
        <button type="button" className="dt-filter-reset" onClick={onClearFilters} disabled={!isFiltered}>
          Clear filters
        </button>
      </div>
    </section>
  );
};
