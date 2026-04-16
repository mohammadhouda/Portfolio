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
    <div className="bg-[rgba(17,17,24,0.8)] border border-[rgba(255,255,255,0.06)] rounded-lg px-5 py-4 font-mono text-[0.82rem] max-w-90 backdrop-blur-sm">
      {/* Window chrome */}
      <div className="flex gap-1.5 mb-3 items-center">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-muted text-[0.7rem] opacity-50">terminal</span>
      </div>

      {/* Command line */}
      <div className="flex items-center gap-1.5">
        <span className="text-accent opacity-80 select-none">~</span>
        <span className="text-accent select-none">❯</span>
        <span className="text-fg">{displayText}</span>
        <span className="cursor-blink" />
      </div>
    </div>
  );
}
