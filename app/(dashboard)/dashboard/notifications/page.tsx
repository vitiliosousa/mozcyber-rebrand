import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/lib/actions";
import PanelListFilters from "@/components/panel/PanelListFilters";
import ActionButton from "@/components/ui/ActionButton";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ q?: string; read?: string }>;
};

export default async function NotificationsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const read = (sp.read || "").trim();

  const where: Prisma.NotificationWhereInput = {
    userId: session.user.id,
    ...(read === "unread" ? { read: false } : {}),
    ...(read === "read" ? { read: true } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { body: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const notifications = await prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unread = await prisma.notification.count({
    where: { userId: session.user.id, read: false },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Notificações
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            {unread > 0
              ? `${unread} por ler`
              : "Aprovações, rejeições e alterações aos teus artigos."}
          </p>
        </div>
        {unread > 0 && (
          <ActionButton
            action={markAllNotificationsReadAction}
            label="Marcar todas como lidas"
            pendingLabel="…"
            className="rounded-lg border border-white/12 px-3 py-1.5 text-sm text-white/70 hover:border-moz-teal hover:text-moz-teal"
          />
        )}
      </div>

      <PanelListFilters
        basePath="/dashboard/notifications"
        q={q}
        searchPlaceholder="Pesquisar notificações…"
        selects={[
          {
            name: "read",
            value: read,
            allLabel: "Todas",
            options: [
              { value: "unread", label: "Por ler" },
              { value: "read", label: "Lidas" },
            ],
          },
        ]}
      />

      <div className="overflow-hidden rounded-xl border border-white/8 bg-[#101820]">
        {notifications.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-white/45">
            {q || read ? "Nenhuma notificação com estes filtros." : "Sem notificações."}
          </p>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`border-b border-white/6 px-4 py-4 last:border-0 md:px-5 ${
                  n.read ? "opacity-55" : "bg-moz-teal/[0.03]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!n.read && (
                        <span className="size-1.5 shrink-0 rounded-full bg-moz-teal" />
                      )}
                      <p className="text-sm font-medium text-white/90">
                        {n.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-white/50">{n.body}</p>
                    <p className="mt-2 text-xs text-white/30">
                      {n.createdAt.toLocaleString("pt-MZ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {n.href && (
                      <Link
                        href={n.href}
                        className="font-medium text-moz-teal hover:text-white"
                      >
                        Abrir
                      </Link>
                    )}
                    {!n.read && (
                      <ActionButton
                        action={markNotificationReadAction.bind(null, n.id)}
                        label="Lida"
                        pendingLabel="…"
                        className="text-white/40 hover:text-moz-teal"
                      />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
