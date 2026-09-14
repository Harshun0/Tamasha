import { useEffect, useRef, useState } from "react";

interface TypewriterOptions {
  /** Array of strings to cycle through */
  words: string[];
  /** Typing speed in ms per character (default 80) */
  typeSpeed?: number;
  /** Deleting speed in ms per character (default 45) */
  deleteSpeed?: number;
  /** Pause after fully typing a word in ms (default 1800) */
  pauseAfterType?: number;
  /** Pause after fully deleting a word in ms (default 400) */
  pauseAfterDelete?: number;
  /** Start automatically (default true) */
  autoStart?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseAfterType = 1800,
  pauseAfterDelete = 400,
  autoStart = true,
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "pauseDelete">("typing");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoStart || words.length === 0) return;

    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        frameRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        frameRef.current = setTimeout(() => setPhase("pausing"), pauseAfterType);
      }
    } else if (phase === "pausing") {
      frameRef.current = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, deleteSpeed);
      } else {
        frameRef.current = setTimeout(() => {
          setWordIndex((w) => (w + 1) % words.length);
          setPhase("pauseDelete");
        }, 0);
      }
    } else if (phase === "pauseDelete") {
      frameRef.current = setTimeout(() => setPhase("typing"), pauseAfterDelete);
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, autoStart]);

  return { displayed, isTyping: phase === "typing" };
}
