import React from "react";
import { FormattedMessage, injectIntl } from "irs-react-intl";

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
           </div>
       )
   }
}

export default injectIntl(HomePage);