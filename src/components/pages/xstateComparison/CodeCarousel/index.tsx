import {
  AnimatePresence,
  AnimationProps,
  MotionConfig,
  wrap,
} from "framer-motion";
import { Children, FC, PropsWithChildren, useState } from "react";
import { motion } from "framer-motion";
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
            progress: (context, event) => event.payload,
          }),
        },
      },
      after: {
        // 1000: {
        //   internal: false,
        //   target: "idle",
        //   actions: assign({
        //     progress: (context) => (context.progress + 1) % 5,
        //   }),
        // },
      },
    },
  },

  initial: "idle",
});

interface ArrowProps {
  direction: "right" | "left";
  onClick: () => void;
  disabled: boolean;
}

const Arrow: FC<ArrowProps> = ({ direction, onClick, disabled }) => {
  // const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return null;
  // <Icon
  //   onClick={onClick}
  //   className={clsx(
  //     `w-8 h-8 transition-opacity`,
  //     disabled ? "pointer-events-none opacity-0" : "cursor-pointer"
  //   )}
  // />
};
export const CodeCarousel: FC<PropsWithChildren> = ({ children }) => {
  const childrenCount = Children.count(children);
  const [progressMachine, sendProgressMachine] = useMachine(
    changeProgressMachine
  );
  const currentPage = progressMachine.context.progress;

  return (
    <div className="">
      <div className="h-full w-full relative flex items-center gap-4">
        <Arrow
          onClick={() =>
            sendProgressMachine({ type: "CHANGE", payload: currentPage - 1 })
          }
          direction="left"
          disabled={currentPage === 0}
        />
        <div className="h-full w-full mb-8 overflow-hidden items-stretch">
          <div
            className="h-full flex flex-1 items-stretch"
            style={{ width: `${100 * childrenCount}%` }}
          >
            {Children.map(children, (child, index) => (
              <div
                key={index}
                className="w-full flex-1 transition-all"
                style={{
                  transform: `translateX(${100 * -currentPage}%)`,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <Arrow
          onClick={() =>
            sendProgressMachine({ type: "CHANGE", payload: currentPage + 1 })
          }
          direction="right"
          disabled={currentPage === childrenCount - 1}
        />
      </div>
      <div className="flex justify-center pb-24">
        <div className="relative flex justify-center gap-x-4">
          {Array.from({ length: childrenCount }).map((_, index) => (
            <div
              onClick={() =>
                sendProgressMachine({ type: "CHANGE", payload: index })
              }
              className={`w-4 h-4 rounded-full cursor-pointer bg-zinc-900`}
              key={index}
            />
          ))}
          <div className="absolute pointer-events-none top-0.5 left-0.5 right-[-10px]">
            <div
              className="flex overflow-hidden gap-x-5 top-1 rounded-r-full transition-all"
              style={{
                width: 12 + 32 * currentPage,
                animationTimingFunction: "cubic-bezier(.17,.67,.77,1.39)",
              }}
            >
              {Array.from({ length: childrenCount }).map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    "h-3 w-3 rounded-full bg-white right-0 sticky shrink-0",
                    {
                      "ml-auto": index === childrenCount - 1,
                    }
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
