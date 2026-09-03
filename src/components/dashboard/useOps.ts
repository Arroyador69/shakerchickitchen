"use client";

import { useCallback, useEffect, useState } from "react";
import type { OpsState } from "@/lib/types";

export function useOps() {
  const [data, setData] = useState<OpsState | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const res = await fetch("/api/ops");
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, []);

  const patch = useCallback(async (body: Record<string, unknown>) => {
    const res = await fetch("/api/ops", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) setData(await res.json());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, reload, patch };
}
