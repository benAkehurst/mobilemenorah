import ProseDocument, { proseDocMetadata } from "@/components/ProseDocument";
import { cookiesDoc } from "@/lib/documents";

export const metadata = proseDocMetadata(cookiesDoc);

export default function CookiesPage() {
  return <ProseDocument doc={cookiesDoc} />;
}
