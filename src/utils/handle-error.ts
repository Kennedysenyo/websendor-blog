export const handleError = (error: any) => {
  if (error instanceof Error) {
    return { postId: null, errorMessage: error.message };
  }
  return { postId: null, errorMessage: error as string };
};
