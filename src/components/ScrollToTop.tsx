import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls the window to the top when the route changes
 * This solves the common SPA issue where navigating between routes 
 * doesn't reset the scroll position
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
