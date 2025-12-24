import * as React from "react";
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
           <div className="p-4">
               <div className="text-center mt-[200px]  space-y-4">    
                   <p>rendering...</p>
                   <p>
                       <FormattedMessage id="IRS_DICT.cnb_salary_common_attention" defaultMessage="提示" />
                   </p>
                   <p>{this.props.intlMessageManagerLocal('salaryForm')}</p>

                   {/* 简单的按钮和弹出示例 - 后续可以添加 shadcn-ui 组件 */}
                   <div className="mt-4">
                       <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                           示例按钮
                       </button>
                   </div>
               </div>
           </div>
       )
   }
}

export default injectIntl(HomePage);
