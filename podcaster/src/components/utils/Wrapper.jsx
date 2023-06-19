import React from "react";

import AppProvider from "../../contexts/AppContext";
import Header from "../common/header/Header";

const Wrapper = ({ children }) => {
  return (
    <AppProvider>
      <Header />
      {children}
    </AppProvider>
  );
};

export default Wrapper;
