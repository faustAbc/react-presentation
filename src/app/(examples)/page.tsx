"use client";

import { InlineCode } from "@/components/common/InlineCode";
import { CodeCarousel } from "@/components/pages/xstateComparison/CodeCarousel";
import {
  LoadByButtonNativeCode,
  LoadByButtonXStateCodeDescription,
} from "@/components/pages/xstateComparison/LoadByButtonNativeCode";
import { LoadByButtonXStateCode } from "@/components/pages/xstateComparison/LoadByButtonXStateCode";
import { ProgressPanel } from "@/components/pages/xstateComparison/ProgressPanel";

import { inspect } from "@xstate/inspect";

inspect({
  iframe: false,
});

const ExamplesPage = () => {
  return (
    <div className="relative flex flex-col gap-32 mt-16">
      <ProgressPanel />
      <div className="p-8 max-w-screen-lg m-auto">
        <h1 className="text-6xl text-center font-semibold">
          XState <span className="text-4xl opacity-50">vs</span> React hooks🪝{" "}
        </h1>
        <div className="mt-6">
          A comparison of
          <span className="mx-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#ffd800] relative">
            <span className="relative text-black font-extrabold">
              day-to-day
            </span>
          </span>
          tasks implemented in XState and natively in React
        </div>
        <div className="flex mt-4">
          <div className="w-fit flex justify-center items-center m-1 font-medium py-2 px-3 bg-gray-500 bg-opacity-20 rounded-full text-white-100  border border-gray-700">
            <div className="text-xs font-normal leading-none flex-initial">
              📖 12 minutes read
            </div>
          </div>
          <div className="w-fit flex justify-center items-center m-1 font-medium py-2 px-3 bg-gray-500 bg-opacity-20 rounded-full text-white-100  border border-gray-700">
            <div className="text-xs font-normal leading-none flex-initial flex items-center gap-2">
              Difficulty{" "}
              <div className="flex">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-20 max-w-screen-lg m-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold">Why should I read it</h3>
          During our small journey we'll
          <ul className="ml-4 space-y-1 text-gray-500 list-inside dark:text-gray-400">
            <li className="flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Check how easy it is to use XState in different real-life use
              cases
            </li>
            <li className="flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Compare React hooks with XState implementation
            </li>
            <li className="flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Get familiar with XState
            </li>
          </ul>
          ...and try to find a golden egg 🥚 in the end. So let's kick off
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold">Data fetching</h3>
          <span>
            One of most common tasks for React developer is to fetch some data
            from remote endpoint. To be consistent, let's introduce some user
            story to implement
          </span>
          <blockquote className="p-8 my-4 border-l-4 border-gray-300 ">
            <p className=" leading-relaxed text-gray-400">
              I want to load posts by clicking on a button.
              <br />
              While posts are being loaded, I need to see loading indicator.
            </p>
          </blockquote>
          <span>Let's see how you would probably do it with React hooks:</span>
          <LoadByButtonNativeCode />
          <span>
            Nothing fancy, we just fetch some data in{" "}
            <InlineCode text="loadData" />, store it in{" "}
            <InlineCode text="posts" /> variable and trigger it by clicking a
            button.
          </span>
        </div>
      </div>
      <div className="bg-gray-100 text-black p-10">
        <div className="max-w-screen-lg m-auto">
          <p>
            Now let's first take a look on XState implementation of the same
            functionality:
          </p>
          <LoadByButtonXStateCode />
          It's cool, but what the magix happens there?
        </div>
      </div>
      <div className="h-[400px] m-16">
        <CodeCarousel>
          <div className="bg-blue-700 h-[400px]">test 1</div>
          <div className="bg-blue-700 h-[100%]">test 2</div>
          <div className="bg-blue-700 h-[100%]">test 3</div>
          <div className="bg-blue-700 h-[100%]">test 4</div>
          <div className="bg-blue-700 h-[100%]">test 5</div>
        </CodeCarousel>
        {/* <LoadByButtonXStateCodeDescription /> */}
      </div>
    </div>
  );
};

export default ExamplesPage;
