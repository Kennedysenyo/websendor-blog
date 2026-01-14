"use server";

import { EditResponseType, FormErrors, ResponseType } from "@/types/types";
import { saveEdit } from "./save-edit";

export const editFormValidator = async (
  postId: string,
  _prevState: EditResponseType,
  formData: FormData
): Promise<EditResponseType> => {
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const content = (formData.get("content") as string).trim();
  const excerpt = (formData.get("excerpt") as string).trim();
  const category = formData.get("category") as string;
  const featuredImage = formData.get("featuredImage") as string;

  const errors: FormErrors = {};

  // Title
  if (!title) {
    errors.title = "Enter title!";
  } else if (title.split(" ").length < 2) {
    errors.title = "Title must be at least two words in sentence!";
  }

  // slug
  if (!slug) {
    errors.slug = "Enter slug!";
  }

  // content
  if (!content) {
    errors.content = "Enter content!";
  }

  // excerpt
  if (!excerpt) {
    errors.excerpt = "Enter excerpt!";
  } else if (excerpt.length < 120 || excerpt.length > 160) {
    errors.excerpt = "Excerpt should be between 120 and 160 characters long.";
  }

  // category
  if (!category) {
    errors.category = "Pick a category!";
  }

  // fetured image
  if (!featuredImage) {
    errors.featuredImage = "No Image selected!";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      success: false,
      errorMessage: null,
    };
  }

  const errorMessage = await saveEdit(postId, {
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    categoryId: category,
  });

  if (errorMessage) {
    return {
      errors: {},
      success: false,
      errorMessage,
    };
  }
  return {
    errors: {},
    success: true,
    errorMessage: null,
  };
};
