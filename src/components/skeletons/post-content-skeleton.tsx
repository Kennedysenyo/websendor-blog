export function PostContentSkeleton() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-10 w-3/4 rounded bg-muted" />

      {/* Meta (date, author, read time) */}
      <div className="flex gap-4">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>

      {/* Featured image */}
      <div className="h-64 w-full rounded-xl bg-muted" />

      {/* Intro paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-11/12 rounded bg-muted" />
        <div className="h-4 w-10/12 rounded bg-muted" />
      </div>

      {/* Section heading */}
      <div className="h-6 w-1/2 rounded bg-muted" />

      {/* Paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-9/12 rounded bg-muted" />
      </div>

      {/* Quote block */}
      <div className="rounded-lg border-l-4 border-muted pl-4 space-y-2">
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>

      {/* Another section */}
      <div className="h-6 w-1/3 rounded bg-muted" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-10/12 rounded bg-muted" />
        <div className="h-4 w-8/12 rounded bg-muted" />
      </div>

      {/* Code block */}
      <div className="rounded-lg bg-muted p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-background/60" />
        <div className="h-4 w-2/3 rounded bg-background/60" />
        <div className="h-4 w-1/2 rounded bg-background/60" />
      </div>

      {/* Final paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-11/12 rounded bg-muted" />
        <div className="h-4 w-9/12 rounded bg-muted" />
      </div>
    </article>
  );
}
