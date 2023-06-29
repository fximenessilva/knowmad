import * as React from "react";

import Wrapper from "./components/utils/Wrapper";
import AppRoutes from "./Routes";

import "styles/app.scss";

function App() {
  return (
    <Wrapper>
      <AppRoutes />
    </Wrapper>
  );
}

export default App;
