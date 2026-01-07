import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
}

export const HomeHeader = ({ name }: Props) => {
  const hours = new Date().getHours();

  let greeting;
  switch (true) {
    case hours < 12:
      greeting = "Good Morning";
      break;
    case hours < 16:
      greeting = "Good Afternoon";
      break;
    case hours < 21:
      greeting = "Good Evening";
      break;
    default:
      greeting = "Good night";
      break;
  }
  return (
    <div className="p-4 flex justify-between">
      <h1 className="text-lg sm:text-2xl md:text-3xl">
        {greeting}{" "}
        <span className="text-brand-green">{name.split(" ")[0]}</span>
      </h1>
      <Link
        href="/posts/new"
        className="shadow-md flex gap-1 md:gap-2 items-center px-3 py-1 md:px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded-md text-white"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-sm sm:text-lg md:text-xl">Add Post</span>
      </Link>
    </div>
  );
};
