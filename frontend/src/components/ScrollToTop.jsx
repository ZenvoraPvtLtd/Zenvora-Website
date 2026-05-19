import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reusable ScrollToTop component that resets the scroll position to 0
 * immediately whenever the router pathname changes. This guarantees that
 * every page begins viewing from the absolute top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
