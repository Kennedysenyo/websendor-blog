export const handleError = (error: any) => {
  if (error instanceof Error) {
    console.error(error);
    return { postId: null, errorMessage: error.message };
  }
  return { postId: null, errorMessage: error as string };
};
