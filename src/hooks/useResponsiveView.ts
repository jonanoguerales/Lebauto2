import { useCallback, useEffect } from "react";
import { useViewStore } from "@/lib/store";

export function useResponsiveView() {
  const { setView } = useViewStore();

  const updateView = useCallback((e?: MediaQueryListEvent) => {
    setView(
      e
        ? e.matches
          ? "list"
          : "grid"
        : window.innerWidth >= 1024
        ? "list"
        : "grid"
    );
  }, [setView]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    updateView();
    mediaQuery.addEventListener("change", updateView);
    return () => mediaQuery.removeEventListener("change", updateView);
  }, [updateView]);
}
