import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DataTableView, defaultDetailData, defaultTableData } from "./DataTableView";
import * as React from "react";

const defaultTableJson = JSON.stringify(defaultTableData);
const defaultDetailJson = JSON.stringify(defaultDetailData);

export class DataTableControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    public init(_context: ComponentFramework.Context<IInputs>): void {
        // No initialization logic required.
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const title = (context.parameters.portfolioTitle.raw ?? "").trim() || "Strategic datasets readiness";
        const subtitle = (context.parameters.portfolioSubtitle.raw ?? "").trim() || "Data governance portfolio";
        const tableJson = (context.parameters.portfolioTableData.raw ?? "").trim() || defaultTableJson;
        const detailJson = (context.parameters.portfolioDetailData.raw ?? "").trim() || defaultDetailJson;

        return React.createElement(DataTableView, {
            title,
            subtitle,
            tableJson,
            detailJson,
        });
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // No cleanup required.
    }
}
