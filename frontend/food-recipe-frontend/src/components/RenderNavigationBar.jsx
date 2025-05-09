import { useLocation } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export function RenderNavigationBar() {
  const location = useLocation();

  // Only show the navbar if the path is NOT "/login" and NOT "/signup"
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" ? (
        <NavigationBar />
      ) : <NavigationBar />}
    </div>
  );
}
