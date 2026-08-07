import PanelLayout from "@/components/panel/PanelLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout variant="dashboard">{children}</PanelLayout>;
}
