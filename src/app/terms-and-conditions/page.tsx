import ProseDocument, { proseDocMetadata } from "@/components/ProseDocument";
import { termsDoc } from "@/lib/documents";

export const metadata = proseDocMetadata(termsDoc);

export default function TermsPage() {
  return <ProseDocument doc={termsDoc} />;
}
