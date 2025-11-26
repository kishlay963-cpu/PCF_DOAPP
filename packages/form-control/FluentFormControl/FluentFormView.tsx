import * as React from "react";
import { MailRegular } from "@fluentui/react-icons/svg/mail";
import { PersonRegular } from "@fluentui/react-icons/svg/person";
import { BuildingRegular } from "@fluentui/react-icons/svg/building";
import { CommentRegular } from "@fluentui/react-icons/svg/comment";

export interface FluentFormViewProps {
  title: string;
  description: string;
  fullName: string;
  email: string;
  company: string;
  notes: string;
}

const InfoField: React.FC<{
  icon: React.ReactElement;
  label: string;
  hint?: string;
  value: string;
}> = ({ icon, label, hint, value }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
      <span className="ff-pill">{icon}</span>
      {label}
    </div>
    {hint ? <p className="text-xs text-gray-400">{hint}</p> : null}
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm">
      {value.trim().length > 0 ? value : "—"}
    </div>
  </div>
);

const initialsFrom = (value: string, fallback: string) => {
  const source = value.trim() || fallback.trim();
  if (!source) {
    return "--";
  }
  const parts = source
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2);
  return parts.map(part => part[0]?.toUpperCase() ?? "").join("") || source.slice(0, 2).toUpperCase();
};

export const FluentFormView: React.FC<FluentFormViewProps> = ({
  title,
  description,
  fullName,
  email,
  company,
  notes,
}) => {
  const initials = React.useMemo(() => initialsFrom(fullName, title), [fullName, title]);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-[32px] border border-gray-100 bg-white shadow-elevated">
      <header className="flex items-center gap-4 border-b border-gray-100 px-8 py-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-semibold text-white">
          {initials}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
          <span className="ff-chip mt-1 w-fit">Priority intake</span>
        </div>
      </header>

      <section className="grid gap-6 border-b border-gray-100 px-8 py-8 sm:grid-cols-2">
        <InfoField
          icon={<PersonRegular className="h-5 w-5" />}
          label="Full name"
          hint="Primary point of contact"
          value={fullName}
        />
        <InfoField
          icon={<MailRegular className="h-5 w-5" />}
          label="Email"
          hint="We will send confirmations here"
          value={email}
        />
        <InfoField
          icon={<BuildingRegular className="h-5 w-5" />}
          label="Company"
          value={company}
        />
        <div className="space-y-3 sm:col-span-2">
          <div className="flex items-center gap-3">
            <span className="ff-pill">
              <CommentRegular className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">Notes</p>
              <p className="text-xs text-gray-400">Summarise the latest updates for leadership</p>
            </div>
          </div>
          <div className="min-h-[140px] rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-6 text-gray-700">
            {notes.trim().length > 0 ? notes : "No updates provided."}
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-gray-500">Last reviewed moments ago</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100">
            Save draft
          </button>
          <button type="button" className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
            Route for approval
          </button>
        </div>
      </footer>
    </div>
  );
};
