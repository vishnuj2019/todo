export const About = () => {
  return (
    <div className=" flex  justify-center items-center  min-h-screen 2xl:w-1/2 2xl:mx-auto ">
      <div className="mt-24 md:mt-16 flex flex-col gap-y-11 items-center">
        <p className="poppins-medium text-2xl">About</p>
        <p className="w-3/4 md:w-3/5 tracking-wide leading-7 poppins-regular first-letter:ml-20 text-justify pb-4">
          This is a simple and user-friendly To-Do app designed to help you
          manage your daily tasks with ease. You can quickly add new tasks, edit
          existing ones, and delete those you no longer need. Mark tasks as
          completed to keep track of your progress and stay productive
          throughout the day. The clean and minimal interface ensures a
          distraction-free experience. Whether you're using it for work, study,
          or personal goals, this app keeps you organized. It's responsive and
          works smoothly on both desktop and mobile devices. Built with modern
          web technologies, it's fast, lightweight, and easy to use.
        </p>
      </div>
    </div>
  );
};
