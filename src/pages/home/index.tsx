import React from "react";

interface HomePageProps {
   bizType?: string;
}

class HomePage extends React.Component<HomePageProps> {
   constructor(props: HomePageProps) {
      super(props);
   }
   render() {
       return (
           <div>
               renderind...
           </div>
       )
   }
}

export default HomePage;