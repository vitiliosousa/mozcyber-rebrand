"use client";

import { useRef, useState } from "react";

type Props = {
  defaultImage?: string | null;
};

export default function CoverUpload({ defaultImage }: Props) {
  const [savedUrl, setSavedUrl] = useState(defaultImage || "");
  const [preview, setPreview] = useState(defaultImage || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    setError("");
    setUploading(true);
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "covers");
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Falha no upload.");
      }
      setSavedUrl(data.url);
      setPreview(data.url);
    } catch (err) {
      setPreview(savedUrl || "");
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="group relative">
      <input type="hidden" name="image" value={savedUrl} readOnly />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className={`relative flex w-full overflow-hidden transition-colors disabled:opacity-60 ${
          preview
            ? "aspect-[2.2/1] bg-white/5"
            : "h-14 items-center justify-center border border-dashed border-white/15 text-sm text-white/35 hover:border-moz-teal/40 hover:text-white/60"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Capa" className="size-full object-cover" />
        ) : (
          <span>{uploading ? "A enviar…" : "Adicionar capa"}</span>
        )}
        {preview && (
          <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-md bg-[#0b0f14]/90 px-2.5 py-1 text-xs text-white">
              {uploading ? "A enviar…" : "Trocar capa"}
            </span>
          </span>
        )}
      </button>

      {preview && !uploading && (
        <button
          type="button"
          onClick={() => {
            setPreview("");
            setSavedUrl("");
            setError("");
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="mt-2 text-xs text-white/35 hover:text-red-400"
        >
          Remover capa
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onFile(file);
        }}
      />
    </div>
  );
}
