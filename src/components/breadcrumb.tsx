import { BreadCrumb, BreadCrumbType } from "./crumb";

const urlList: BreadCrumbType[] = [
  {
    id: 1,
    name: "Dashboard",
    url: "/",
  },
  {
    id: 2,
    name: "Posts",
    url: "/posts",
  },
  {
    id: 3,
    name: "New Post",
    url: "/posts/new",
  },
];
export const NewPostBreadCrumb = () => {
  return (
    <>
      <div className="p-4  flex flex-col">
        <BreadCrumb urlList={urlList} />
        <h1 className="px-4 text-3xl font-bold text-center">Create New Post</h1>
        <p className="px-8 text-center">
          Fill the form below and submit to preview draft
        </p>
      </div>
      <hr />
    </>
  );
};
