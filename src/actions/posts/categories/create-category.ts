"use server";

import { CategoryFormErrors, CategoryFormResponseType } from "@/types/types";
import { addCategory } from "./add-category";

export const createCategoryFormValidator = async (
  _prevState: CategoryFormResponseType,
  formData: FormData
): Promise<CategoryFormResponseType> => {
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string).trim();

  const errors: CategoryFormErrors = {};

  if (!name) {
    errors.name = "Category name is required!";
  }
  if (!slug) {
    errors.slug = "Slug is required!";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false, errorMessage: null };
  }
  const errorMessage = await addCategory(name, slug);
  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }
  return { errors: {}, success: true, errorMessage: null };
};
