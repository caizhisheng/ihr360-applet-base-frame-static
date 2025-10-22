import * as React from "react";
import { FormattedMessage, injectIntl } from "irs-react-intl";
import IrsButton from "ihr360-web-ui3/packages/action/irs-button";
import IrsPopover from "ihr360-web-ui3/packages/popover/src/popover";

interface HomePageProps {
   bizType?: string;
   intlMessageManagerLocal?: any;
}

class HomePage extends React.Component<HomePageProps> {
   constructor(props: HomePageProps) {
      super(props);
   }
   render() {
       return (
           <div>
               renderind...
               <FormattedMessage id="IRS_DICT.cnb_salary_common_attention" defaultMessage="提示" />
               {this.props.intlMessageManagerLocal('salaryForm')}
               <IrsPopover title="1111111" content="1111111"><IrsButton>1111</IrsButton></IrsPopover>

           </div>
       )
   }
}

export default injectIntl(HomePage);