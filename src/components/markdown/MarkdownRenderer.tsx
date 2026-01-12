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

interface MarkdownRendererProps {
  content: string;
  mediaConfig?: MediaConfig;
  className?: string;
}

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
  const components: Components = {
    // Paragraphs
    p: MarkdownParagraph,

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
    a: ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>;

      if (!MediaProcessor.isURLAllowed(href)) {
        return <span className="text-red-500">[Unsafe Link Blocked]</span>;
      }

      const mediaType = MediaProcessor.detectMediaType(href);

      switch (mediaType) {
        case "youtube": {
          const videoId = MediaProcessor.extractYouTubeId(href);
          if (!videoId) break;
          return (
            <YouTubeEmbed
              videoId={videoId}
              title={typeof children === "string" ? children : "YouTube Video"}
              config={mediaConfig}
              className="my-6"
            />
          );
        }

        case "vimeo":
        case "spotify":
        case "twitter":
          return (
            <SocialEmbed
              url={href}
              type={mediaType}
              title={
                typeof children === "string" ? children : `${mediaType} Content`
              }
              config={mediaConfig}
              className="my-6"
            />
          );

        case "file": {
          const fileInfo = MediaProcessor.getFileInfo(href);
          return (
            <FileDownload
              url={href}
              fileName={fileInfo.name}
              fileType={fileInfo.type}
              config={mediaConfig}
              className="my-4"
            />
          );
        }

        case "image":
          return (
            <ExternalLink href={href} config={mediaConfig}>
              {children}
            </ExternalLink>
          );

        default:
          return (
            <ExternalLink href={href} config={mediaConfig}>
              {children}
            </ExternalLink>
          );
      }

      return (
        <ExternalLink href={href} config={mediaConfig}>
          {children}
        </ExternalLink>
      );
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
