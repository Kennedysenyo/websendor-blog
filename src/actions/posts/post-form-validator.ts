"use server";

import { savePost } from "./save-post";

interface FormErrors {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  featuredImage?: string;
}

export interface ResponseType {
  errors: FormErrors;
  success: boolean;
  errorMessage: string | null;
}
export const postFormValidator = async (
  _prevState: ResponseType,
  formData: FormData
): Promise<ResponseType> => {
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const content = (formData.get("content") as string).trim();
  const excerpt = (formData.get("excerpt") as string).trim();
  const category = formData.get("title") as string;
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
    return { errors, success: true, errorMessage: null };
  }

  const errorMessage = await savePost({
    title,
    slug,
    content,
    excerpt,
    category,
    featuredImage,
  });

  if (errorMessage) {
    return { errors: {}, success: true, errorMessage };
  }
  return { errors: {}, success: true, errorMessage: null };
};
