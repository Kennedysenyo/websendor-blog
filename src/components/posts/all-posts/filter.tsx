"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { capitalizeText } from "@/utils/capitalize-text";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import postgres from "postgres";

import { ChangeEvent, useState } from "react";

interface Props {
  categories: postgres.RowList<postgres.Row[]>;
}
export const Filter = ({ categories }: Props) => {
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<{
    term: string;
    category: string;
    status: string;
  }>({
    term: searchParams.get("query") || "",
    category: searchParams.get("cat") || "",
    status: searchParams.get("status") || "",
  });
  const router = useRouter();
  const pathname = usePathname();

  let timeout: NodeJS.Timeout;
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilter((prev) => {
      const newValues = { ...prev, [name]: value };

      timeout = setTimeout(() => {
        clearTimeout(timeout);
        const params = new URLSearchParams();
        params.set("page", "1");

        if (newValues.term) {
          params.set("query", newValues.term.trim());
        } else if (!newValues.term) {
          params.delete("query");
        }

        if (newValues.category) {
          params.set("cat", newValues.category);
        } else if (!newValues.category) {
          params.delete("cat");
        }

        if (newValues.status) {
          params.set("status", newValues.status);
        } else if (!newValues.status) {
          params.delete("status");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }, 300);

      return newValues;
    });
  };

  const isMobile = useIsMobile();
  return (
    <div className=" p-2 flex flex-col lg:flex-row lg:items-center gap-4 w-3/4 relative">
      <div className="flex-1">
        <label htmlFor="term" className="sr-only">
          Search
        </label>
        <input
          type="text"
          name="term"
          placeholder="Search ..."
          className="w-full pl-6 pr-2 py-1 rounded-sm border border-gray-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bgsidebar invalid:text-gray-100"
          value={filter.term}
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="lg:w-1/2 flex gap-2 items-center">
        <div className="flex items-center gap-1 w-1/2">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-brand-blue hidden lg:block"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bgsidebar invalid:text-gray-100"
            value={filter.category}
            onChange={handleSearch}
          >
            <option disabled hidden value="">
              {isMobile ? "Select Category" : "All"}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {capitalizeText(category.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 w-1/2">
          <label
            htmlFor="status"
            className="text-sm font-semibold text-brand-blue hidden lg:block"
          >
            Status:
          </label>
          <select
            name="status"
            id="status"
            className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bgsidebar invalid:text-gray-100"
            value={filter.status}
            onChange={handleSearch}
          >
            <option value="" hidden disabled>
              All
            </option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
    </div>
  );
};
