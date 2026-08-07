import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl">Notificações</h1>
          <p className="mt-3 text-moz-muted">
            Aprovações, rejeições e alterações aos teus artigos.
          </p>
        </div>
        {notifications.some((n) => !n.read) && (
          <ActionButton
            action={markAllNotificationsReadAction}
            label="Marcar todas como lidas"
            pendingLabel="…"
            className="text-sm text-moz-teal hover:text-white"
          />
        )}
      </div>

      <ul className="mt-10 border-t border-white/10">
        {notifications.length === 0 && (
          <li className="py-10 text-moz-muted">Sem notificações.</li>
        )}
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`border-b border-white/10 py-5 ${
              n.read ? "opacity-60" : ""
            }`}
          >
            <p className="text-base font-semibold">{n.title}</p>
            <p className="mt-1 text-sm text-white/55">{n.body}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="text-white/35">
                {n.createdAt.toLocaleString("pt-MZ")}
              </span>
              {n.href && (
                <Link href={n.href} className="text-moz-teal hover:text-white">
                  Abrir
                </Link>
              )}
              {!n.read && (
                <ActionButton
                  action={markNotificationReadAction.bind(null, n.id)}
                  label="Marcar lida"
                  pendingLabel="…"
                  className="text-white/50 hover:text-moz-teal"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
