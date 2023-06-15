import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    window.addEventListener("beforeunload", start);
    window.addEventListener("load", end);

    return () => {
      window.removeEventListener("beforeunload", start);
      window.removeEventListener("load", end);
    };
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
