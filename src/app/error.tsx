"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import ErrorContent from "@/components/ErrorContent";

/**
 * Catches rendering errors in any page (for example the interactive
 * menorah) and shows them inside the normal header and footer. Errors in the
 * root layout itself are handled by global-error.tsx.
 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorContent error={error} onRetry={retry} />;
}
