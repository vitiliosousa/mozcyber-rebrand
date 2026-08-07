import { auth } from "@/auth";
import { saveUploadedImage } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Ficheiro em falta." }, { status: 400 });
    }

    const folderRaw = String(formData.get("folder") || "content");
    const folder = folderRaw === "covers" ? "covers" : "content";
    const url = await saveUploadedImage(file, folder);
    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha no upload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
