export const handleError = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};
