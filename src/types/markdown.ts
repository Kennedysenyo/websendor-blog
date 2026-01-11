// types/markdown.ts
export type MediaType =
  | "image"
  | "youtube"
  | "vimeo"
  | "spotify"
  | "twitter"
  | "file"
  | "link";

export interface MediaEmbed {
  type: MediaType;
  url: string;
  id?: string;
  title?: string;
  alt?: string;
  thumbnail?: string;
  fileType?: string;
  dimensions?: {
    width?: number;
    height?: number;
  };
}

export interface MediaConfig {
  enableLazyLoading?: boolean;
  sandboxIframes?: boolean;
  allowFullScreen?: boolean;
  autoPlay?: boolean;
  showCaptions?: boolean;
  className?: string;
}

export interface BaseMediaProps {
  url: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  config?: MediaConfig;
}

// A copy of BaseMediaProps for YouTube and Image (url property removed)
export interface WithoutUrlBaseMediaProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  config?: MediaConfig;
}
