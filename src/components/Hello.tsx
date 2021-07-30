import * as React from 'react';
import IHelloProps from '../Interface/components/IHello';
import { FormattedMessage } from 'react-intl';


class Hello extends React.Component<IHelloProps,any> {
    public render() {
        return (
            <div className="hello-span">
                <div className="greeting">
                  <FormattedMessage tagName="div" id="hello" values={{ someone: this.props.name }} />
                </div>
            </div>
        )
    }
}

export default Hello;
