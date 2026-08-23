import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = MAX_UPLOAD_BYTES;

const cloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function extFor(type: string) {
  return type === "image/jpeg"
    ? "jpg"
    : type === "image/png"
      ? "png"
      : type === "image/webp"
        ? "webp"
        : "gif";
}

async function uploadToCloudinary(buffer: Buffer, folder: "covers" | "content") {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `mozcyber/${folder}`, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Falha no upload para o Cloudinary."));
          return;
        }
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

async function saveToLocalDisk(
  buffer: Buffer,
  type: string,
  folder: "covers" | "content",
) {
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${extFor(type)}`;
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

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

  const buffer = Buffer.from(await file.arrayBuffer());

  if (cloudinaryConfigured) {
    try {
      return await uploadToCloudinary(buffer, folder);
    } catch {
      throw new Error("Falha no upload da imagem. Tenta novamente.");
    }
  }

  // Sem Cloudinary configurado (ex: dev local) — grava em disco.
  // Nota: em hosting serverless isto não persiste entre deploys/instâncias.
  return saveToLocalDisk(buffer, file.type, folder);
}
