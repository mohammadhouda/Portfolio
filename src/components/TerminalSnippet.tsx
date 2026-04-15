"use client";

import { useEffect, useState } from "react";

const COMMANDS = [
  "prisma migrate deploy",
  "docker compose up -d",
  "git push origin main",
  "npm run dev",
  "redis-cli ping → PONG",
  "pm2 start ecosystem.config.js",
  "node worker.js",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export default function TerminalSnippet() {
  const [displayText, setDisplayText] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const cmd = COMMANDS[cmdIndex];

    if (phase === "typing") {
      if (charIndex < cmd.length) {
        const t = setTimeout(() => {
          setDisplayText(cmd.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayText(cmd.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setCmdIndex((i) => (i + 1) % COMMANDS.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
      }
    }
  }, [phase, charIndex, cmdIndex]);

  return (
    <div
      style={{
        background: "rgba(17,17,24,0.8)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "0.82rem",
        maxWidth: "360px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "0.75rem",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#ff5f57",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#febc2e",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#28c840",
            display: "inline-block",
          }}
        />
        <span
          style={{
            marginLeft: "8px",
            color: "var(--text-secondary)",
            fontSize: "0.7rem",
            opacity: 0.5,
          }}
        >
          terminal
        </span>
      </div>

      {/* Command line */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "var(--accent)", opacity: 0.8, userSelect: "none" }}>
          ~
        </span>
        <span style={{ color: "var(--accent)", userSelect: "none" }}>❯</span>
        <span style={{ color: "var(--text-primary)" }}>{displayText}</span>
        <span className="cursor-blink" />
      </div>
    </div>
  );
}
