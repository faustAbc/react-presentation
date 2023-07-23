"use client";

import { useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const changeProgressMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDAdjAtABwCcB7KAuWHAW3TQEtMwA6WiAGzAGIAPWAF3V5N0AM0EEAFAEYADLICUHNFlyESZWBWp0GzNmADa0gLqJQeIrFq9aRTKZBdEANgAcjAEwBWAMwBOaU5eADQgAJ6ILpKMngC+cSGYRBBw9krYYPjEpORUNKj0YPbmlta29o4IOJIh4ZVO8SBpKlnqmnkFuuxFFlY2dkgOiAAsAOw1iJLeQ3FxQA */
  predictableActionArguments: true,

  id: "change-progress-machine",

  context: {
    progress: 0,
  },

  schema: {
    actions: {} as { type: "CHANGE"; payload: number },
  },

  tsTypes: {} as import("./index.typegen").Typegen0,

  states: {
    idle: {
      after: {
        // 2000: {
        //   internal: false,
        //   target: "idle",
        //   actions: assign({
        //     progress: (context) => (context.progress + 0.2) % 1.2,
        //   }),
        // },
      },
    },
  },

  initial: "idle",
});

const visibilityMachine = createMachine({
  predictableActionArguments: true,
  id: "visibility-machine",
  initial: "hidden",
  schema: {
    events: {} as { type: "SHOW" },
  },
  states: {
    hidden: {
      on: {
        SHOW: "visible",
      },
    },
    visible: {
      after: {
        1000: "hidden",
      },
    },
  },
});

export const ProgressPanel = () => {
  const [state] = useMachine(changeProgressMachine);

  const [visibilityState, sendVisibility] = useMachine(visibilityMachine);

  useEffect(() => {
    if (state.context.progress !== 0) sendVisibility("SHOW");
  }, [state.context.progress]);

  return (
    <div className="absolute top-0 right-0 bottom-0 mt-8 mr-8">
      <motion.div
        initial={false}
        animate={visibilityState.value}
        variants={{
          visible: { top: 90 },
          hidden: { top: -200 },
        }}
        transition={{
          type: "spring",
          bounce: 0.2,
        }}
        className="z-10 top-[120px] right-8 w-[290px] bg-zinc-800 rounded-2xl p-4 flex flex-col gap-2 sticky"
      >
        <span>Progress</span>
        <div className="w-full bg-zinc-900 rounded-full h-2.5 ">
          <motion.div
            className="bg-amber-600 h-2.5 rounded-full"
            animate={{ width: `${state.context.progress * 100}%` }}
            transition={{
              delay: 0.2,
              type: "spring",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
