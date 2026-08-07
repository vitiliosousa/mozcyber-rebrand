import { setUserRoleAction } from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
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

      <ul className="mt-10 border-t border-white/10">
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
