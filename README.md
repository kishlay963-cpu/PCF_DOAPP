# PCF Monorepo

This workspace is organised as an npm workspaces monorepo so you can build and maintain multiple Power Apps Component Framework (PCF) controls side by side. Each control lives inside `packages/<control-name>` and owns its code, manifest, and build configuration while sharing tooling from the repository root.

## Prerequisites

- [Power Platform CLI (`pac`)](https://learn.microsoft.com/power-apps/developer/data-platform/powerapps-cli) 1.37 or later (`pac install latest` is recommended).
- Node.js 18 LTS (or a version supported by the CLI) and npm.
- A Power Apps environment where you can test and publish PCF controls.

## Workflows

```powershell
# Install all workspace dependencies
npm install

# Build every control in the monorepo
npm run build --workspaces

# Build or start a specific control
npm run build --workspace @pcf/react-control
npm run start --workspace @pcf/react-control
npm run build --workspace @pcf/progress-bar
npm run start --workspace @pcf/progress-bar
npm run build --workspace @pcf/fluent-form
npm run start --workspace @pcf/fluent-form
```

VS Code tasks (Terminal → Run Task…) include shortcuts for building the full workspace or individual controls.

## Current Packages

- `packages/react-control` (`@pcf/react-control`): React-based sample control that surfaces the bound `sampleProperty` via the Fluent UI label platform library.
- `packages/progress-bar-control` (`@pcf/progress-bar`): Executive-style progress snapshot with Fluent UI cards, badges, and a goal-tracking progress bar.
- `packages/form-control` (`@pcf/fluent-form`): Premium Fluent UI form layout for leadership updates with read-only fields and call-to-action buttons.

To add another component, scaffold it with `pac pcf init ...`, place it under `packages/<new-control>`, and register it as an npm workspace.

## Next Steps

1. Update each control manifest with production-ready metadata and resources.
2. Extend the React views to implement your business logic.
3. Package controls using `pac pcf push` or standard ALM pipelines when you are ready to deploy.
