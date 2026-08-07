"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/upload";
import { isAdminEmail, slugify } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const postSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  category: z.string().min(2),
  image: z.string().optional(),
});

export type ActionState = {
  error?: string;
  success?: string;
};

async function resolveCoverImage(
  formData: FormData,
  previous?: string | null,
) {
  const cover = formData.get("cover");
  if (cover instanceof File && cover.size > 0) {
    return saveUploadedImage(cover, "covers");
  }

  const current = String(formData.get("image") || "").trim();
  if (current.startsWith("/uploads/")) return current;
  if (previous?.startsWith("/uploads/") && current === previous) return previous;
  if (!current) return null;
  if (current.startsWith("blob:")) return previous || null;
  return current.startsWith("/") || current.startsWith("http")
    ? current
    : previous || null;
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Dados inválidos. Verifica nome, email e password (mín. 6)." };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Já existe uma conta com este email." };

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
      role: isAdminEmail(email) ? "ADMIN" : "MEMBER",
    },
  });

  await signIn("credentials", {
    email,
    password: parsed.data.password,
    redirectTo: "/dashboard",
  });

  return {};
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email ou password incorrectos." };
    }
    throw error;
  }
  return {};
}

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user;
}

async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base) || "artigo";
  let n = 0;
  while (true) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const found = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!found || found.id === excludeId) return candidate;
    n += 1;
  }
}

export async function createPostAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const intent = String(formData.get("intent") || "draft");

  let coverUrl: string | null = null;
  try {
    coverUrl = await resolveCoverImage(formData);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Falha no upload da capa.",
    };
  }

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    image: coverUrl || undefined,
  });

  if (!parsed.success) {
    return { error: "Preenche título, excerpt, categoria e conteúdo." };
  }

  const slug = await uniqueSlug(parsed.data.title);
  const post = await prisma.post.create({
    data: {
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      category: parsed.data.category,
      image: coverUrl,
      slug,
      authorId: user.id,
      status: intent === "submit" ? "PENDING" : "DRAFT",
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/admin/blog");
  redirect(`/dashboard/blog/${post.id}`);
}

export async function updatePostAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const id = String(formData.get("id") || "");
  const intent = String(formData.get("intent") || "draft");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return { error: "Artigo não encontrado." };
  if (post.authorId !== user.id && user.role !== "ADMIN") {
    return { error: "Sem permissão." };
  }
  if (post.status === "PUBLISHED" && user.role !== "ADMIN") {
    return { error: "Artigo publicado — só admin pode editar." };
  }

  let coverUrl: string | null = post.image;
  try {
    coverUrl = await resolveCoverImage(formData, post.image);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Falha no upload da capa.",
    };
  }

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    image: coverUrl || undefined,
  });

  if (!parsed.success) {
    return { error: "Preenche título, excerpt, categoria e conteúdo." };
  }

  const slug =
    parsed.data.title !== post.title
      ? await uniqueSlug(parsed.data.title, id)
      : post.slug;

  let status = post.status;
  if (intent === "submit") status = "PENDING";
  if (
    (intent === "draft" || intent === "preview") &&
    post.status !== "PUBLISHED" &&
    post.status !== "PENDING"
  ) {
    status = "DRAFT";
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      category: parsed.data.category,
      image: coverUrl,
      slug,
      status,
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect(`/dashboard/blog/${id}`);
}

export async function submitForReviewAction(id: string) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;
  if (post.authorId !== user.id && user.role !== "ADMIN") return;
  if (post.status !== "DRAFT" && post.status !== "REJECTED" && user.role !== "ADMIN") {
    return;
  }

  await prisma.post.update({
    where: { id },
    data: { status: "PENDING" },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/admin/blog");
  revalidatePath(`/dashboard/blog/${id}`);
  redirect(`/dashboard/blog/${id}`);
}

export async function approvePostAction(id: string) {
  await requireAdmin();
  const post = await prisma.post.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

export async function rejectPostAction(id: string) {
  await requireAdmin();
  await prisma.post.update({
    where: { id },
    data: { status: "REJECTED", publishedAt: null },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/dashboard/blog");
}

export async function unpublishPostAction(id: string) {
  await requireAdmin();
  const post = await prisma.post.update({
    where: { id },
    data: { status: "DRAFT", publishedAt: null },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

export async function deletePostAction(id: string) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  const isOwner = post.authorId === user.id;
  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !(isOwner && post.status !== "PUBLISHED")) {
    return;
  }

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  if (post.slug) revalidatePath(`/blog/${post.slug}`);
}

export async function setUserRoleAction(userId: string, role: "MEMBER" | "ADMIN") {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}
