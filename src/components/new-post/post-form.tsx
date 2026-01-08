import { PlusIcon, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
export const NewPostForm = () => {
  return (
    <div className="w-full flex-1 overflow-hidden p-4">
      <div className="bg-sidebar rounded-md shadow-md p-2 md:p-4 border border-gray-100 mx-auto flex flex-col h-full  sm:max-w-[900px]">
        <h3 className="text-2xl font-serif font-bold text-brand-blue mb-4 flex items-center gap-2">
          New Post <PlusIcon />
        </h3>
        <span className="py-1 px-4 border border-gray-100 font-semibold text-brand-blue rounded-lg bg-white self-start mb-4">
          Draft
        </span>
        <form className="flex-1 flex flex-col overflow-hidden border border-gray-200">
          <div className="  flex-1  mb-4  overflow-y-auto">
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
                />
              </div>

              <div>
                <label
                  htmlFor="contentMd"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Content (Markdown)
                </label>
                <textarea
                  id="contentMd"
                  name="contentMd"
                  rows={6}
                  className="bg-sidebar w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all resize-none"
                  placeholder="e.g., # Title&#10;&#10;Write your **bold** text here...&#10;- List item 1&#10;- List item 2"
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
                />
                <div className="flex">
                  {/* <small className="text-xs text-grey-100 -mt-1 ml-auto">{`${0} / 3,000`}</small> */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="text-sm font-semibold text-brand-blue"
                >
                  Category
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all bgsidebar invalid:text-gray-100"
                  defaultValue=""
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

              <div className="flex flex-col gap-2 md:w-1/2">
                <div className="flex flex-col">
                  <label
                    htmlFor="featured-image"
                    className="text-sm font-semibold text-brand-blue"
                  >
                    Featured Image
                  </label>
                  <input
                    id="featured-image"
                    type="file"
                    name="featured-image"
                    className="bg-sidebar px-4 py-3 rounded-sm border border-gray-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  />
                </div>
                <div className=" relative border border-gray-200 w-full aspect-[2/1.5] object-fit-cover">
                  <Image src={"/"} alt="post image" fill />
                </div>
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
