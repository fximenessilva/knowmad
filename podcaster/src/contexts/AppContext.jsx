import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    const cleanup = () => {
      setLoading(false);
    };

    // Attach event listeners for route changes
    document.addEventListener("routeChangeStart", handleRouteChangeStart);
    document.addEventListener("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      // Clean up event listeners on component unmount
      document.removeEventListener("routeChangeStart", handleRouteChangeStart);
      document.removeEventListener(
        "routeChangeComplete",
        handleRouteChangeComplete
      );
      cleanup();
    };
  }, [pathname]);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
