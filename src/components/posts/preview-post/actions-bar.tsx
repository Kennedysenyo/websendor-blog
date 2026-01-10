export const ActionsBar = () => {
  return (
    <>
      <div className="hidden md:block absolute left-1/2 w-full -translate-x-1/2 z-4 ">
        <div className="p-2 rounded-lg bg-white w-2/3 shadow-lg bg-green-500 max-w-[900px] mx-auto ">
          <div className="border border-gray-100 p-2"></div>
        </div>
      </div>
      <div className="absolute md:hidden w-full mb-1 left-1/2 bottom-0 -translate-y-1/2 -translate-x-1/2 z-5 ">
        <div className="p-2 rounded-lg bg-white w-2/3 shadow-lg bg-green-500 max-w-[900px] mx-auto ">
          <div className="border border-gray-100 p-2"></div>
        </div>
      </div>
    </>
  );
};
