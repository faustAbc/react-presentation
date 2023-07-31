"use client";

import { InlineCode } from "@/components/common/InlineCode";
import { Chip } from "@/components/pages/xstateComparison/Chip";
import { CodeCarousel } from "@/components/pages/xstateComparison/CodeCarousel";
import {
  LoadByButtonNativeCode,
  LoadByButtonXStateCodeDescription,
} from "@/components/pages/xstateComparison/LoadByButtonNativeCode";
import { LoadByButtonXStateCode } from "@/components/pages/xstateComparison/LoadByButtonXStateCode";
import { ProgressPanel } from "@/components/pages/xstateComparison/ProgressPanel";
import { inspect } from "@xstate/inspect";
import CursorArrowRaysOutline from "@heroicons/react/24/outline/CursorArrowRaysIcon";
import BookOpenOutline from "@heroicons/react/24/outline/BookOpenIcon";
import StarOutline from "@heroicons/react/24/outline/StarIcon";
import StarSolid from "@heroicons/react/24/solid/StarIcon";
import { createMachine, assign, interpret } from "xstate";
import clsx from "clsx";
import { Highlight } from "@/components/common/Highlight";

const fetchMachine = createMachine({
  id: "fetch",
  initial: "idle",
  context: {
    posts: [],
  },
  states: {
    idle: {
      on: { FETCH: "loading" },
    },
    loading: {
      invoke: {
        id: "load-posts",
        src: () => Promise.resolve([]),
        onDone: {
          target: "success",
          actions: assign({
            posts: (context, event) => event.data,
          }),
        },
      },
    },
    success: {
      on: {
        FETCH: "loading",
      },
    },
  },
});

interpret(fetchMachine, { devTools: true }).start({});

if (typeof window !== "undefined") {
  inspect({
    iframe: false,
  });
}

const ExamplesPage = () => {
  return (
    <div className="relative flex flex-col gap-32 mt-16">
      <div className="h-[400px] w-[300px] rotate-45 blur-3xl bg-blue-700 absolute top-[120px] -left-[240px]"></div>
      <ProgressPanel />
      <div className="p-8 max-w-screen-lg m-auto">
        <h1 className="text-6xl text-center font-semibold">
          XState <span className="text-4xl opacity-50">vs</span> React hooks🪝{" "}
        </h1>
        <div className="mt-6">
          A comparison of
          <Highlight>day-to-day</Highlight>
          tasks implemented in XState and natively in React
        </div>
        <div className="flex mt-4">
          <Chip>
            {(hovered) => (
              <>
                <CursorArrowRaysOutline
                  className={clsx(
                    "w-4 [&>path]:transition-all [&>path]:duration-1000",
                    hovered
                      ? "[&>path]:fill-yellow-400 stroke-yellow-400"
                      : "[&>path]:fill-black"
                  )}
                />
                Interactive tutorial
              </>
            )}
          </Chip>
          <Chip>
            {(hovered) => (
              <>
                <BookOpenOutline
                  className={clsx(
                    "w-4 [&>path]:transition-all [&>path]:duration-1000",
                    hovered
                      ? "[&>path]:fill-yellow-400 stroke-yellow-400"
                      : "[&>path]:fill-black"
                  )}
                />
                12 minutes read
              </>
            )}
          </Chip>
          <Chip>
            {(hovered) => (
              <>
                Difficulty
                <div className="flex">
                  <StarSolid
                    className={clsx(
                      "w-4 [&>path]:transition-all [&>path]:duration-1000",
                      hovered && "fill-yellow-400"
                    )}
                  />
                  <StarSolid
                    className={clsx(
                      "w-4 [&>path]:transition-all [&>path]:duration-1000",
                      hovered && "fill-yellow-400"
                    )}
                  />
                  <StarOutline
                    className={clsx(
                      "w-4 [&>path]:transition-all [&>path]:duration-1000",
                      hovered && "stroke-yellow-400"
                    )}
                  />
                </div>
              </>
            )}
          </Chip>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-20 max-w-screen-lg m-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold">Why should I read it</h3>
          During our small journey we&apos;ll
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
          ...and try to find a golden egg 🥚 in the end. So let&apos;s kick off
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold">Data fetching</h3>
          <span>
            One of most common tasks for React developer is to fetch some data
            from remote endpoint. To be consistent, let&apos;s introduce some
            user story to implement
          </span>
          <blockquote className="p-8 my-4 border-l-4 border-gray-300 ">
            <p className=" leading-relaxed text-gray-400">
              I want to load posts by clicking on a button.
              <br />
              While posts are being loaded, I need to see loading indicator.
            </p>
          </blockquote>
          <span>
            Let&apos;s see how you would probably do it with React hooks:
          </span>
          <div className="my-8">
            <LoadByButtonNativeCode />
          </div>
          <span>
            Nothing fancy, we just fetch some data in
            <InlineCode text="loadData" />, store it in
            <InlineCode text="posts" /> variable and trigger it by clicking a
            button.
          </span>
        </div>
      </div>
      <div className="bg-gray-100 text-black p-10">
        <div className="max-w-screen-lg m-auto my-16">
          <p>
            Now let&apos;s first take a look on XState implementation of the
            same functionality:
          </p>
          <div className="my-8">
            <LoadByButtonXStateCode />
          </div>
          It&apos;s cool, but what the magix happens there?
        </div>
      </div>
      <div className="h-[400px] m-16">
        <CodeCarousel>
          <div className="w-full h-[100%]">
            <iframe data-xstate></iframe>
          </div>
          <LoadByButtonXStateCodeDescription />

          <div className=" h-[100%]">test 3</div>
          <div className=" h-[100%]">test 4</div>
          <div className=" h-[100%]">test 5</div>
        </CodeCarousel>
      </div>
    </div>
  );
};

export default ExamplesPage;
