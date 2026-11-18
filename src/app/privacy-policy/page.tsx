import ProseDocument, { proseDocMetadata } from "@/components/ProseDocument";
import { privacyDoc } from "@/lib/documents";

export const metadata = proseDocMetadata(privacyDoc);

export default function PrivacyPolicyPage() {
  return <ProseDocument doc={privacyDoc} />;
}
