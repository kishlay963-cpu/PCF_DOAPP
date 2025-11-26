import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ProgressBarView } from "./ProgressBarView";
import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export class ProgressBarControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        _notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        // No initialization logic required for this sample.
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const progressValue = context.parameters.progressValue.raw ?? 0;
        const statusMessage = (context.parameters.statusMessage.formatted ?? "Awaiting status update").trim() || "Awaiting status update";
        const customTitle = (context.parameters.progressTitle.raw ?? "").trim();
        const customSubtitle = (context.parameters.progressSubtitle.raw ?? "").trim();
        const metadataTitle = context.parameters.progressValue.attributes?.DisplayName ?? undefined;
        const title = customTitle.length > 0 ? customTitle : metadataTitle ?? "Delivery health";
        const subTitle = customSubtitle.length > 0 ? customSubtitle : "Executive summary";

        return React.createElement(
            FluentProvider,
            { theme: webLightTheme },
            React.createElement(ProgressBarView, {
                title,
                subTitle,
                statusMessage,
                value: progressValue,
            })
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
