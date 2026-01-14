import { Plus } from "lucide-react";
import Link from "next/link";
import { AddButton } from "../AddButton";

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
      <AddButton lable="Add Post" />
    </div>
  );
};
