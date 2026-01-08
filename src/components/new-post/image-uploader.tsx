import Image from "next/image";
import { ChangeEvent } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  src: string;
}

export const ImageUploader = ({ onChange, src }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:w-1/2">
      <div className="flex flex-col">
        <label
          htmlFor="featured-image"
          className="text-sm font-semibold text-brand-blue"
        >
          Featured Image
        </label>
        <input
          id="featured-image"
          type="file"
          name="featured-image"
          className="bg-sidebar px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
          onChange={onChange}
        />
      </div>
      <div className=" relative border border-gray-200 w-full aspect-[2/1.3] object-fit-cover">
        <Image src={src} alt="post image" fill />
      </div>
    </div>
  );
};
