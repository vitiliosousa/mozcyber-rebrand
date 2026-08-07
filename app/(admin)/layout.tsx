import PanelLayout from "@/components/panel/PanelLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout variant="admin">{children}</PanelLayout>;
}
