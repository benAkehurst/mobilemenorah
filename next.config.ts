import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Preview deployments load the Vercel Toolbar from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";
const toolbar = isPreview ? " https://vercel.live" : "";

// No nonces, so every page can stay static. 'unsafe-inline' covers the
// pre-paint theme script, the JSON-LD blocks and Next's inline bootstrap.
// Vercel Analytics and Speed Insights load from same-origin /_vercel paths.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}${toolbar}`,
  `style-src 'self' 'unsafe-inline'${toolbar}`,
  `img-src 'self' blob: data:${isPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${isDev ? " https://va.vercel-scripts.com" : ""}${
    isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""
  }`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
