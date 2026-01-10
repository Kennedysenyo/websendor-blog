import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full">
      <div className="absolute left-1/2 w-full -translate-x-1/2 z-4 ">
        <div className="p-2 rounded-lg bg-white w-2/3 shadow-lg w-full bg-green-500 max-w-[700px] mx-auto ">
          <div className="border border-gray-100 p-2"></div>
        </div>
      </div>
      <div className=" h-full">{children}</div>
    </div>
  );
}
