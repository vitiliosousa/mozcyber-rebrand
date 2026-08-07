"use client";

import { useRef, useState } from "react";

type Props = {
  defaultImage?: string | null;
};

export default function CoverUpload({ defaultImage }: Props) {
  const [savedUrl, setSavedUrl] = useState(defaultImage || "");
  const [preview, setPreview] = useState(defaultImage || "");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moz-muted">
        Imagem de capa
      </label>

      <input type="hidden" name="image" value={savedUrl} readOnly />

      <div className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/3 p-3">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded bg-white/5">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Pré-visualização da capa"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-[10px] text-white/35">
              Sem capa
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:border-moz-teal hover:text-moz-teal"
            >
              {preview ? "Trocar" : "Carregar"}
            </button>
            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setSavedUrl("");
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="rounded-lg px-3 py-1.5 text-xs text-red-400 hover:text-red-300"
              >
                Remover
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-white/40">
            JPG, PNG, WebP ou GIF · máx. 5MB
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        name="cover"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setPreview(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}
