/**
 * Splits an element's text into per-line masked spans, the structure GSAP
 * needs for a "lines slide up behind a mask" headline reveal.
 *
 * GSAP's own SplitText is a paid Club plugin, so this does the same job for
 * the one case the site needs: plain-text headings, no nested markup.
 *
 * Result shape (per line):
 *   <span class="line-mask"><span class="line-inner">the words</span></span>
 */

const WORD_ATTR = "data-split-word";

export interface SplitResult {
  /** The .line-inner elements, in document order animate these. */
  lines: HTMLElement[];
  /** Puts the original text back. Call before re-splitting or unmounting. */
  revert: () => void;
}

export function splitLines(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return { lines: [], revert: () => { el.innerHTML = original; } };
  }

  // Pass 1 lay every word out individually so we can read its y position.
  el.innerHTML = words
    .map((w) => `<span ${WORD_ATTR}>${escapeHtml(w)}</span>`)
    .join(" ");

  const wordEls = Array.from(
    el.querySelectorAll<HTMLElement>(`[${WORD_ATTR}]`)
  );

  // Group words by vertical offset. Words on the same visual line share an
  // offsetTop; a tolerance absorbs sub-pixel differences from font metrics.
  const groups: string[][] = [];
  let currentTop: number | null = null;

  for (const wordEl of wordEls) {
    const top = wordEl.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 2) {
      currentTop = top;
      groups.push([]);
    }
    groups[groups.length - 1].push(wordEl.textContent ?? "");
  }

  // Pass 2 rebuild as masked lines.
  el.innerHTML = groups
    .map(
      (group) =>
        `<span class="line-mask"><span class="line-inner">${escapeHtml(
          group.join(" ")
        )}</span></span>`
    )
    .join("");

  const lines = Array.from(el.querySelectorAll<HTMLElement>(".line-inner"));

  return {
    lines,
    revert: () => {
      el.innerHTML = original;
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
