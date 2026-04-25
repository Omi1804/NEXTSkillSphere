import { Fragment, type ReactNode } from "react";

type MessageBlock =
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] };

const unorderedListPattern = /^\s*[-*]\s+/;
const orderedListPattern = /^\s*\d+[.)]\s+/;

const renderInlineFormatting = (text: string): ReactNode[] => {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={`inline-bold-${index}`} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`inline-text-${index}`}>{part}</Fragment>;
  });
};

const splitMessageBlocks = (content: string): MessageBlock[] => {
  const blocks: MessageBlock[] = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (unorderedListPattern.test(lines[index])) {
      const items: string[] = [];
      while (index < lines.length && unorderedListPattern.test(lines[index])) {
        items.push(lines[index].replace(unorderedListPattern, "").trim());
        index += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (orderedListPattern.test(lines[index])) {
      const items: string[] = [];
      while (index < lines.length && orderedListPattern.test(lines[index])) {
        items.push(lines[index].replace(orderedListPattern, "").trim());
        index += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !unorderedListPattern.test(lines[index]) &&
      !orderedListPattern.test(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join("\n") });
  }

  return blocks;
};

export const renderAssistantContent = (content: string) => {
  const blocks = splitMessageBlocks(content);

  return blocks.map((block, index) => {
    if (block.type === "unordered-list") {
      return (
        <ul key={`assistant-ul-${index}`} className="list-disc space-y-1 pl-5">
          {block.items.map((item, itemIndex) => (
            <li key={`assistant-ul-item-${index}-${itemIndex}`}>{renderInlineFormatting(item)}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "ordered-list") {
      return (
        <ol key={`assistant-ol-${index}`} className="list-decimal space-y-1 pl-5">
          {block.items.map((item, itemIndex) => (
            <li key={`assistant-ol-item-${index}-${itemIndex}`}>{renderInlineFormatting(item)}</li>
          ))}
        </ol>
      );
    }

    return (
      <p key={`assistant-p-${index}`} className="whitespace-pre-line">
        {renderInlineFormatting(block.text)}
      </p>
    );
  });
};
