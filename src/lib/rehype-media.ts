import { visit } from "unist-util-visit";

export function rehypeMedia() {
  return (tree: any) => {
    visit(tree, (node: any, index, parent) => {
      if (!parent || index == null) return;

      if (node.type === "media") {
        parent.children[index] = {
          type: "element",
          tagName: "media",
          properties: {
            url: node.url,
          },
          children: [],
        };
      }
    });
  };
}
