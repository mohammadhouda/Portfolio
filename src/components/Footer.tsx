"use client";

import Rule from "./motion/Rule";
import { scrollToTarget } from "../lib/scroll";
import { profile } from "../lib/profile";

export default function Footer() {
  return (
    <footer className="shell pb-10">
      <Rule className="mb-6" />

      <div className="grid-12 gap-y-4">
        <p className="t-meta col-span-full text-fg-4 md:col-span-4">
          © {new Date().getFullYear()} {profile.name}
        </p>

        {/* A colophon: what the page is set in. Cheap to include, and it
            says a person made deliberate choices here. */}
        <p className="t-meta col-span-full text-fg-4 md:col-span-5">
          Set in Archivo, Inter &amp; IBM Plex Mono
        </p>

        <div className="col-span-full md:col-span-3 md:text-right">
          <button
            onClick={() => scrollToTarget("#hero")}
            className="group t-meta cursor-pointer border-0 bg-transparent p-0 text-fg-3 transition-colors duration-300 hover-fine:hover:text-accent"
          >
            <span className="link-undraw">Back to top</span>
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
