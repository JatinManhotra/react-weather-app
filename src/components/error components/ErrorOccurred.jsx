import React from "react";
import { IoMdRefresh } from "react-icons/io";
import {error_img} from "../../assets/error.png"

const ErrorOccurred = () => {
  return (
    <section className="main-container dark:bg-dark-mode faint-white mr-2 rounded-lg p-4 transition-all duration-300 ease-in dark:text-white">
      <img
        src={error_img}
        className="m-auto max-w-[80%] md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%]"
        alt=""
      />
      <h1 className="text-center text-lg md:text-xl md:leading-8 font-bold lg:text-2xl lg:leading-12 xl:text-3xl">
        An <span className="text-rose-500">error</span> occurred. 
        <br className="block sm:hidden" />
        {" "} Please refresh
        the <span className="text-blue-500">page.</span>
        <br />{" "}
        <br  className="block sm:hidden"/>{" "}
        <span className="text-base  lg:text-xl">
          If the <span className="text-rose-500">error</span> persists,
          <br className="block sm:hidden" /> consider
          using a{" "}
          <span className="text-rose-500 underline underline-offset-4">
            VPN.
          </span>
        </span>
      </h1>
      <div className="mt-6 flex w-full justify-center">
        <button
          onClick={() => location.reload()}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:cursor-pointer hover:bg-blue-700 lg:text-lg"
        >
          <IoMdRefresh /> Refresh
        </button>
      </div>
    </section>
  );
};

export default ErrorOccurred;
