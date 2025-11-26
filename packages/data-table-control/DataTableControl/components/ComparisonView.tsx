import * as React from "react";

export interface ComparisonRow {
  key: string;
  label: string;
  baseline: string;
  target: string;
  changed: boolean;
}

export interface ComparisonSection {
  id: string;
  title: string;
  rows: ComparisonRow[];
}

interface ComparisonViewProps {
  sections: ComparisonSection[];
  baselineLabel: string;
  targetLabel: string;
}

const renderValue = (value: string) => {
  if (!value.trim()) {
    return <span className="dt-compare-empty">—</span>;
  }
  const parts = value.split(/\r?\n/);
  if (parts.length === 1) {
    return <span>{parts[0]}</span>;
  }
  return (
    <ul>
      {parts.map((part, index) => (
        <li key={`${part}-${index}`}>{part}</li>
      ))}
    </ul>
  );
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({ sections, baselineLabel, targetLabel }) => {
  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="dt-compare" aria-label="Side-by-side dataset comparison">
      <div className="dt-compare-columns" aria-hidden="true">
        <span className="dt-compare-columns-label">Field</span>
        <span className="dt-compare-columns-label">{baselineLabel}</span>
        <span className="dt-compare-columns-label">{targetLabel}</span>
      </div>
      {sections.map(section => (
        <section className="dt-compare-section" key={section.id} aria-label={`${section.title} comparison`}>
          <h4 className="dt-compare-title">{section.title}</h4>
          <div className="dt-compare-table">
            {section.rows.map(row => (
              <div className="dt-compare-row" key={row.key} data-diff={row.changed ? "changed" : undefined}>
                <div className="dt-compare-cell dt-compare-cell--label">{row.label}</div>
                <div className="dt-compare-cell">{renderValue(row.baseline)}</div>
                <div className="dt-compare-cell">{renderValue(row.target)}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
