"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy(message: string) {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback(message);
    } catch {
      setFeedback("Não foi possível copiar o link");
    }
    setTimeout(() => setFeedback(null), 2500);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text: title, url });
      setOpen(false);
    } catch {
      /* cancelado pelo utilizador */
    }
  }

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const wa = encodeURIComponent(`${title}\n${url}`);

  const item =
    "block w-full px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-moz-teal";

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
      >
        Partilhar
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-30 mt-2 min-w-[12.5rem] rounded-lg border border-white/15 bg-[#0b0f14] py-1 shadow-2xl shadow-black/60"
        >
          {canNativeShare && (
            <button
              type="button"
              role="menuitem"
              className={item}
              onClick={() => void nativeShare()}
            >
              Partilhar no dispositivo
            </button>
          )}
          <a
            role="menuitem"
            className={item}
            href={`https://wa.me/?text=${wa}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            role="menuitem"
            className={item}
            href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <button
            type="button"
            role="menuitem"
            className={item}
            onClick={() => void copy("Link copiado — cola no Instagram")}
          >
            Instagram
          </button>
          <a
            role="menuitem"
            className={item}
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            role="menuitem"
            className={item}
            href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter / X
          </a>
          <button
            type="button"
            role="menuitem"
            className={item}
            onClick={() => void copy("Link copiado")}
          >
            Copiar link
          </button>
        </div>
      )}

      {feedback && (
        <p className="mt-2 text-xs text-moz-teal" role="status">
          {feedback}
        </p>
      )}
    </div>
  );
}
