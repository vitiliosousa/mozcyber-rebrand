"use client";

import PanelListFilters, {
  POST_STATUS_FILTER_OPTIONS,
} from "@/components/panel/PanelListFilters";

export default function AdminBlogFilters({
  q,
  status,
}: {
  q: string;
  status: string;
}) {
  return (
    <PanelListFilters
      basePath="/admin/blog"
      q={q}
      selects={[
        {
          name: "status",
          value: status,
          allLabel: "Todos os estados",
          options: POST_STATUS_FILTER_OPTIONS,
        },
      ]}
    />
  );
}
