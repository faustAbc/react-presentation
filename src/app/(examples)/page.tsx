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
import { TestSection } from "@/components/common/TestSection";
import { useMachine } from "@xstate/react";
import { useMemo } from "react";
import { BasicReactAnswers } from "@/components/common/TestSection/test-section.machine";

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

const ExamplesPage = () => {
  return (
    <>
      <div className="relative flex flex-col m-8 mt-16 prose prose-invert max-w-none">
        <ProgressPanel />
        <div className="max-w-screen-lg mx-auto">
          <h1 className="justify-center flex flex-wrap gap-3">
            <span>XState</span> <span className="opacity-50">vs</span>{" "}
            <span>React hooks</span>
          </h1>
          <div>
            A comparison of day-to-day tasks implemented in XState and natively
            in React
          </div>
          <div className="flex mt-4 gap-2 flex-wrap">
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
        <div className="mx-auto my-32">[image]</div>
        <div className="max-w-screen-lg mx-auto">
          <div>
            <h2>Why should I read it</h2>
            During our small journey we&apos;ll
            <ul>
              <li className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 mr-2 text-green-400 flex-shrink-0"
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
                  className="w-3.5 h-3.5 mr-2 text-green-400 flex-shrink-0"
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
                  className="w-3.5 h-3.5 mr-2 text-green-400 flex-shrink-0"
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
            ...and try to find a golden egg 🥚 in the end. So let&apos;s kick
            off
          </div>
          <div className="flex flex-col">
            <h2>React hooks way</h2>
            <span>
              One of most common tasks for React developer is to fetch some data
              from remote endpoint. To be consistent, let&apos;s introduce some
              user story to implement
            </span>
            <blockquote>
              <p>
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
              Nothing fancy, we just fetch some data in{" "}
              <InlineCode>loadData</InlineCode>, store it in
              <InlineCode>posts</InlineCode> variable and trigger it by clicking
              a button.
            </span>
          </div>
        </div>
        <TestSection
          id="basic-react-questions"
          options={useMemo(
            () => [
              {
                value: BasicReactAnswers.setPosts,
                content: <InlineCode>setPosts</InlineCode>,
              },
              {
                value: BasicReactAnswers.posts,
                content: <InlineCode>posts</InlineCode>,
                correct: true,
              },
              {
                value: BasicReactAnswers.Posts,
                content: <InlineCode>Posts</InlineCode>,
              },
            ],
            []
          )}
        />
        <div className="bg-[#151515] text-white px-10 -mx-[32px]">
          <div className="max-w-screen-lg m-auto my-16">
            <h2>XState intro</h2>
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
            <div className="h-full flex">
              <div className="w-1/2">it's diagram</div>
              <div className="w-1/2">
                This is a{" "}
                <strong className="text-yellow-400">
                  Finite State Machine
                </strong>{" "}
                and a <strong className="text-yellow-400">Statechart</strong>.
                <blockquote> - Wait, wait, wait, what is it?</blockquote>
                <pre className="text-neutral-600">{"<boooring-part>"}</pre>
                <p className="pl-8 -my-6">
                  Saying informally, Finite State Machine(or FSM, or just
                  Machine) has some states, can be in one state at a time, and
                  can change its current state. Statechart is State Machine on
                  steroids - it adds some cool staff like guarded transitions,
                  context and lots of others
                </p>
                <pre className="text-neutral-600">{"</boooring-part>"}</pre>
                <p>
                  States for our machine are <code>‘idle‘</code>,{" "}
                  <code>‘loading’</code> and
                  <code>‘success’</code>.
                </p>
                To set the current state to a new one we can send events: You
                see how ‘FETCH’ event can set state from <code>‘idle’</code> or
                <code>‘success’</code> to <code>‘loading’</code> state. These
                state changes are called transitions.
                <p>
                  You can check it yourself - just try to click on the diagram,
                  it’s interactive!
                </p>
              </div>
            </div>
            <LoadByButtonXStateCodeDescription />

            <div className=" h-[100%]">test 3</div>
            <div className=" h-[100%]">test 4</div>
            <div className=" h-[100%]">test 5</div>
          </CodeCarousel>
        </div>
      </div>
    </>
  );
};

export default ExamplesPage;
