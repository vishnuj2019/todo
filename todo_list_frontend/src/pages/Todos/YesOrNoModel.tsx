interface IProps {
  handleCancel: () => void;
  handleSubmit: () => void;
  content: string;
  yesContent: string;
  noContent: string;
}

const YesOrNoModel = ({
  handleSubmit,
  content,
  yesContent,
  noContent,
  handleCancel,
}: IProps) => {
  return (
    <div className="absolute w-full top-0 z-50 left-0 h-screen bg-gray-600/50 flex justify-center items-center">
      <div className="bg-white w-3/4 md:w-1/4 flex flex-col items-center justify-center gap-y-5 p-5 rounded-md">
        <p className="text-xl poppins-medium text-black">{content}</p>
        <div className="flex w-full  justify-evenly">
          <button
            type="button"
            onClick={handleCancel}
            className="w-20 py-1 rounded-md text-white text-sm poppins-regular hover:cursor-pointer bg-gray-600"
          >
            {noContent}
          </button>
          <button
            onClick={handleSubmit}
            className="w-20 py-1 rounded-md text-white text-sm poppins-regular hover:cursor-pointer bg-green-700"
          >
            {yesContent}
          </button>
        </div>
      </div>
    </div>
  );
};

export default YesOrNoModel;
