import { appConfig } from "../../app.config";

/**
 * Placeholder for adverts, controlled by `appConfig.ads.enabled`.
 * Renders nothing while ads are disabled. When an ad network is chosen, load
 * its script (and consent tool) here and keep the fixed minimum height so the
 * page doesn't shift when the ad loads.
 */
export default function AdSlot({ id }: { id: string }) {
  if (!appConfig.ads.enabled) return null;
  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={id}
      className="mx-auto my-8 flex min-h-[250px] w-full max-w-3xl items-center justify-center"
    />
  );
}
