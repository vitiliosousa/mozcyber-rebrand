export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Definições</h1>
      <p className="mt-3 text-moz-muted">
        Configuração do site (em breve).
      </p>

      <ul className="mt-10 space-y-4 text-sm text-white/70">
        <li>
          <span className="text-moz-muted">AUTH_URL / Google OAuth</span> — via
          variáveis de ambiente (`.env`)
        </li>
        <li>
          <span className="text-moz-muted">ADMIN_EMAIL</span> — emails que
          recebem papel admin no registo
        </li>
        <li>
          <span className="text-moz-muted">Base de dados</span> — PostgreSQL (
          `blogcyber`)
        </li>
      </ul>
    </div>
  );
}
