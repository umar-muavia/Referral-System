"use client";

import { useCallback, useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";
import { getErrorMessage } from "@/lib/utils";

export function useDashboard(enabled = true) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError("");

    try {
      const dashboard = await dashboardService.getDashboard();
      setData(dashboard);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load dashboard"));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
