declare module 'irs-react-intl' {
    export { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
    export { RouteTracker } from 'irs-tools/irs-react-intl-uper/index';
    export { getLanguage } from 'irs-tools/irs-react-intl-uper/index';
}

declare module 'react-intl' {
    export { injectIntl, FormattedMessage, FormattedHTMLMessage, IntlProvider, useIntl, defineMessages } from 'react-intl';
}