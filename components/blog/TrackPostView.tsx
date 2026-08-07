"use client";

import { useEffect } from "react";
import { incrementPostViewsAction } from "@/lib/actions";

export default function TrackPostView({ postId }: { postId: string }) {
  useEffect(() => {
    const key = `viewed:${postId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void incrementPostViewsAction(postId);
  }, [postId]);

  return null;
}
