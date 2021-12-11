import React from "react";
import { useMediaQuery } from 'react-responsive'

const isMobileDevice = useMediaQuery({
    query: "(min-device-width: 480px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1200px)",
  });

  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 1201px )",
  });

const App = () => <div>Hello from React</div>;
<h1>React Responsive - a guide</h1>      
{isMobileDevice && <Mobile />}
  {isTabletDevice && <>
  <TabletMobile />
  {isDesktop && <Desktop />}
  {isLaptop && <Laptop />}
  {isBigScreen && <BigScreen />}
</>}

export default App;
