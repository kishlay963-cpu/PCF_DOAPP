import * as React from 'react';
import { Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    const displayName = this.props.name && this.props.name.trim().length > 0 ? this.props.name : 'Power Apps';
    return (
      <Label>
        Hello {displayName}!
      </Label>
    )
  }
}
