"use client";

import SubmitButton from "@/components/ui/SubmitButton";
import {
  googleSignInAction,
  registerAction,
  type ActionState,
} from "@/lib/actions";
import Link from "next/link";
import { useActionState } from "react";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/3 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-moz-teal disabled:opacity-60";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    {} as ActionState,
  );

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Conta
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl">Criar conta</h1>
        <p className="mt-3 text-sm text-moz-muted">
          Para escrever e enviar artigos da comunidade Mozcyber.
        </p>
      </div>

      <form action={googleSignInAction}>
        <SubmitButton
          type="submit"
          pendingLabel="A redirecionar…"
          disabled={pending}
          className="w-full rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:border-moz-teal hover:text-moz-teal"
        >
          Continuar com Google
        </SubmitButton>
      </form>

      <div className="flex items-center gap-3 text-xs text-white/40">
        <div className="h-px flex-1 bg-white/10" />
        ou email
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form action={formAction} className="space-y-4">
        <input
          name="name"
          required
          disabled={pending}
          placeholder="Nome"
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          disabled={pending}
          placeholder="Email"
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          disabled={pending}
          placeholder="Password (mín. 6)"
          className={inputClass}
        />
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        <SubmitButton
          type="submit"
          pendingLabel="A criar conta…"
          className="w-full rounded-lg bg-moz-teal px-4 py-3 text-sm font-semibold text-[#0b0f14] hover:bg-white"
        >
          Criar conta
        </SubmitButton>
      </form>

      <p className="text-sm text-white/50">
        Já tens conta?{" "}
        <Link href="/login" className="text-moz-teal hover:text-white">
          Entrar
        </Link>
      </p>
    </div>
  );
}
