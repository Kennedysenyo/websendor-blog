"use client";

/**
 * Comprehensive Markdown Processor
 * Handles all standard markdown formats including:
 * - Headings (h1-h6)
 * - Emphasis (bold, italic, bold-italic)
 * - Lists (ordered and unordered, nested)
 * - Code blocks and inline code
 * - Blockquotes
 * - Links
 * - Horizontal rules
 * - Line breaks
 * - Paragraphs
 */

export interface ProcessedMarkdown {
  type:
    | "heading"
    | "paragraph"
    | "bold"
    | "italic"
    | "code"
    | "codeBlock"
    | "list"
    | "blockquote"
    | "hr"
    | "link";
  level?: number; // For headings
  content?: string;
  children?: ProcessedMarkdown[];
  href?: string; // For links
  ordered?: boolean; // For lists
}

export function processMarkdown(markdown: string): ProcessedMarkdown[] {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const processed: ProcessedMarkdown[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      processed.push({
        type: "heading",
        level: headingMatch[1].length,
        content: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Horizontal rules
    if (/^([*\-_]){3,}$/.test(trimmed)) {
      processed.push({ type: "hr" });
      i++;
      continue;
    }

    // Code blocks (fenced with ```)
    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // Skip closing ```
      processed.push({
        type: "codeBlock",
        content: codeLines.join("\n"),
      });
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith(">")) {
      const blockquoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        blockquoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      processed.push({
        type: "blockquote",
        content: blockquoteLines.join("\n"),
      });
      continue;
    }

    // Lists (ordered and unordered)
    if (/^[*+-]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const isOrdered = /^\d+\./.test(trimmed);
      const listItems: string[] = [];

      while (i < lines.length) {
        const currentLine = lines[i].trim();
        if (
          !currentLine ||
          (!isOrdered && !/^[*+-]\s+/.test(currentLine)) ||
          (isOrdered && !/^\d+\.\s+/.test(currentLine))
        ) {
          break;
        }

        if (isOrdered) {
          listItems.push(currentLine.replace(/^\d+\.\s+/, ""));
        } else {
          listItems.push(currentLine.replace(/^[*+-]\s+/, ""));
        }
        i++;
      }

      processed.push({
        type: "list",
        ordered: isOrdered,
        children: listItems.map((item) => ({
          type: "paragraph" as const,
          content: item,
        })),
      });
      continue;
    }

    // Regular paragraphs
    const paragraphLines: string[] = [line];
    i++;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (
        !nextLine ||
        nextLine.startsWith("#") ||
        nextLine.startsWith(">") ||
        /^[*+-]\s+/.test(nextLine) ||
        /^\d+\.\s+/.test(nextLine) ||
        /^([*\-_]){3,}$/.test(nextLine)
      ) {
        break;
      }
      paragraphLines.push(lines[i]);
      i++;
    }

    const paragraphContent = paragraphLines.join(" ").trim();
    if (paragraphContent) {
      processed.push({
        type: "paragraph",
        content: paragraphContent,
      });
    }
  }

  return processed;
}

export function renderInlineMarkdown(
  text: string
): (string | { type: string; content: string; href?: string })[] {
  const parts: (string | { type: string; content: string; href?: string })[] =
    [];
  const remaining = text;
  const lastIndex = 0;

  // Bold and italic patterns
  const patterns = [
    { regex: /\*\*\*(.+?)\*\*\*/g, type: "boldItalic" }, // ***text***
    { regex: /___(.+?)___/g, type: "boldItalic" }, // ___text___
    { regex: /\*\*(.+?)\*\*/g, type: "bold" }, // **text**
    { regex: /__(.+?)__/g, type: "bold" }, // __text__
    { regex: /\*(.+?)\*/g, type: "italic" }, // *text*
    { regex: /_(.+?)_/g, type: "italic" }, // _text_
    { regex: /`(.+?)`/g, type: "code" }, // `code`
    { regex: /\[(.+?)\]$$(.+?)$$/g, type: "link" }, // [text](url)
  ];

  // Process text with patterns
  let result = text;
  for (const pattern of patterns) {
    result = result.replace(pattern.regex, (match, ...args) => {
      const content = args[0];
      if (pattern.type === "link") {
        const href = args[1];
        return `__LINK_${parts.length}__`;
      }
      return `__${pattern.type.toUpperCase()}_${parts.length}__`;
    });
  }

  // Build the final parts array
  const tokens = result.split(/(__[A-Z_]+_\d+__)/g);
  for (const token of tokens) {
    if (token.match(/^__[A-Z_]+_\d+__$/)) {
      // This is a placeholder for inline markup
      const match = text.match(
        /(\*\*\*(.+?)\*\*\*|___(.+?)___|__(.+?)__|[*_](.+?)[*_]|`(.+?)`|\[(.+?)\]$$(.+?)$$)/
      );
      if (match) {
        if (match[0].startsWith("***") || match[0].startsWith("___")) {
          parts.push({
            type: "boldItalic",
            content: match[2] || match[3],
          });
        } else if (match[0].startsWith("__") || match[0].startsWith("**")) {
          parts.push({
            type: "bold",
            content: match[4] || match[2],
          });
        } else if (match[0].startsWith("[")) {
          parts.push({
            type: "link",
            content: match[8] || "",
            href: match[9] || "",
          });
        } else if (match[0].startsWith("`")) {
          parts.push({
            type: "code",
            content: match[6] || "",
          });
        } else {
          parts.push({
            type: "italic",
            content: match[5] || "",
          });
        }
        text = text.substring(match.index! + match[0].length);
      }
    } else if (token) {
      parts.push(token);
    }
  }

  return parts.length > 0 ? parts.filter((p) => p !== "") : [text];
}

export function getHeadingClass(level: number): string {
  const classes: Record<number, string> = {
    1: "text-4xl md:text-5xl font-serif font-bold text-brand-blue leading-tight",
    2: "text-3xl md:text-4xl font-serif font-bold text-brand-blue mt-8 mb-4 leading-tight",
    3: "text-2xl md:text-3xl font-serif font-bold text-brand-blue mt-6 mb-3 leading-tight",
    4: "text-xl md:text-2xl font-serif font-bold text-brand-blue mt-5 mb-2 leading-tight",
    5: "text-lg md:text-xl font-serif font-bold text-brand-blue mt-4 mb-2 leading-tight",
    6: "text-base md:text-lg font-serif font-bold text-brand-blue mt-3 mb-2 leading-tight",
  };
  return classes[level] || classes[2];
}
