import PanelShell from "@/components/panel/PanelShell";
import { auth, signOut } from "@/auth";

const dashboardLinks = [
  { href: "/dashboard", label: "Início" },
  { href: "/dashboard/blog", label: "Os meus artigos" },
  { href: "/dashboard/blog/new", label: "Novo artigo" },
];

const adminLinks = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/blog", label: "Artigos" },
  { href: "/admin/users", label: "Utilizadores" },
  { href: "/admin/settings", label: "Definições" },
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

  return (
    <PanelShell
      variant={variant}
      links={variant === "admin" ? adminLinks : dashboardLinks}
      email={session?.user?.email}
      isAdmin={session?.user?.role === "ADMIN"}
      signOutAction={signOutAction}
    >
      {children}
    </PanelShell>
  );
}
