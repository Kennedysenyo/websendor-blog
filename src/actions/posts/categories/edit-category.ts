import { CategoryFormErrors, CategoryFormResponseType } from "@/types/types";
import { saveCategoryEdit } from "./save-edit";

export const editCategoryFormValidator = async (
  id: string,
  _prevState: CategoryFormResponseType,
  formData: FormData
): Promise<CategoryFormResponseType> => {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

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
  const errorMessage = await saveCategoryEdit(id, name, slug);
  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }
  return { errors: {}, success: true, errorMessage: null };
};
