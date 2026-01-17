import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  rows?: number;
}

export const CategoriesTableSkeleton = ({ rows = 10 }: Props) => {
  return (
    <>
      {/* Desktop table skeleton */}
      <div className="hidden lg:block px-4 shadow-md rounded-md bg-sidebar w-full mx-auto max-w-[1000px] mt-4">
        <Table className="rounded-md border border-gray-100">
          <TableHeader className="bg-sidebar">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug (segment)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white border border-gray-100">
            {Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card skeleton */}
      <div className="space-y-6 lg:hidden mt-4 px-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="shadow-md rounded-md bg-sidebar p-2 space-y-2"
          >
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />

            <div className="flex justify-end gap-3 pt-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
