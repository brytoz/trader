import React from "react";
import { ERROR } from "../components/images";


const Errors: React.FC = () => {
  return (
    <section className="bg-inherit">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="text-center flex justify-center w-full">
            <img src={ERROR} className="w-72 " />
          </div>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <a
            href="/"
            className="inline-flex font-extrabold text-white bg-[#7b0f0f] hover:bg-[#7b0f0f]/80 px-6 py-4  my-4 rounded-full"
          >
            Back to Homepage
          </a>
        </div>
      </div>

    </section>
  );
};

export default Errors;