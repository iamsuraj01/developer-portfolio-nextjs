import React, { useMemo, useEffect, useRef, useState } from "react";
import styles from "../../styles/landing.module.css";

// Syntax token types
const tokenize = (line) => {
  const tokens = [];

  // const/function keywords
  if (line.match(/^const /)) {
    tokens.push({ type: "keyword", text: "const " });
    const rest = line.slice(6);
    const eqIdx = rest.indexOf(" =");
    if (eqIdx !== -1) {
      tokens.push({ type: "variable", text: rest.slice(0, eqIdx) });
      tokens.push({ type: "operator", text: " = {" });
    } else {
      tokens.push({ type: "text", text: rest });
    }
    return tokens;
  }

  if (line === "};") {
    tokens.push({ type: "bracket", text: "};" });
    return tokens;
  }

  if (line.trim() === "hireable: function() {") {
    tokens.push({ type: "indent", text: "  " });
    tokens.push({ type: "property", text: "hireable" });
    tokens.push({ type: "operator", text: ": " });
    tokens.push({ type: "keyword", text: "function" });
    tokens.push({ type: "bracket", text: "() {" });
    return tokens;
  }

  if (line.trim() === "return (") {
    tokens.push({ type: "indent", text: "    " });
    tokens.push({ type: "keyword", text: "return" });
    tokens.push({ type: "bracket", text: " (" });
    return tokens;
  }

  if (line.trim() === ");" || line.trim() === "}") {
    tokens.push({ type: "indent", text: line.match(/^\s+/)?.[0] || "" });
    tokens.push({ type: "bracket", text: line.trim() });
    return tokens;
  }

  // this.xxx && lines
  if (line.trim().startsWith("this.")) {
    tokens.push({ type: "indent", text: line.match(/^\s+/)?.[0] || "" });
    tokens.push({ type: "keyword", text: "this" });
    tokens.push({ type: "operator", text: "." });
    const rest = line.trim().slice(5);
    const andIdx = rest.indexOf(" &&");
    if (andIdx !== -1) {
      tokens.push({ type: "property", text: rest.slice(0, andIdx) });
      tokens.push({ type: "operator", text: " &&" });
    } else {
      tokens.push({ type: "property", text: rest });
    }
    return tokens;
  }

  // skills.length >= 5
  if (line.trim().startsWith("this.skills.length")) {
    tokens.push({ type: "indent", text: line.match(/^\s+/)?.[0] || "" });
    tokens.push({ type: "keyword", text: "this" });
    tokens.push({ type: "operator", text: "." });
    tokens.push({ type: "property", text: "skills" });
    tokens.push({ type: "operator", text: "." });
    tokens.push({ type: "property", text: "length" });
    tokens.push({ type: "operator", text: " >= " });
    tokens.push({ type: "number", text: "5" });
    return tokens;
  }

  // key: value lines
  const keyMatch = line.match(/^(\s*)(\w+):\s*(.*)/);
  if (keyMatch) {
    const [, indent, key, value] = keyMatch;
    tokens.push({ type: "indent", text: indent });
    tokens.push({ type: "property", text: key });
    tokens.push({ type: "operator", text: ": " });

    // string value
    if (value.startsWith("'")) {
      tokens.push({ type: "string", text: value });
    }
    // boolean
    else if (value === "true," || value === "false,") {
      tokens.push({ type: "boolean", text: value });
    }
    // array
    else if (value.startsWith("[")) {
      // Split array items
      const inner = value.slice(1, value.lastIndexOf("]"));
      tokens.push({ type: "bracket", text: "[" });
      const items = inner.split(", ");
      items.forEach((item, i) => {
        tokens.push({ type: "string", text: item });
        if (i < items.length - 1) tokens.push({ type: "text", text: ", " });
      });
      tokens.push({ type: "bracket", text: "]," });
    } else {
      tokens.push({ type: "text", text: value });
    }
    return tokens;
  }

  tokens.push({ type: "text", text: line });
  return tokens;
};

const TOKEN_COLORS = {
  keyword: "#c792ea",
  variable: "#82aaff",
  property: "#f07178",
  string: "#c3e88d",
  boolean: "#ff9d00",
  number: "#f78c6c",
  operator: "#89ddff",
  bracket: "#ffcb6b",
  indent: "transparent",
  text: "#d4d4d4",
};

const FloatingParticle = ({ style }) => (
  <div className={styles.particle} style={style} />
);

export const CodeBlock = ({ variable, data, theme, opacity = "1" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [visibleLines, setVisibleLines] = useState(0);
  const [glowActive, setGlowActive] = useState(false);

  const lines = useMemo(() => {
    const result = [];
    result.push(`const ${variable} = {`);
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string") {
        result.push(`  ${key}: '${value}',`);
      } else if (typeof value === "boolean") {
        result.push(`  ${key}: ${value},`);
      } else if (Array.isArray(value)) {
        result.push(`  ${key}: [${value.map((v) => `'${v}'`).join(", ")}],`);
      }
    });
    result.push("  hireable: function() {");
    result.push("    return (");
    result.push("      this.hardWorker &&");
    result.push("      this.problemSolver &&");
    result.push("      this.skills.length >= 5");
    result.push("    );");
    result.push("  }");
    result.push("};");
    return result;
  }, [variable, data]);

  // Typing animation — reveal lines one by one
  useEffect(() => {
    if (visibleLines >= lines.length) {
      setGlowActive(true);
      return;
    }
    const delay = visibleLines === 0 ? 400 : 120 + Math.random() * 80;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines, lines.length]);

  // 3D mouse tilt
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 15, y: x * 15 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          backgroundColor: [
            "#c792ea",
            "#82aaff",
            "#c3e88d",
            "#ff9d00",
            "#f07178",
          ][Math.floor(Math.random() * 5)],
        },
      })),
    [],
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.codeBlock} ${glowActive ? styles.codeBlockGlow : ""}`}
      style={{
        opacity,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(0)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect */}
      <div
        className={styles.spotlight}
        style={{
          background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(130,170,255,0.08), transparent 70%)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} style={p.style} />
      ))}

      {/* Header dots */}
      <div className={styles.codeHeader}>
        <div className={styles.dot} style={{ backgroundColor: "#ff5f56" }} />
        <div className={styles.dot} style={{ backgroundColor: "#ffbd2e" }} />
        <div className={styles.dot} style={{ backgroundColor: "#27c93f" }} />
        <span className={styles.codeTitle}>developer.js</span>
      </div>

      {/* Code body */}
      <div className={styles.codeBody}>
        <code>
          {lines.slice(0, visibleLines).map((line, idx) => {
            const tokens = tokenize(line);
            const isNew = idx === visibleLines - 1;
            return (
              <div
                key={idx}
                className={`${styles.codeLine} ${isNew ? styles.codeLineNew : styles.codeLineVisible}`}
              >
                <span className={styles.lineNumber}>{idx + 1}</span>
                <span className={styles.lineContent}>
                  {tokens.map((token, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        color:
                          token.type === "indent"
                            ? "transparent"
                            : TOKEN_COLORS[token.type] || "#d4d4d4",
                        textShadow: [
                          "string",
                          "boolean",
                          "keyword",
                          "property",
                        ].includes(token.type)
                          ? `0 0 8px ${TOKEN_COLORS[token.type]}60`
                          : "none",
                      }}
                    >
                      {token.text}
                    </span>
                  ))}
                  {isNew && <span className={styles.cursor} />}
                </span>
              </div>
            );
          })}
        </code>
      </div>

      {/* Bottom glow bar */}
      <div className={styles.codeFooterGlow} />
    </div>
  );
};

export default CodeBlock;
