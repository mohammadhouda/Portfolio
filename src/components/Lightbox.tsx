"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { setScrollLocked } from "../lib/scroll";

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
}

/**
 * Fullscreen image viewer.
 *
 * Handles the three things the previous version missed: it locks page scroll
 * (Lenis kept scrolling underneath), it traps focus inside the dialog, and it
 * restores focus to whatever opened it on close.
 */
export default function Lightbox({
  images,
  index,
  title,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(index);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    openerRef.current = document.activeElement;
    setScrollLocked(true);
    dialogRef.current?.focus();

    return () => {
      setScrollLocked(false);
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowLeft") return prev();
      if (e.key === "ArrowRight") return next();

      // Focus trap keep Tab cycling within the dialog.
      if (e.key === "Tab") {
        const focusables =
          dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const multiple = images.length > 1;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex flex-col bg-base"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="shell flex shrink-0 items-center justify-between py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="t-meta text-fg-3">
          {title}
          {multiple && (
            <span className="ml-4 text-fg-4">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          )}
        </span>

        <button
          onClick={onClose}
          className="t-meta link-draw cursor-pointer border-0 bg-transparent p-0 text-fg transition-colors duration-300 hover-fine:hover:text-accent"
        >
          Close ✕
        </button>
      </div>

      {/* Image */}
      <div
        className="relative min-h-0 flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={images[current]}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          fill
          sizes="100vw"
          className="object-contain px-[var(--gutter)]"
        />
      </div>

      {/* Controls */}
      {multiple && (
        <div
          className="shell flex shrink-0 items-center justify-between py-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={prev}
            className="t-meta link-draw cursor-pointer border-0 bg-transparent p-0 text-fg transition-colors duration-300 hover-fine:hover:text-accent"
          >
            ← Previous
          </button>
          <button
            onClick={next}
            className="t-meta link-draw cursor-pointer border-0 bg-transparent p-0 text-fg transition-colors duration-300 hover-fine:hover:text-accent"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
