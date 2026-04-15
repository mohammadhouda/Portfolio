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
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10, 10, 15, 0.85)",
            opacity: bgOpacity,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            opacity: borderOpacity,
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--accent)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            M
          </Link>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="hidden sm:flex"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: isMenuOpen ? "var(--accent)" : "var(--text-secondary)",
                transition: "transform 0.2s, background 0.2s",
                transform: isMenuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "var(--text-secondary)",
                transition: "opacity 0.2s",
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: isMenuOpen ? "var(--accent)" : "var(--text-secondary)",
                transition: "transform 0.2s, background 0.2s",
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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "rgba(10,10,15,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "1.4rem",
                color: "var(--text-primary)",
                letterSpacing: "0.06em",
              }}
            >
              {link.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
