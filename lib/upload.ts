import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = MAX_UPLOAD_BYTES;

export async function saveUploadedImage(
  file: File | null | undefined,
  folder: "covers" | "content",
) {
  if (!file || file.size === 0) return null;
  if (!ALLOWED.has(file.type)) {
    throw new Error("Formato inválido. Usa JPG, PNG, WebP ou GIF.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Imagem demasiado grande (máx. 5MB).");
  }

  const ext =
    file.type === "image/jpeg"
      ? "jpg"
      : file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : "gif";

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
