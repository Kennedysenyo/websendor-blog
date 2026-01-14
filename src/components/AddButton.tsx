import { Link, Plus } from "lucide-react";
interface Props {
  lable: string;
}
export const AddButton = ({ lable }: Props) => {
  return (
    <Link
      href="/posts/new"
      className="shadow-md flex gap-1 md:gap-2 items-center px-3 py-1 md:px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded-md text-white"
    >
      <Plus className="w-5 h-5 md:w-6 md:h-6" />
      <span className="text-sm sm:text-lg md:text-xl">{lable}</span>
    </Link>
  );
};
