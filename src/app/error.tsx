"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>

        <p className="text-muted-foreground">
          {process.env.NODE_ENV === "development"
            ? error.message
            : "An unexpected error occurred."}
        </p>

        <button
          onClick={() => reset()}
          className="rounded-md bg-brand-blue px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
