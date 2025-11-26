import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DataTableView } from "./DataTableView";
import * as React from "react";

export class DataTableControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    public init(_context: ComponentFramework.Context<IInputs>): void {
        // No initialization logic required.
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const title = (context.parameters.portfolioTitle.raw ?? "").trim() || "Strategic datasets readiness";
        const subtitle = (context.parameters.portfolioSubtitle.raw ?? "").trim() || "Data governance portfolio";

        return React.createElement(DataTableView, {
            title,
            subtitle,
        });
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // No cleanup required.
    }
}
