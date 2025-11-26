import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DataTableView, defaultDetailData, defaultTableData } from "./DataTableView";
import * as React from "react";

const defaultTableJson = JSON.stringify(defaultTableData);
const defaultDetailJson = JSON.stringify(defaultDetailData);

export class DataTableControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged?: () => void;
    private changeRequestData = "";

    public init(
        _context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        _state?: ComponentFramework.Dictionary,
        _container?: HTMLDivElement,
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const title = (context.parameters.portfolioTitle.raw ?? "").trim() || "Strategic datasets readiness";
        const subtitle = (context.parameters.portfolioSubtitle.raw ?? "").trim() || "Data governance portfolio";
        const tableJson = (context.parameters.portfolioTableData.raw ?? "").trim() || defaultTableJson;
        const detailJson = (context.parameters.portfolioDetailData.raw ?? "").trim() || defaultDetailJson;
        const userName = (context.parameters.currentUserName.raw ?? "").trim();
        const regionOptionsJson = (context.parameters.availableRegions.raw ?? "").trim();
        const languageOptionsJson = (context.parameters.availableLanguages.raw ?? "").trim();
        const changeRequestJson = (context.parameters.changeRequestData.raw ?? this.changeRequestData ?? "").trim();
        this.changeRequestData = changeRequestJson;

        return React.createElement(DataTableView, {
            title,
            subtitle,
            tableJson,
            detailJson,
            userName,
            regionOptionsJson,
            languageOptionsJson,
            changeRequestJson,
            onChangeRequestUpdate: this.handleChangeRequestUpdate,
        });
    }

    public getOutputs(): IOutputs {
        return {
            changeRequestData: this.changeRequestData === "" ? undefined : this.changeRequestData,
        };
    }

    public destroy(): void {
        // No cleanup required.
    }

    private handleChangeRequestUpdate = (value: string) => {
        if (value === this.changeRequestData) {
            return;
        }
        this.changeRequestData = value;
        if (this.notifyOutputChanged) {
            this.notifyOutputChanged();
        }
    };
}
