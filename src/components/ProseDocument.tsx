import Link from "next/link";
import type { Block, Inline, ProseDoc } from "@/lib/documents";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import Prose from "./Prose";

function InlineContent({ parts }: { parts: Inline[] }) {
  return parts.map((part, i) => {
    if (typeof part === "string") return part;
    return part.href.startsWith("/") ? (
      <Link key={i} href={part.href}>
        {part.text}
      </Link>
    ) : (
      <a key={i} href={part.href}>
        {part.text}
      </a>
    );
  });
}

function BlockContent({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p className={block.note ? "text-sm text-muted" : undefined}>
          <InlineContent parts={block.content} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineContent parts={item} />
            </li>
          ))}
        </ul>
      );
  }
}

/** Metadata for a Long Document page. */
export function proseDocMetadata(doc: ProseDoc) {
  return pageMetadata({ title: doc.title, description: doc.description, path: doc.path });
}

/** Renders a Long Document page (About, Contact, Privacy, Terms, Cookies). */
export default function ProseDocument({ doc }: { doc: ProseDoc }) {
  return (
    <Prose title={doc.heading}>
      <JsonLd
        data={pageSchema({
          path: doc.path,
          name: doc.title,
          description: doc.description,
          type: doc.schemaType,
        })}
      />
      {doc.blocks.map((block, i) => (
        <BlockContent key={i} block={block} />
      ))}
    </Prose>
  );
}
