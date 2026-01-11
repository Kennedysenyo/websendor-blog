"use client";

import type React from "react";

import Link from "next/link";
import { processMarkdown, getHeadingClass } from "@/lib/markdown-processor";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processed = processMarkdown(content);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {processed.map((block, index) => (
        <div key={index}>
          {block.type === "heading" && (
            <h2 className={getHeadingClass(block.level || 2)}>
              {block.content}
            </h2>
          )}

          {block.type === "paragraph" && (
            <p className="text-gray-700 leading-relaxed mb-6">
              <InlineContent text={block.content || ""} />
            </p>
          )}

          {block.type === "codeBlock" && (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
              <code>{block.content}</code>
            </pre>
          )}

          {block.type === "blockquote" && (
            <blockquote className="border-l-4 border-brand-green pl-4 italic text-gray-600 my-6">
              <InlineContent text={block.content || ""} />
            </blockquote>
          )}

          {block.type === "list" && (
            <div className="mb-6">
              {block.ordered ? (
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  {block.children?.map((item, i) => (
                    <li key={i}>
                      <InlineContent text={item.content || ""} />
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {block.children?.map((item, i) => (
                    <li key={i}>
                      <InlineContent text={item.content || ""} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {block.type === "hr" && (
            <hr className="my-8 border-t-2 border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}

function InlineContent({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for bold text
    const boldMatch = remaining.match(/\*\*(.+?)\*\*|__(.+?)__/);
    if (boldMatch) {
      if (remaining.indexOf(boldMatch[0]) > 0) {
        parts.push(remaining.substring(0, remaining.indexOf(boldMatch[0])));
      }
      parts.push(
        <strong key={key++} className="font-bold text-gray-900">
          {boldMatch[1] || boldMatch[2]}
        </strong>
      );
      remaining = remaining.substring(
        remaining.indexOf(boldMatch[0]) + boldMatch[0].length
      );
      continue;
    }

    // Check for italic text
    const italicMatch = remaining.match(/\*(.+?)\*|_(.+?)_/);
    if (
      italicMatch &&
      !remaining.substring(0, remaining.indexOf(italicMatch[0])).endsWith("*")
    ) {
      if (remaining.indexOf(italicMatch[0]) > 0) {
        parts.push(remaining.substring(0, remaining.indexOf(italicMatch[0])));
      }
      parts.push(
        <em key={key++} className="italic text-gray-800">
          {italicMatch[1] || italicMatch[2]}
        </em>
      );
      remaining = remaining.substring(
        remaining.indexOf(italicMatch[0]) + italicMatch[0].length
      );
      continue;
    }

    // Check for code
    const codeMatch = remaining.match(/`(.+?)`/);
    if (codeMatch) {
      if (remaining.indexOf(codeMatch[0]) > 0) {
        parts.push(remaining.substring(0, remaining.indexOf(codeMatch[0])));
      }
      parts.push(
        <code
          key={key++}
          className="bg-gray-100 text-brand-blue px-2 py-1 rounded text-sm font-mono"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.substring(
        remaining.indexOf(codeMatch[0]) + codeMatch[0].length
      );
      continue;
    }

    // Check for links
    const linkMatch = remaining.match(/\[(.+?)\]$$(.+?)$$/);
    if (linkMatch) {
      if (remaining.indexOf(linkMatch[0]) > 0) {
        parts.push(remaining.substring(0, remaining.indexOf(linkMatch[0])));
      }
      parts.push(
        <Link
          key={key++}
          href={linkMatch[2]}
          className="text-brand-green font-semibold hover:underline"
        >
          {linkMatch[1]}
        </Link>
      );
      remaining = remaining.substring(
        remaining.indexOf(linkMatch[0]) + linkMatch[0].length
      );
      continue;
    }

    // No more patterns found, add remaining text
    parts.push(remaining);
    break;
  }

  return <>{parts}</>;
}
