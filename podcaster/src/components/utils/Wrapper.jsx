import React from "react";

import AppProvider from "contexts/AppContext";

const Wrapper = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default Wrapper;
