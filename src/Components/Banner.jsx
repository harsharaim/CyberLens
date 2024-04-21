import { MdAnnouncement } from "react-icons/md";
const Banner = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-start justify-between text-white md:px-8">
        <div className="flex gap-x-4">
          <div className="w-10 h-10 flex-none rounded-lg bg-gray-700 flex items-center justify-center">
            <MdAnnouncement />
          </div>
          <p className="py-2 font-medium">
           We are Happy to annouce that we are funded by government of karnataka
           
          </p>
        </div>
        <button className="p-2 rounded-lg duration-150 hover:bg-indigo-500 ring-offset-2 focus:ring">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Banner;
