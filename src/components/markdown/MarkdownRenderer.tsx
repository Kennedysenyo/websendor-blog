// components/markdown/MarkdownRenderer.tsx
import React, { ReactNode, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { MediaProcessor } from "@/processors/media-processor";
import { MediaConfig } from "@/types/markdown";

import { MarkdownImage } from "./MediaComponents/MarkdownImage";
import { YouTubeEmbed } from "./MediaComponents/YoutubeEmbed";
import { SocialEmbed } from "./MediaComponents/SocialEmbed";
import { FileDownload } from "./MediaComponents/FileDownload";
import { ExternalLink } from "./MediaComponents/ExternalLinks";

import { remarkMediaBlocks } from "@/lib/remark-media-blocks";
import { rehypeMedia } from "@/lib/rehype-media";

interface MarkdownRendererProps {
  content: string;
  mediaConfig?: MediaConfig;
  className?: string;
}

type ExtendedComponents = Components & {
  media?: React.FC<{ node: { url: string } }>;
};

// -----------------------
// Helper: Detect block-level elements
// -----------------------
function isBlockElement(child: ReactNode): boolean {
  if (!React.isValidElement(child)) return false;

  // HTML block elements
  const blockTypes = [
    "div",
    "figure",
    "iframe",
    "pre",
    "blockquote",
    "ul",
    "ol",
    "li",
    "table",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];

  // Custom media components (they render block elements)
  const customBlockComponents = [
    YouTubeEmbed,
    SocialEmbed,
    FileDownload,
    MarkdownImage,
  ];

  if (typeof child.type === "string") return blockTypes.includes(child.type);
  if (customBlockComponents.includes(child.type as any)) return true;

  return false;
}

// -----------------------
// Custom Paragraph component
// -----------------------
const MarkdownParagraph: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);

  const newChildren: ReactNode[] = [];
  let inlineGroup: ReactNode[] = [];

  childrenArray.forEach((child, index) => {
    if (isBlockElement(child)) {
      if (inlineGroup.length) {
        newChildren.push(
          <p key={`p-${newChildren.length}`} {...props}>
            {inlineGroup}
          </p>
        );
        inlineGroup = [];
      }
      if (React.isValidElement(child)) {
        newChildren.push(React.cloneElement(child, { key: `block-${index}` }));
      } else {
        newChildren.push(child);
      }
    } else {
      inlineGroup.push(child);
    }
  });

  if (inlineGroup.length) {
    newChildren.push(
      <p key={`p-${newChildren.length}`} {...props}>
        {inlineGroup}
      </p>
    );
  }

  return <>{newChildren}</>;
};

// -----------------------
// MarkdownRenderer component
// -----------------------
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  mediaConfig = {},
  className = "prose prose-lg max-w-none",
}) => {
  const components: ExtendedComponents = {
    media: ({ node }: any) => {
      const url = node.properties.url;

      if (!MediaProcessor.isURLAllowed(url)) {
        return <span className="text-red-500">[Blocked media]</span>;
      }

      const type = MediaProcessor.detectMediaType(url);

      switch (type) {
        case "youtube": {
          const id = MediaProcessor.extractYouTubeId(url);
          return id ? <YouTubeEmbed videoId={id} config={mediaConfig} /> : null;
        }

        case "vimeo":
        case "spotify":
        case "twitter":
          return <SocialEmbed url={url} type={type} config={mediaConfig} />;

        case "image":
          return <MarkdownImage src={url} alt="" config={mediaConfig} />;

        case "file": {
          const file = MediaProcessor.getFileInfo(url);
          return (
            <FileDownload url={url} fileName={file.name} fileType={file.type} />
          );
        }

        default:
          return <ExternalLink href={url}>{url}</ExternalLink>;
      }
    },

    // Images
    img: ({ src, alt, title, ...props }) => {
      if (
        !src ||
        typeof src !== "string" ||
        !MediaProcessor.isURLAllowed(src)
      ) {
        return <span className="text-red-500">[Unsafe Image Blocked]</span>;
      }

      return (
        <MarkdownImage
          src={src}
          alt={alt || ""}
          title={title}
          config={mediaConfig}
          className="my-4"
        />
      );
    },

    // Links (media and external)
    a: ({ href, children }) => {
      if (!href) return <a>{children}</a>;
      if (!MediaProcessor.isURLAllowed(href)) return <span>[Blocked]</span>;
      return <ExternalLink href={href}>{children}</ExternalLink>;
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMediaBlocks]}
        rehypePlugins={[rehypeMedia, rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
