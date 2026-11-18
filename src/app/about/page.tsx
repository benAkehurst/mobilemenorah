import ProseDocument, { proseDocMetadata } from "@/components/ProseDocument";
import { aboutDoc } from "@/lib/documents";

export const metadata = proseDocMetadata(aboutDoc);

export default function AboutPage() {
  return <ProseDocument doc={aboutDoc} />;
}
