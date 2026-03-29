import { useEffect, useState, type RefObject } from "react";

type UseOverflowOptions = Partial<{
  horizontal: boolean;
  vertical: boolean;
}>;

export function useOverflow<T extends HTMLElement>(ref: RefObject<T | null>, opts: UseOverflowOptions = {}) {
  const { horizontal = true, vertical = false } = opts;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollPos, setScrollPos] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;

    const compute = () => {
      const h = horizontal ? el.scrollWidth > el.clientWidth : false;
      const v = vertical ? el.scrollHeight > el.clientHeight : false;
      setIsOverflowing(h || v);
    };

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= maxScroll - 1;
      setScrollPos({ atStart, atEnd });
    };

    compute();
    update();

    el.addEventListener("scroll", update, { passive: true });

    // Recompute on size/content changes
    const ro = new ResizeObserver(compute);
    ro.observe(el);

    // If children change text/DOM
    const mo = new MutationObserver(compute);
    mo.observe(el, { childList: true, subtree: true, characterData: true });

    // Recompute on window resize
    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horizontal, vertical]);

  return { isOverflowing, scrollPos };
}
