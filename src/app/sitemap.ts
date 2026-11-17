import type { MetadataRoute } from "next";
import { appConfig } from "../../app.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appConfig.appDomainName;
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms-and-conditions`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/info/cookies`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
