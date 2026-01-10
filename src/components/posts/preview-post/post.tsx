import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import postgres from "postgres";

interface Props {
  post: postgres.Row;
}
export const Post = ({ post }: Props) => {
  return (
    <article className="min-h-screen bg-white ">
      {/* Header Navigation */}
      {/* <div className="border-b border-gray-100">
        <div className="container-custom section-padding py-4">
          <Link
            href="/insights"
            className="inline-flex items-center font-semibold text-brand-blue hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Link>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-brand-blue/5 to-white section-padding">
        <div className="container-custom max-w-3xl">
          <div className="mb-6">
            <span className="inline-block bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publisedAt}>{post.publisedAt}</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container-custom max-w-3xl mt-0">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="section-padding">
        <div className="container-custom max-w-3xl prose prose-lg dark:prose-invert mx-auto">
          {post.contentMd
            .split("\r\n\r\n")
            .map((paragraph: string, index: number) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-serif font-bold text-brand-blue mt-8 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }

              if (paragraph.startsWith("**")) {
                // Handle bold text at the start of paragraphs
                const parts = paragraph.split("\n");
                return (
                  <div key={index} className="mb-6">
                    {parts.map((part, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-2">
                        {part.replace(/\*\*/g, "")}
                      </p>
                    ))}
                  </div>
                );
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
        </div>
      </div>

      {/* Author Info and Related */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="border-t border-b border-gray-200 py-8 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Written by
              </p>
              <p className="text-2xl font-serif font-bold text-brand-blue">
                {post.author}
              </p>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center h-12 px-8 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green/90 transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
