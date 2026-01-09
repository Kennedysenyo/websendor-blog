"use server";
interface DataType {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featuredImage: string;
}
export const savePost = async (data: DataType): Promise<string | null> => {
  try {
    console.table(data);
    return null;
  } catch (error) {
    return "";
  }
};
