"use client";
import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ChangeEvent, useState } from "react";
import { MarkdownEditor } from "./markdown-editor";
import { ImageUploader } from "./image-uploader";

interface FormFields {
  title: string;
  slug: string;
  content: string | undefined;
  excerpt: string;
  category: string;
  featuredImage: string;
}

export const NewPostForm = () => {
  const [imageUploadErrorMessage, setImageUploadErrorMessage] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormFields>({
    title: "",
    slug: "",
    content: undefined,
    excerpt: "",
    category: "",
    featuredImage: "",
  });

  const handleFormFieldChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => {
      const data =
        name === "title"
          ? {
              ...prev,
              ...{
                title: value,
                slug: value.toLowerCase().split(" ").join("-"),
              },
            }
          : { ...prev, [name]: value };

      console.table(data);
      return data;
    });
  };

  const setValue = (value: string | undefined) => {
    setFormData((prev) => {
      const data = { ...prev, content: value };
      console.table(data);
      return data;
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

  return (
    <div className="w-full flex-1 overflow-hidden p-4">
      <div className="bg-sidebar rounded-md shadow-md p-2 md:p-4 border border-gray-100 mx-auto flex flex-col h-full  sm:max-w-[900px]">
        <h3 className="text-2xl font-serif font-bold text-brand-blue mb-4 flex items-center gap-2">
          New Post
        </h3>
        <span className="py-1 px-4 border border-gray-100 font-semibold text-brand-blue rounded-lg bg-white self-start mb-4">
          Draft
        </span>
        <form className="flex-1 flex flex-col overflow-hidden ">
          <div className="  flex-1  mb-4  overflow-y-auto border border-gray-200">
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
                  className="bg-sidebar w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  value={formData.title}
                  onChange={handleFormFieldChange}
                />
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
                  className="bg-sidebar w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  value={formData.slug}
                  onChange={handleFormFieldChange}
                />
              </div>

              <div>
                <label
                  htmlFor="contentMd"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Content (Markdown)
                </label>

                <MarkdownEditor
                  value={formData.content === "" ? undefined : formData.content}
                  setValue={setValue}
                  height={400}
                />
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
                  placeholder="e.g., There are ..."
                  className="bg-sidebar w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all resize-none"
                  value={formData.excerpt}
                  onChange={handleFormFieldChange}
                />
                <div className="flex">
                  {/* <small className="text-xs text-grey-100 -mt-1 ml-auto">{`${0} / 3,000`}</small> */}
                </div>
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
                  <option value="web-design">Website Design</option>
                  <option value="development">Development</option>
                  <option value="seo">SEO</option>
                  <option value="advertising">Advertising</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name=""
                  defaultValue={formData.featuredImage}
                />
                <ImageUploader
                  onChange={handleImageUpload}
                  src={formData.featuredImage}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={false}
            className="cursor-pointer w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-md h-14 text-lg font-bold transition-all shadow-lg hover:shadow-brand-blue/20"
          >
            {false ? (
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
