import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        {/* Status */}
        <p className="text-sm font-medium text-muted-foreground">404 Error</p>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
            <Link href="/">Go home</Link>
          </Button>

          <Button
            variant="outline"
            className="hover:text-brand-blue border hover:border-brand-blue/50"
            asChild
          >
            <Link href="/posts">View Posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
