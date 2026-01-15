"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { capitalizeText } from "@/utils/capitalize-text";
import postgres from "postgres";

import { ChangeEvent, useState } from "react";
interface Props {
  categories: postgres.RowList<postgres.Row[]>;
}
export const Filter = ({ categories }: Props) => {
  const [category, setCategory] = useState<string>("");

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {};

  const isMobile = useIsMobile();
  return (
    <div className="bg-red-500 p-2 flex flex-col lg:flex-row lg:items-center gap-4 w-3/4">
      <div className="flex-1">
        <input
          type="text"
          name="query"
          placeholder="Search ..."
          className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all bgsidebar invalid:text-gray-100"
        />
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
            className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all bgsidebar invalid:text-gray-100"
            value={category}
            onChange={handleCategoryChange}
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
            className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all bgsidebar invalid:text-gray-100"
            value={""}
            onChange={handleStatusChange}
          >
            <option value="" hidden disabled>
              All
            </option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
    </div>
  );
};
