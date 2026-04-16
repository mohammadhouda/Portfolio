"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "api", href: "#api" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-[12px]">
        <motion.div
          className="absolute inset-0 bg-[rgba(10,10,15,0.85)]"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]"
          style={{ opacity: borderOpacity }}
        />

        <div className="relative max-w-300 mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-[1.1rem] text-accent no-underline tracking-[-0.02em]"
          >
            M
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex gap-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="bg-none border-none cursor-pointer font-mono text-[0.8rem] text-muted tracking-[0.04em] transition-colors duration-200 hover:text-fg p-0"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex sm:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-[22px] h-[1.5px] transition-[transform,background] duration-200"
              style={{
                background: isMenuOpen ? "var(--accent)" : "var(--text-secondary)",
                transform: isMenuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] bg-muted transition-opacity duration-200"
              style={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <span
              className="block w-[22px] h-[1.5px] transition-[transform,background] duration-200"
              style={{
                background: isMenuOpen ? "var(--accent)" : "var(--text-secondary)",
                transform: isMenuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[rgba(10,10,15,0.97)] flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleNavClick(link.href)}
              className="bg-none border-none cursor-pointer font-mono text-[1.4rem] text-fg tracking-[0.06em]"
            >
              {link.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
