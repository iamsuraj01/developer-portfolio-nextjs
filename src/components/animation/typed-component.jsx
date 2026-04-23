import { useState, useEffect, useCallback, useRef } from "react";

export default function TypedComponent({
  theme,
  className,
  style,
  strings = ["Backend Developer", "Frontend Developer", "Fullstack Developer"],
  typeSpeed = 40,
  backSpeed = 50,
  loop = true,
}) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const timeoutRef = useRef(null);

  const type = useCallback(() => {
    const currentRole = strings[roleIndex];

    if (isWaiting) {
      timeoutRef.current = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000);
      return;
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % strings.length);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, backSpeed);
    } else {
      if (displayText.length === currentRole.length) {
        if (loop) {
          setIsWaiting(true);
        }
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, typeSpeed);
    }
  }, [
    displayText,
    isDeleting,
    isWaiting,
    roleIndex,
    strings,
    typeSpeed,
    backSpeed,
    loop,
  ]);

  useEffect(() => {
    type();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [type]);

  return (
    <div
      className={className}
      style={{ ...style, color: theme?.primary || "#1D9BF0" }}
    >
      {displayText}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.2em",
          marginLeft: "2px",
          backgroundColor: theme?.primary || "#1D9BF0",
          animation: "blink 0.7s infinite",
        }}
      />
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
