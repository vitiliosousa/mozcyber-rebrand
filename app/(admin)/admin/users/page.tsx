import { setUserRoleAction } from "@/lib/actions";
import PanelListFilters from "@/components/panel/PanelListFilters";
import ActionButton from "@/components/ui/ActionButton";
import { prisma } from "@/lib/prisma";
import type { Prisma, Role } from "@prisma/client";

type Props = {
  searchParams: Promise<{ q?: string; role?: string }>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const role = (sp.role || "").trim() as Role | "";

  const where: Prisma.UserWhereInput = {
    ...(role ? { role } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Utilizadores</h1>
      <p className="mt-3 text-moz-muted">
        Gere papéis de membro e administrador.
      </p>

      <div className="mt-6">
        <PanelListFilters
          basePath="/admin/users"
          q={q}
          searchPlaceholder="Pesquisar nome ou email…"
          selects={[
            {
              name: "role",
              value: role,
              allLabel: "Todos os papéis",
              options: [
                { value: "MEMBER", label: "Membro" },
                { value: "ADMIN", label: "Admin" },
              ],
            },
          ]}
        />
      </div>

      <ul className="mt-6 border-t border-white/10">
        {users.length === 0 && (
          <li className="py-10 text-moz-muted">
            Nenhum utilizador com estes filtros.
          </li>
        )}
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-5"
          >
            <div>
              <p>{user.name || "Sem nome"}</p>
              <p className="mt-1 text-sm text-white/45">{user.email}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-moz-teal">{user.role}</span>
              {user.role === "MEMBER" ? (
                <ActionButton
                  action={setUserRoleAction.bind(null, user.id, "ADMIN")}
                  label="Tornar admin"
                  pendingLabel="A actualizar…"
                  className="hover:text-moz-teal"
                />
              ) : (
                <ActionButton
                  action={setUserRoleAction.bind(null, user.id, "MEMBER")}
                  label="Remover admin"
                  pendingLabel="A actualizar…"
                  className="hover:text-moz-teal"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
