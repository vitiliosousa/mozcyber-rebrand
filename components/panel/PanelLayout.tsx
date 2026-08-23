import PanelShell from "@/components/panel/PanelShell";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

const dashboardLinks = [
  { href: "/dashboard", label: "Início" },
  { href: "/dashboard/blog", label: "Os meus artigos" },
  { href: "/dashboard/notifications", label: "Notificações" },
];

const adminLinks = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/blog", label: "Artigos" },
  { href: "/admin/blog/trash", label: "Lixeira" },
  { href: "/admin/comments", label: "Comentários" },
  { href: "/admin/users", label: "Utilizadores" },
];

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function PanelLayout({
  variant,
  children,
}: {
  variant: "dashboard" | "admin";
  children: React.ReactNode;
}) {
  const session = await auth();
  const unread =
    session?.user?.id && variant === "dashboard"
      ? await prisma.notification.count({
          where: { userId: session.user.id, read: false },
        })
      : 0;

  const pendingComments =
    variant === "admin" && session?.user?.role === "ADMIN"
      ? await prisma.comment.count({ where: { status: "PENDING" } })
      : 0;

  const links =
    variant === "admin"
      ? adminLinks.map((link) =>
          link.href === "/admin/comments" && pendingComments > 0
            ? { ...link, label: `Comentários (${pendingComments})` }
            : link,
        )
      : dashboardLinks.map((link) =>
          link.href === "/dashboard/notifications" && unread > 0
            ? { ...link, label: `Notificações (${unread})` }
            : link,
        );

  return (
    <PanelShell
      variant={variant}
      links={links}
      email={session?.user?.email}
      name={session?.user?.name}
      image={session?.user?.image}
      isAdmin={session?.user?.role === "ADMIN"}
      signOutAction={signOutAction}
    >
      {children}
    </PanelShell>
  );
}
