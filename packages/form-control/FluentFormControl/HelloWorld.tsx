import * as React from "react";

export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
        Hello {this.props.name ?? "there"}!
      </span>
    );
  }
}
