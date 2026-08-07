import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar | Mozcyber",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b0f14] px-6 py-12 text-white">
      <Link href="/" className="mb-10 text-sm text-white/40 hover:text-moz-teal">
        ← Voltar ao site
      </Link>
      <div className="flex flex-1 items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
