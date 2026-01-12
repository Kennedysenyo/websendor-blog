import { BreadCrumb, BreadCrumbType } from "./breadcrumb";

export const FormPageHeader = ({
  title,
  subTitle,
  urlList,
}: {
  title: string;
  subTitle: string;
  urlList: BreadCrumbType[];
}) => {
  return (
    <>
      <div className="p-4  flex flex-col">
        <BreadCrumb urlList={urlList} />
        <h1 className="px-4 text-3xl font-bold text-center">{title}</h1>
        <p className="px-8 text-center">{subTitle}</p>
      </div>
      <hr />
    </>
  );
};
