import React from "react";

import AppProvider from "../../contexts/AppContext";
import Header from "../common/header/Header";
import ErrorBoundary from "./ErrorBoundary";

const Wrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Header />
        {children}
      </AppProvider>
    </ErrorBoundary>
  );
};

export default Wrapper;
