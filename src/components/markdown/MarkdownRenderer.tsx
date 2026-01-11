// components/markdown/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
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

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  mediaConfig = {},
  className = "prose prose-lg max-w-none",
}) => {
  const components: Components = {
    // Handle images
    img: ({ node, src, alt, title, ...props }) => {
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
          // {...props}
        />
      );
    },

    // Handle links (for embeds and downloads)
    a: ({ node, href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>;

      if (!MediaProcessor.isURLAllowed(href)) {
        return <span className="text-red-500">[Unsafe Link Blocked]</span>;
      }

      const mediaType = MediaProcessor.detectMediaType(href);

      switch (mediaType) {
        case "youtube":
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

        case "file":
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

        case "image":
          return (
            <MarkdownImage
              src={href}
              alt={typeof children === "string" ? children : "Image"}
              config={mediaConfig}
              className="my-4"
            />
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

    // Handle plain text nodes for automatic link detection
    text: ({ node, children, ...props }) => {
      if (typeof children !== "string") return <>{children}</>;

      // Simple auto-link detection for plain URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = children.split(urlRegex);

      if (parts.length === 1) return <>{children}</>;

      return (
        <>
          {parts.map((part, i) => {
            if (i % 2 === 0) return part;

            if (!MediaProcessor.isURLAllowed(part)) {
              return (
                <span key={i} className="text-red-500">
                  [Unsafe URL]
                </span>
              );
            }

            const mediaType = MediaProcessor.detectMediaType(part);
            switch (mediaType) {
              case "youtube":
                const videoId = MediaProcessor.extractYouTubeId(part);
                if (!videoId) return part;
                return (
                  <YouTubeEmbed
                    key={i}
                    videoId={videoId}
                    config={mediaConfig}
                    className="my-6"
                  />
                );

              case "vimeo":
              case "spotify":
              case "twitter":
                return (
                  <SocialEmbed
                    key={i}
                    url={part}
                    type={mediaType}
                    config={mediaConfig}
                    className="my-6"
                  />
                );

              default:
                return (
                  <ExternalLink key={i} href={part} config={mediaConfig}>
                    {part}
                  </ExternalLink>
                );
            }
          })}
        </>
      );
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[]}
        skipHtml={false}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
