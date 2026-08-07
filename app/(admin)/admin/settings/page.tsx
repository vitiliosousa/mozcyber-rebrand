import { BLOG_CATEGORIES } from "@/lib/blog";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Definições</h1>
      <p className="mt-3 text-moz-muted">
        Configuração activa do blog e do ambiente.
      </p>

      <section className="mt-10">
        <h2 className="text-lg text-moz-teal">Categorias do blog</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <li
              key={c}
              className="rounded border border-white/15 px-3 py-1.5 text-sm text-white/70"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-white/40">
          Definidas em <code className="text-white/60">lib/blog.ts</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg text-moz-teal">Uploads</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li>Formatos: JPG, PNG, WebP, GIF</li>
          <li>Tamanho máximo: 5 MB</li>
          <li>Pastas: <code className="text-white/50">/uploads/covers</code> e{" "}
            <code className="text-white/50">/uploads/content</code>
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg text-moz-teal">Fluxo editorial</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/70">
          <li>Autor cria rascunho e pré-visualiza</li>
          <li>Envia para revisão (PENDING)</li>
          <li>Admin aprova (PUBLISHED) ou rejeita com motivo</li>
          <li>Autor recebe notificação e pode corrigir / reenviar</li>
          <li>Apagar envia para lixeira (soft delete)</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg text-moz-teal">Ambiente</h2>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          <li>
            <span className="text-moz-muted">AUTH_URL / Google OAuth</span> — via
            `.env`
          </li>
          <li>
            <span className="text-moz-muted">ADMIN_EMAIL</span> — emails com
            papel admin no registo
          </li>
          <li>
            <span className="text-moz-muted">Base de dados</span> — PostgreSQL
          </li>
        </ul>
      </section>
    </div>
  );
}
