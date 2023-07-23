import {
  AnimatePresence,
  AnimationProps,
  MotionConfig,
  wrap,
} from "framer-motion";
import { Children, FC, PropsWithChildren, useState } from "react";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import clsx from "clsx";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
const changeProgressMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDAdjAtABwCcB7KAuWHAW3TQEtMwA6WiAGzAGIAPWAF3V5N0AM0EEAFAEYADLICUHNFlyESZWBWp0GzNmADa0gLqJQeIrFq9aRTKZBdEANgAcjAEwBWAMwBOaU5eADQgAJ6ILpKMngC+cSGYRBBw9krYYPjEpORUNKj0YPbmlta29o4IOJIh4ZVO8SBpKlnqmnkFuuxFFlY2dkgOiAAsAOw1iJLeQ3FxQA */
  predictableActionArguments: true,

  id: "change-progress-machine",

  context: {
    progress: 0,
  },

  schema: {
    events: {} as { type: "CHANGE"; payload: number },
  },

  tsTypes: {} as import("./index.typegen").Typegen0,

  states: {
    idle: {
      on: {
        CHANGE: {
          actions: assign({
            progress: (context, event) => event.payload % 5,
          }),
        },
      },
      // after: {
      //   2000: {
      //     internal: false,
      //     target: "idle",
      //     actions: assign({
      //       progress: (context) => (context.progress + 1) % 5,
      //     }),
      //   },
      // },
    },
  },

  initial: "idle",
});

export const CodeCarousel: FC<PropsWithChildren> = ({ children }) => {
  const childrenCount = Children.count(children);
  const [progressMachine, sendProgressMachine] = useMachine(
    changeProgressMachine
  );
  const currentPage = progressMachine.context.progress;
  console.log({ currentPage });

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="3"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              // values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>

      <div className="h-full w-full relative">
        <div className="h-full w-full bg-slate-600 mb-8 overflow-hidden">
          <div
            className="h-full flex"
            style={{ width: `${100 * childrenCount}%` }}
          >
            {Children.map(children, (child, index) => (
              <motion.div
                key={index}
                className="h-full w-full"
                initial={false}
                animate={{
                  translateX: `${100 * -currentPage}%`,
                }}
                transition={{
                  bounce: 0,
                  ease: "anticipate",
                }}
              >
                {child}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-24">
          <div
            style={{
              filter: 'url("#goo")',
            }}
            className="relative flex justify-center gap-x-4"
          >
            {Array.from({ length: childrenCount }).map((_, index) => (
              <motion.div
                onClick={() =>
                  sendProgressMachine({ type: "CHANGE", payload: index })
                }
                animate={{
                  background: index <= currentPage ? "white" : "rgb(24 24 27)",
                }}
                className={clsx(`w-2 h-2 rounded-full cursor-pointer`)}
                key={index}
              />
            ))}
            <motion.div
              className="h-3 w-3 rounded-full bg-white absolute -top-0.5 left-0"
              animate={{
                translateX: 24 * currentPage,
              }}
              transition={{
                duration: 0.4,
              }}
            />
          </div>
        </div>
        <ChevronLeftIcon
          onClick={() =>
            sendProgressMachine({ type: "CHANGE", payload: currentPage - 1 })
          }
          className={clsx(
            `w-8 h-8 absolute top-1/2 left-4 -translate-y-2/4 transition-opacity`,
            {
              "pointer-events-none": currentPage === 0,
              "opacity-0": currentPage === 0,
            }
          )}
        />
        <ChevronRightIcon
          onClick={() =>
            sendProgressMachine({
              type: "CHANGE",
              payload: currentPage + 1,
            })
          }
          className={clsx(
            `w-8 h-8 absolute top-1/2 right-4 -translate-y-2/4 duration-400 transition-opacity`,
            {
              "pointer-events-none": currentPage === childrenCount - 1,
              "opacity-0": currentPage === childrenCount - 1,
            }
          )}
        />
      </div>
    </>
  );
};
