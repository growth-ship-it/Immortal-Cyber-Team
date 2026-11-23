"use client";

import { useEffect } from "react";

export function SamePageRefresh() {
  useEffect(() => {
    function refreshCurrentPage(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target.toLowerCase() !== "_self")) return;

      const destination = new URL(link.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin || destination.hash || link.getAttribute("href")?.includes("#")) return;
      const normalisePath = (path: string) => path.replace(/\/+$/, "") || "/";
      if (normalisePath(destination.pathname) !== normalisePath(current.pathname) || destination.search !== current.search) return;

      // Run before Next Link handles the click so a same-page visit reloads the document.
      event.preventDefault();
      window.history.replaceState(window.history.state, "", destination.href);
      window.location.reload();
    }

    document.addEventListener("click", refreshCurrentPage, true);
    return () => document.removeEventListener("click", refreshCurrentPage, true);
  }, []);

  return null;
}
