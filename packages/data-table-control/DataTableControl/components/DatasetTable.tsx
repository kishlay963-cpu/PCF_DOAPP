import * as React from "react";
import { statusCopy } from "../constants";
import { formatDate, formatTimestamp } from "../formatters";
import { toSlug } from "../helpers";
import type { TableRow } from "../types";

export interface DatasetRowMetadata {
  pendingCount: number;
  pendingLabel?: string;
  baselineLabel: string;
  hasApprovedBaseline: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface DatasetTableProps {
  rows: TableRow[];
  deadlineMap: Record<string, string>;
  onDeadlineChange: (datasetName: string, value: string) => void;
  onRowSelect: (row: TableRow) => void;
  filtersAppliedLabel: string;
  rowMetadata: Record<string, DatasetRowMetadata>;
}

export const DatasetTable: React.FC<DatasetTableProps> = ({
  rows,
  deadlineMap,
  onDeadlineChange,
  onRowSelect,
  filtersAppliedLabel,
  rowMetadata,
}) => {
  return (
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
            {rows.length > 0 ? (
              rows.map(row => {
                const slug = toSlug(row.datasetName);
                const deadlineId = `deadline-${slug}`;
                const metadata = rowMetadata[row.datasetName];
                const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onRowSelect(row);
                  }
                };
                return (
                  <article
                    className="dt-row"
                    key={row.datasetName}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${row.datasetName}`}
                    onClick={() => onRowSelect(row)}
                    onKeyDown={handleKeyDown}
                  >
                    <div className="dt-cell">
                      <p className="text-base font-semibold text-slate-900">{row.datasetName}</p>
                      <div className="dt-table-pill-group">
                        <span
                          className="dt-table-pill dt-table-pill--baseline"
                          data-approved={metadata?.hasApprovedBaseline ? "true" : "false"}
                        >
                          {metadata?.baselineLabel ?? "Original baseline"}
                        </span>
                        {metadata?.pendingCount ? (
                          <span className="dt-table-pill dt-table-pill--pending">{metadata.pendingLabel ?? `${metadata.pendingCount} pending`}</span>
                        ) : null}
                      </div>
                      {metadata?.approvedBy ? (
                        <p className="dt-cell--meta">
                          Approved by {metadata.approvedBy}
                          {metadata.approvedAt ? ` · ${formatTimestamp(metadata.approvedAt)}` : ""}
                        </p>
                      ) : null}
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
                        onChange={event => onDeadlineChange(row.datasetName, event.target.value)}
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
          <strong>Filters applied:</strong> {filtersAppliedLabel}
        </span>
      </footer>
    </section>
  );
};
