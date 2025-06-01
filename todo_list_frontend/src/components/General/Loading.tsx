const Loading = () => {
  return (
    <div className="flex justify-evenly">
      <span
        style={{ animationDelay: "0s" }}
        className="bg-white block h-3 w-3 rounded-full animate-bounce"
      ></span>
      <span
        style={{ animationDelay: "200ms" }}
        className="bg-white block h-3 w-3 rounded-full delay-200 animate-bounce"
      ></span>
      <span
        style={{ animationDelay: "400ms" }}
        className="bg-white block h-3 w-3 rounded-full delay-400 animate-bounce"
      ></span>
    </div>
  );
};

export default Loading;
