"use client";
import { Save } from "lucide-react";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { slugify } from "@/utils/slugify";
import postgres from "postgres";
import { capitalizeText } from "@/utils/capitalize-text";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MarkdownEditor } from "../new-post/markdown-editor";
import { ImageUploader } from "../new-post/image-uploader";
import { EditResponseType } from "@/types/types";
import { editFormValidator } from "@/actions/posts/edit-post-form-validator";

interface FormFields {
  title: string;
  slug: string;
  content: string | undefined;
  excerpt: string;
  category: string;
  featuredImage: string;
}

interface Props {
  categories: postgres.RowList<postgres.Row[]>;
  post: postgres.Row;
  postId: string;
}

export const EditPostForm = ({ post, categories, postId }: Props) => {
  const router = useRouter();
  const [imageUploadErrorMessage, setImageUploadErrorMessage] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormFields>(() => ({
    title: post.title,
    slug: post.slug,
    content: post.contentMd,
    excerpt: post.excerpt,
    category: post.categoryId,
    featuredImage: post.featuredImage,
  }));

  const handleFormFieldChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const data =
        name === "title"
          ? {
              ...prev,
              ...{
                title: value,
                slug: slugify(value),
              },
            }
          : { ...prev, [name]: value };

      // console.table(data);
      return data;
    });
  };

  const setValue = (value: string | undefined) => {
    setFormData((prev) => {
      const newValue = { ...prev, content: value };
      // console.log(newValue);
      return newValue;
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        setImageUploadErrorMessage("");
        setIsLoading(true);

        if (formData.featuredImage) {
          const response = await fetch("/api/posts/new/delete-post-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: formData.featuredImage }),
          });

          if (!response.ok) {
            const errorMessage = await response.json();
            setImageUploadErrorMessage(errorMessage?.message);
          }
        }

        // Upload image to Image to Vercel Blob
        const imageFormData = new FormData();
        imageFormData.set("file", file);

        const res = await fetch("/api/posts/new/upload-post-image", {
          method: "POST",
          body: imageFormData,
        });

        if (res.ok) {
          const { url } = await res.json();

          setFormData((prev) => ({ ...prev, featuredImage: url }));
        } else {
          const { message } = await res.json();
          setImageUploadErrorMessage(message);
        }
      } catch (error) {
        if (error instanceof Error) {
          setImageUploadErrorMessage(error.message);
        } else {
          setImageUploadErrorMessage(error as string);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const initialState: EditResponseType = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    editFormValidator.bind(null, postId),
    initialState
  );

  useEffect(() => {
    if (state.errors.featuredImage) {
      setImageUploadErrorMessage(state.errors.featuredImage);
    }
  }, [state.errors.featuredImage]);

  useEffect(() => {
    if (state.success) {
      // setFormData({
      //   title: "",
      //   slug: "",
      //   content: undefined,
      //   excerpt: "",
      //   category: "",
      //   featuredImage: "",
      // });
      router.push(`/posts/${postId}/preview`);
    }
  }, [state, router]);

  return (
    <div className="w-full flex-1 overflow-hidden p-4">
      <div className="bg-sidebar rounded-md shadow-md p-2 md:p-4 border border-gray-100 mx-auto flex flex-col h-full  sm:max-w-[900px]">
        <div className="relative flex items-center mb-2">
          <h3 className="text-2xl font-serif font-bold text-brand-blue">
            Edit Post
          </h3>

          {state.errorMessage && (
            <p className="absolute left-1/2 -translate-x-1/2 text-red-500">
              {state.errorMessage}
            </p>
          )}
        </div>

        {/* <span className="py-1 px-4 border border-gray-100 font-semibold text-brand-blue rounded-lg bg-white self-start mb-4">
          Draft
        </span> */}

        <form
          action={formAction}
          className="flex-1 flex flex-col overflow-hidden "
        >
          <div className="flex-1 mb-4 overflow-y-auto border border-gray-200">
            <div className="space-y-6 p-2 md:p-4 bg-white">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  autoComplete="off"
                  className="bg-white w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  value={formData.title}
                  onChange={handleFormFieldChange}
                />
                {state.errors.title && (
                  <small className="text-xs text-red-500">
                    {state.errors.title}
                  </small>
                )}
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Slug
                </label>
                <input
                  id="slug"
                  type="text"
                  name="slug"
                  autoComplete="off"
                  className="bg-white w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  value={formData.slug}
                  onChange={handleFormFieldChange}
                />
                {state.errors.slug && (
                  <small className="text-xs text-red-500">
                    {state.errors.slug}
                  </small>
                )}
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Content (Markdown)
                </label>
                <MarkdownEditor
                  value={formData.content}
                  setValue={setValue}
                  height={400}
                />
                <textarea
                  className="hidden"
                  id="content"
                  name="content"
                  readOnly
                  value={formData.content}
                ></textarea>
                {state.errors.content && (
                  <small className="text-xs text-red-500">
                    {state.errors.content}
                  </small>
                )}
              </div>
              <div>
                <label
                  htmlFor="excerpt"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={4}
                  autoComplete="off"
                  placeholder="e.g., There are ..."
                  className="bg-white w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all resize-none"
                  value={formData.excerpt}
                  onChange={handleFormFieldChange}
                />

                <div className="flex items-center space-between">
                  {state.errors.excerpt && (
                    <small className="text-xs text-red-500">
                      {state.errors.excerpt}
                    </small>
                  )}
                  <p className="ml-auto ">
                    <span
                      className={cn(
                        "text-green-500",
                        formData.excerpt.length > 160 && "text-red-500",
                        formData.excerpt.length < 120 && "text-yellow-500"
                      )}
                    >
                      {formData.excerpt.length}
                    </span>
                    /160
                  </p>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="featuredImage"
                  className="hidden"
                  defaultValue={formData.featuredImage}
                />
                <ImageUploader
                  onChange={handleImageUpload}
                  src={formData.featuredImage}
                  isLoading={isLoading}
                />
                {state.errors.featuredImage && (
                  <small className="text-xs text-red-500">
                    {imageUploadErrorMessage}
                  </small>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all bgsidebar invalid:text-gray-100"
                  value={formData.category}
                  onChange={handleFormFieldChange}
                >
                  <option disabled hidden value="">
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {capitalizeText(category.name)}
                    </option>
                  ))}
                </select>
                {state.errors.category && (
                  <small className="text-xs text-red-500">
                    {state.errors.category}
                  </small>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isPending}
            className="cursor-pointer w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-md h-14 text-lg font-bold transition-all shadow-lg hover:shadow-brand-blue/20"
          >
            {isPending ? (
              <Spinner className="ml-2 h-5 w-5 text-center" />
            ) : (
              <>
                <Save className="ml-2 h-5 w-5" />
                Save & Preview
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
