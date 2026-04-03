"use client";

import { useEffect } from "react";
import { trackEvent, type TrackingEventName } from "@/src/lib/tracking";

interface TrackOnMountProps {
  event: TrackingEventName;
  payload: Record<string, unknown>;
}

export function TrackOnMount({ event, payload }: TrackOnMountProps) {
  useEffect(() => {
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
}
