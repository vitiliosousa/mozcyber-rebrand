import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Criar conta | Mozcyber",
};

export default function RegistoPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b0f14] px-6 py-12 text-white">
      <Link href="/" className="mb-10 text-sm text-white/40 hover:text-moz-teal">
        ← Voltar ao site
      </Link>
      <div className="flex flex-1 items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
