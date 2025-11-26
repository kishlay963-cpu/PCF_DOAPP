import * as React from "react";
import { scoreLabels, scoreOrder, statusCopy, statusOptions } from "../constants";
import { parseCommaSeparated, parseLineSeparated } from "../dataTransforms";
import { formatDate, formatTimestamp } from "../formatters";
import type {
  ChangeVersion,
  CoverageMetric,
  DataObjectsAndMeasure,
  DatasetDetail,
  StatusVariant,
  TableRow,
} from "../types";
import { MultiselectComboBox } from "./MultiselectComboBox";
import type { ComparisonSection } from "./ComparisonView";
import { ComparisonView } from "./ComparisonView";

export interface DetailPanelProps {
  detailRow: TableRow | null;
  detailTitleId?: string;
  isEditing: boolean;
  viewingBadge: string;
  viewingTimestampLabel: string;
  selectedDatasetName: string | null;
  changeHistoryEntries: ChangeVersion[];
  activeVersionIndex: number;
  activeVersion?: ChangeVersion;
  baselineRow: TableRow | null;
  baselineLabel: string;
  comparisonTargetLabel: string;
  comparisonSections: ComparisonSection[];
  sectionDiff: Record<string, boolean>;
  fieldDiff: Record<string, boolean>;
  compareMode: "inline" | "side-by-side";
  onCompareModeChange: (mode: "inline" | "side-by-side") => void;
  regionOptions: string[];
  languageOptions: string[];
  onApproveActiveVersion: () => void;
  canApprove: boolean;
  onClose: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onVersionChange: (datasetName: string, versionIndex: number) => void;
  onUpdateRowField: <K extends keyof TableRow>(key: K, value: TableRow[K]) => void;
  onUpdateDetailField: <K extends keyof DatasetDetail>(key: K, value: DatasetDetail[K]) => void;
  onUpdateCoverageMetricField: <K extends keyof CoverageMetric>(key: K, value: CoverageMetric[K]) => void;
  onUpdateScoreField: <K extends keyof DataObjectsAndMeasure>(key: K, value: DataObjectsAndMeasure[K]) => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  detailRow,
  detailTitleId,
  isEditing,
  viewingBadge,
  viewingTimestampLabel,
  selectedDatasetName,
  changeHistoryEntries,
  activeVersionIndex,
  activeVersion,
  baselineRow,
  baselineLabel,
  comparisonTargetLabel,
  comparisonSections,
  sectionDiff,
  fieldDiff,
  compareMode,
  onCompareModeChange,
  regionOptions,
  languageOptions,
  onApproveActiveVersion,
  canApprove,
  onClose,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onVersionChange,
  onUpdateRowField,
  onUpdateDetailField,
  onUpdateCoverageMetricField,
  onUpdateScoreField,
}) => {
  if (!detailRow) {
    return null;
  }

  const detailHeadingId = detailTitleId ?? `dataset-detail-${detailRow.datasetName.replace(/[^a-zA-Z0-9]+/g, "-")}`;
  const inlineDiffEnabled = !isEditing;
  const getFieldDiffAttr = (key: string) => (inlineDiffEnabled && fieldDiff[key] ? "changed" : undefined);
  const getSectionDiffAttr = (key: string) => (inlineDiffEnabled && sectionDiff[key] ? "changed" : undefined);
  const showComparison = inlineDiffEnabled && compareMode === "side-by-side" && baselineRow;
  const showCompareToggle = inlineDiffEnabled && baselineRow !== null;
  const versionStatus = activeVersionIndex === 0 ? "baseline" : activeVersion?.status ?? "pending";
  const versionStatusLabel =
    activeVersionIndex === 0
      ? baselineLabel
      : activeVersion?.status === "approved"
        ? "Approved"
        : "Pending approval";

  return (
    <div
      className="dt-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={detailHeadingId}
      onClick={() => {
        if (!isEditing) {
          onClose();
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
                onChange={event => onUpdateDetailField("businessUnit", event.target.value)}
                placeholder="Business unit"
              />
            ) : (
              <p className="dt-detail-subtitle" data-diff={getFieldDiffAttr("businessUnit")}>
                {detailRow.detail.businessUnit}
              </p>
            )}
            <h2 className="dt-detail-title" id={detailHeadingId}>
              {isEditing ? (
                <input
                  className="dt-input dt-input--heading"
                  value={detailRow.datasetName}
                  onChange={event => onUpdateRowField("datasetName", event.target.value)}
                  placeholder="Dataset name"
                />
              ) : (
                <span data-diff={getFieldDiffAttr("datasetName")}>{detailRow.datasetName}</span>
              )}
            </h2>
            {isEditing ? (
              <textarea
                className="dt-textarea"
                value={detailRow.datasetSummary}
                onChange={event => onUpdateRowField("datasetSummary", event.target.value)}
                placeholder="High-level summary"
              />
            ) : (
              <p className="dt-detail-summary" data-diff={getFieldDiffAttr("datasetSummary")}>
                {detailRow.datasetSummary}
              </p>
            )}
            <div className="dt-detail-header-context" aria-live="polite">
              <span className="dt-detail-badge" data-diff={getFieldDiffAttr("status")}>{viewingBadge}</span>
              <span className="dt-detail-context">{viewingTimestampLabel}</span>
              <span className="dt-detail-status-chip" data-status={versionStatus}>
                {versionStatusLabel}
              </span>
              {activeVersionIndex > 0 && activeVersion?.submittedBy ? (
                <span className="dt-detail-context">
                  Requested by {activeVersion.submittedBy} · {formatTimestamp(activeVersion.submittedAt)}
                </span>
              ) : null}
              {activeVersion?.approval ? (
                <span className="dt-detail-context">
                  Approved by {activeVersion.approval.by} · {formatTimestamp(activeVersion.approval.at)}
                </span>
              ) : null}
            </div>
          </div>
          <div className="dt-detail-header-actions">
            {isEditing ? (
              <>
                <select
                  className="dt-select"
                  value={detailRow.status}
                  onChange={event => onUpdateRowField("status", event.target.value as StatusVariant)}
                >
                  {statusOptions
                    .filter(option => option.value !== "all")
                    .map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <button type="button" className="dt-detail-action" onClick={onCancelEdit}>
                  Cancel
                </button>
                <button type="button" className="dt-detail-action dt-detail-action--primary" onClick={onSaveEdit}>
                  Save changes
                </button>
              </>
            ) : (
              <>
                <span className="dt-status" data-variant={detailRow.status}>
                  {statusCopy[detailRow.status].label}
                </span>
                {activeVersionIndex > 0 && activeVersion?.status !== "approved" ? (
                  <button
                    type="button"
                    className="dt-detail-action dt-detail-action--approve"
                    onClick={onApproveActiveVersion}
                    disabled={!canApprove}
                  >
                    Approve version
                  </button>
                ) : null}
                <button type="button" className="dt-detail-action" onClick={onStartEdit}>
                  Edit details
                </button>
                <button type="button" className="dt-detail-action" onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </div>
        </header>

        {showCompareToggle ? (
          <div className="dt-detail-compare-toggle" role="group" aria-label="Comparison mode">
            <button
              type="button"
              className="dt-detail-compare-button"
              data-active={compareMode === "inline" ? "true" : undefined}
              onClick={() => onCompareModeChange("inline")}
            >
              Inline
            </button>
            <button
              type="button"
              className="dt-detail-compare-button"
              data-active={compareMode === "side-by-side" ? "true" : undefined}
              onClick={() => onCompareModeChange("side-by-side")}
              disabled={!baselineRow || !detailRow}
            >
              Side-by-side
            </button>
          </div>
        ) : null}

        <section className="dt-detail-content">
          {showComparison ? (
            <ComparisonView
              sections={comparisonSections}
              baselineLabel={baselineLabel}
              targetLabel={comparisonTargetLabel}
            />
          ) : null}
          {selectedDatasetName && changeHistoryEntries.length > 0 ? (
            <aside className="dt-detail-history" aria-label="Change history">
              <h3 className="dt-detail-history-title">Change history</h3>
              <ul className="dt-detail-history-list">
                <li>
                  <button
                    type="button"
                    className="dt-detail-history-item"
                    data-active={activeVersionIndex === 0}
                    onClick={() => onVersionChange(selectedDatasetName, 0)}
                    disabled={isEditing}
                  >
                    <span className="dt-detail-history-label">Baseline</span>
                    <span className="dt-detail-history-meta">{baselineLabel}</span>
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
                        onClick={() => onVersionChange(selectedDatasetName, versionIndex)}
                        disabled={isEditing && activeVersionIndex !== versionIndex}
                      >
                        <span className="dt-detail-history-label">Version {entry.version}</span>
                        <span className="dt-detail-history-meta">
                          Saved {formatTimestamp(entry.submittedAt)}
                          {entry.submittedBy ? ` · ${entry.submittedBy}` : ""}
                        </span>
                        <span className="dt-detail-history-status" data-status={entry.status}>
                          {entry.status === "approved" ? "Approved" : "Pending"}
                        </span>
                        {entry.approval ? (
                          <span className="dt-detail-history-meta">
                            Approved by {entry.approval.by} · {formatTimestamp(entry.approval.at)}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          ) : null}
          <div className="dt-detail-metrics" data-diff={getSectionDiffAttr("metrics")}>
            <div className="dt-detail-metric">
              <p className="dt-detail-metric-label">Coverage count</p>
              {isEditing ? (
                <input
                  type="number"
                  className="dt-input dt-input--metric"
                  value={detailRow.detail.coverageCount}
                  onChange={event => onUpdateDetailField("coverageCount", Number(event.target.value) || 0)}
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
                  onChange={event => onUpdateDetailField("dataFrequency", event.target.value)}
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
                  onChange={event => onUpdateDetailField("timePeriod", event.target.value)}
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
                  onChange={event => onUpdateDetailField("minimumDataFrequency", event.target.value)}
                />
              ) : (
                <p className="dt-detail-metric-value">{detailRow.detail.minimumDataFrequency}</p>
              )}
            </div>
          </div>

          <div className="dt-detail-grid">
            <article className="dt-detail-card lg:col-span-7" data-diff={getSectionDiffAttr("overview")}>
              <h3 className="dt-detail-card-title">Overview</h3>
              {isEditing ? (
                <textarea
                  className="dt-textarea"
                  value={detailRow.detail.description}
                  onChange={event => onUpdateDetailField("description", event.target.value)}
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
                        onChange={event => onUpdateDetailField("domain", event.target.value)}
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
                        onChange={event => onUpdateDetailField("subdomain", event.target.value)}
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
                        onChange={event => onUpdateDetailField("businessUnit", event.target.value)}
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
                        onChange={event => onUpdateDetailField("history", event.target.value)}
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
                  onChange={event => onUpdateDetailField("dataTypes", parseLineSeparated(event.target.value))}
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

            <article className="dt-detail-card lg:col-span-5" data-diff={getSectionDiffAttr("stewardship")}>
              <h3 className="dt-detail-card-title">Stewardship &amp; readiness</h3>
              <dl className="dt-detail-properties dt-detail-properties--stacked">
                <div>
                  <dt>Data owner</dt>
                  <dd>
                    {isEditing ? (
                      <input
                        className="dt-input"
                        value={detailRow.dataOwner}
                        onChange={event => onUpdateRowField("dataOwner", event.target.value)}
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
                        onChange={event => onUpdateRowField("dataOwnerRole", event.target.value)}
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
                        onChange={event => onUpdateRowField("dgo", event.target.value)}
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
                        onChange={event => onUpdateRowField("doSpoc", event.target.value)}
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
                        onChange={event => onUpdateRowField("descriptionValidation", event.target.value)}
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
                        onChange={event => onUpdateRowField("deadline", event.target.value)}
                      />
                    ) : (
                      formatDate(detailRow.deadline)
                    )}
                  </dd>
                </div>
              </dl>
            </article>
            <article className="dt-detail-card lg:col-span-5" data-diff={getSectionDiffAttr("coverage")}>
              <dl className="dt-detail-properties dt-detail-properties--stacked">
                <div>
                  <dt>Coverage count</dt>
                  <dd>
                    {isEditing ? (
                      <input
                        type="number"
                        className="dt-input"
                        value={detailRow.detail.coverageMetric.coverageCount}
                        onChange={event => onUpdateCoverageMetricField("coverageCount", Number(event.target.value) || 0)}
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
                        onChange={event => onUpdateCoverageMetricField("dataFrequency", event.target.value)}
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
                        onChange={event => onUpdateCoverageMetricField("dataTypes", event.target.value)}
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
                        onChange={event => onUpdateCoverageMetricField("geography", event.target.value)}
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
                        onChange={event => onUpdateCoverageMetricField("history", event.target.value)}
                      />
                    ) : (
                      detailRow.detail.coverageMetric.history
                    )}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="dt-detail-card lg:col-span-7" data-diff={getSectionDiffAttr("scores")}>
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
                        onChange={event => onUpdateScoreField(key, Number(event.target.value) || 0)}
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

            <article className="dt-detail-card lg:col-span-5" data-diff={getSectionDiffAttr("features")}>
              <h3 className="dt-detail-card-title">Features &amp; benefits</h3>
              {isEditing ? (
                <textarea
                  className="dt-textarea"
                  value={detailRow.detail.features.join("\n")}
                  onChange={event => onUpdateDetailField("features", parseLineSeparated(event.target.value))}
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

            <article className="dt-detail-card lg:col-span-6" data-diff={getSectionDiffAttr("distribution")}>
              <h3 className="dt-detail-card-title">Distribution &amp; localisation</h3>
              <div className="dt-detail-distribution">
                <div>
                  <p className="dt-detail-micro-label">Regions</p>
                  {isEditing ? (
                    <MultiselectComboBox
                      id={`${detailHeadingId}-regions`}
                      ariaLabel="Select regions"
                      values={detailRow.detail.regions}
                      options={regionOptions}
                      onChange={next => onUpdateDetailField("regions", next)}
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
                      onChange={event => onUpdateDetailField("geography", parseCommaSeparated(event.target.value))}
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
                      id={`${detailHeadingId}-languages`}
                      ariaLabel="Select languages"
                      values={detailRow.detail.languages}
                      options={languageOptions}
                      onChange={next => onUpdateDetailField("languages", next)}
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
                      onChange={event => onUpdateDetailField("tags", parseCommaSeparated(event.target.value))}
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
                        onChange={event => onUpdateDetailField("marketingUrl", event.target.value)}
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
                        onChange={event => onUpdateDetailField("minimumDataFrequency", event.target.value)}
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
  );
};
