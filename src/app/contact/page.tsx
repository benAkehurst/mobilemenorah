import ProseDocument, { proseDocMetadata } from "@/components/ProseDocument";
import { contactDoc } from "@/lib/documents";

export const metadata = proseDocMetadata(contactDoc);

export default function ContactPage() {
  return <ProseDocument doc={contactDoc} />;
}
