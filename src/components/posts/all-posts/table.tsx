import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropDown } from "./dropdown";
import postgres from "postgres";
interface Props {
  posts: postgres.RowList<postgres.Row[]>;
}
export const PostTable = ({ posts }: Props) => {
  return (
    <div className="bg-red-100 ">
      <Table>
        <TableCaption>A list of your posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell className="text-right">
                <DropDown id={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
