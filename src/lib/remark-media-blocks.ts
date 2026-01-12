//lib/remark-media-blocks.ts

import { visit } from "unist-util-visit";

export function remarkMediaBlocks() {
  return (tree: any) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (!parent || index === null || index === undefined) return;
      if (!node.children || node.children.length !== 1) return;

      const child = node.children[0];

      // --- Lift images ---
      if (child.type === "image") {
        parent.children.splice(index, 1, {
          type: "image",
          url: child.url,
          alt: child.alt || "",
          title: child.title || null,
        });
        return;
      }

      // --- Lift media links ---
      if (child.type === "link" && typeof child.url === "string") {
        parent.children.splice(index, 1, {
          type: "media",
          url: child.url,
        });
      }
    });
  };
}
