"use server";

import { saveMetaData } from "./save-metadata";

interface FormErrors {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface SeoFormResponseType {
  errors: FormErrors;
  success: boolean;
  errorMessage: string | null;
}

export const validateSEOForm = async (
  id: string,
  prevState: SeoFormResponseType,
  formData: FormData
): Promise<SeoFormResponseType> => {
  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const keywords = (formData.get("keywords") as string).trim();

  const errors: FormErrors = {};

  if (!title) {
    errors.title = "Meta title can't be blank!";
  }
  if (!description) {
    errors.description = "Meta descripiton can't be blank!";
  }
  if (keywords.split(/\s*,\s*/).filter(Boolean).length > 10) {
    errors.keywords = "Keywords shouldn't exceed maximum (10)";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false, errorMessage: null };
  }

  const metadata = { id, title, description, keywords: keywords.split(",") };

  const errorMessage = await saveMetaData(metadata);

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }
  return { errors: {}, success: true, errorMessage: null };
};
