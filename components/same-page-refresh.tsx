"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SamePageRefresh() {
  const pathname = usePathname();
  const historyNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.pathname !== pathname) historyNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [pathname]);

  useLayoutEffect(() => {
    if (historyNavigation.current) {
      historyNavigation.current = false;
      return;
    }
    // Reset before the new route paints, rather than animating from the old page's position.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    function refreshCurrentPage(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target.toLowerCase() !== "_self")) return;

      const destination = new URL(link.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin) return;
      const normalisePath = (path: string) => path.replace(/\/+$/, "") || "/";
      if (normalisePath(destination.pathname) !== normalisePath(current.pathname) || destination.search !== current.search) return;

      if (destination.hash) {
        let id: string;
        try { id = decodeURIComponent(destination.hash.slice(1)); } catch { return; }
        const section = document.getElementById(id);
        if (!section) return;
        event.preventDefault();
        window.history.pushState(window.history.state, "", destination.href);
        section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        return;
      }
      if (link.getAttribute("href")?.includes("#")) return;

      // Run before Next Link handles the click so a same-page visit reloads the document.
      event.preventDefault();
      window.history.replaceState(window.history.state, "", destination.href);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.location.reload();
    }

    document.addEventListener("click", refreshCurrentPage, true);
    return () => document.removeEventListener("click", refreshCurrentPage, true);
  }, []);

  return null;
}
