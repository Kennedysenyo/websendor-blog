"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { deletePostById } from "@/actions/db/queries";
import { toast } from "sonner";

interface Props {
  size?: "sm";
  id: string;
}
export const DeleteButton = ({ size, id }: Props) => {
  const [pending, startTranstion] = useTransition();

  const handleDelete = () => {
    startTranstion(async () => {
      const deletedPost = await deletePostById(id);
      if (deletedPost.id) {
        toast("Deleted Successfully");
      } else {
        toast("Error! Delete Unsuccessful");
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={size}
          className=" hover:cursor-pointer px-0 bg-destructive hover:bg-destructive/90 w-full text-start"
        >
          <Trash2 className="size-4 text-white" />
          {!size && <span> Delete</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-500/90 px-0"
            >
              <Trash2 className="size-4 text-white" />
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
