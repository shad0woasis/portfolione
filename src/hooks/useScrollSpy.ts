import { useEffect, useState, useCallback } from "react";

/**
 * Хук для отслеживания видимой секции при скролле.
 * Возвращает ID текущей видимой секции.
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const element = document.getElementById(sectionIds[i]);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sectionIds[i]);
        return;
      }
    }
    setActiveSection(sectionIds[0] || "");
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
}

/**
 * Хук для отслеживания видимости элемента через IntersectionObserver.
 */
export function useInView(threshold = 0.1): [React.RefCallback<HTMLElement>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, isInView];
}
