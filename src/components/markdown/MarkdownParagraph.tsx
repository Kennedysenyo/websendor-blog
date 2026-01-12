import React, { ReactNode, HTMLAttributes } from "react";
import { YouTubeEmbed } from "./MediaComponents/YoutubeEmbed";
import { SocialEmbed } from "./MediaComponents/SocialEmbed";
import { FileDownload } from "./MediaComponents/FileDownload";
import { MarkdownImage } from "./MediaComponents/MarkdownImage";

// Utility to detect block-level elements
function isBlockElement(child: ReactNode): boolean {
  if (!React.isValidElement(child)) return false;

  // Built-in HTML block types
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

  // Custom media components that render block-level elements
  const customBlockComponents = [
    YouTubeEmbed,
    SocialEmbed,
    FileDownload,
    MarkdownImage,
  ];

  if (typeof child.type === "string") {
    return blockTypes.includes(child.type);
  }

  if (customBlockComponents.includes(child.type as any)) {
    return true;
  }

  return false;
}

// Paragraph component for react-markdown
export const MarkdownParagraph: React.FC<
  HTMLAttributes<HTMLParagraphElement>
> = ({ children, ...props }) => {
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
