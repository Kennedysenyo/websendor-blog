import { fetchMetadataByPostId } from "@/actions/db/queries";
import { FormPageHeader } from "@/components/form-page-header";
import { SEOForm } from "@/components/posts/post-seo/seo-form";
import { redirect } from "next/navigation";

export default async function SeoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const metadata = await fetchMetadataByPostId(id);

  if (!metadata) redirect(`/post/${id}/preview`);

  const urlList = [
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
      name: "Preview",
      url: `/posts/${id}/preview`,
    },
    {
      id: 4,
      name: "Seo",
      url: `/posts/${id}/seo`,
    },
  ];
  return (
    <>
      <FormPageHeader
        title="Edit Metadata"
        subTitle="Update the fields below and click 'Save'"
        urlList={urlList}
      />
      <SEOForm
        id={id}
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        keywords={metadata.keywords ? metadata.keywords.join(",") : ""}
      />
    </>
  );
}
