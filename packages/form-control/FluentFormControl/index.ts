import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { FluentFormView } from "./FluentFormView";
import * as React from "react";

export class FluentFormControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
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
        _state: ComponentFramework.Dictionary
    ): void {
        // No initialization logic required for this sample.
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const title = (context.parameters.formTitle.raw ?? "").trim() || "Client intake summary";
        const description = (context.parameters.formDescription.raw ?? "").trim() || "Capture the key details before routing the request.";
        const fullName = (context.parameters.fullName.formatted ?? "").trim() || "Alex Jensen";
        const email = (context.parameters.email.formatted ?? "").trim() || "alex.jensen@contoso.com";
        const company = (context.parameters.company.formatted ?? "").trim() || "Contoso Healthcare";
        const notes = (context.parameters.notes.formatted ?? "").trim() || "Draft the project kickoff deck and align milestones with the PMO before Friday.";

        return React.createElement(FluentFormView, {
            title,
            description,
            fullName,
            email,
            company,
            notes,
        });
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
