import * as React from "react";

export interface LandingHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface LandingViewProps {
  logoAsset: string;
  highlights: LandingHighlight[];
  onEnter: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ logoAsset, highlights, onEnter }) => (
  <div className="dt-home">
    <article className="dt-card dt-home-hero">
      <div className="dt-home-hero-visual" aria-hidden="true">
        <img className="dt-home-logo" src={logoAsset} alt="" />
      </div>
      <div className="dt-home-hero-copy">
        <p className="dt-home-eyebrow">Data Trust Office</p>
        <h2 className="dt-home-title">Clarity and confidence for your strategic datasets</h2>
        <p className="dt-home-body">
          Monitor readiness, unblock governance actions, and move critical data assets forward with confidence.
        </p>
        <div className="dt-home-actions">
          <button type="button" className="dt-home-button dt-home-button--primary" onClick={onEnter}>
            DGO Login
          </button>
          <button type="button" className="dt-home-button" onClick={onEnter}>
            Data Owner Login
          </button>
        </div>
      </div>
    </article>
    <section className="dt-home-highlights" aria-label="Portfolio snapshot">
      {highlights.map(item => (
        <article className="dt-home-highlight" key={item.label}>
          <p className="dt-home-highlight-label">{item.label}</p>
          <p className="dt-home-highlight-value">{item.value}</p>
          <p className="dt-home-highlight-detail">{item.detail}</p>
        </article>
      ))}
    </section>
  </div>
);
