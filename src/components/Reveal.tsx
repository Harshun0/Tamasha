import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "down";

const initialTransform: Record<Direction, string> = {
  up: "translateY(36px)",
  down: "translateY(-36px)",
  left: "translateX(-48px)",
  right: "translateX(48px)",
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  /** Override the default translate distance (e.g. "60px") */
  distance?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build the transform from the direction, optionally overriding distance
  const getHidden = () => {
    if (distance) {
      if (direction === "left") return `translateX(-${distance})`;
      if (direction === "right") return `translateX(${distance})`;
      if (direction === "down") return `translateY(-${distance})`;
      return `translateY(${distance})`;
    }
    return initialTransform[direction];
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        transitionDuration: "0.75s",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translate(0,0)" : getHidden(),
      }}
      className={className}
    >
      {children}
    </div>
  );
}
