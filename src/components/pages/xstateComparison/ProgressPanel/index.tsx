"use client";

import { useActor, useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "@/state";

export const changeProgressMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDAdjAtABwCcB7KAuWHAW3TQEtMwA6WiAGzAGIBBAER4H0ACgCUA8gHFhAUQDKM-gEkAKlICyMgNoAGALqJQeIrFoAXWkUz6QAD0QAWAEwAaEAE9EDrQGZGATi0AbA4ArAC+oS5oWLiEJGSwFNR0DMxsnACqgjxcKkLCkrKaulaGxmYWVrYIwQAcjACMWr5eAOzBLu4INfWMYeEumEQQcFZR2GD4xKTkVDSo9GAlRqbmlkg2iDgBHZsB-SBjMVPxiXMLqexLZauViL4BjAFawXYBNW07CF5ePT8h4eEgA */
    predictableActionArguments: true,

    id: "change-progress-machine",

    context: {
      progress: 0,
      progressItems: {},
    },

    schema: {
      context: {} as {
        /** Amount in % from 0 to 1 */
        progress: number;
        progressItems: Record<string, boolean>;
      },
      events: {} as
        | {
            type: "UPDATE_PROGRESS";
            payload: {
              itemName: string;
              isCompleted: boolean;
            };
          }
        | { type: "ADD_PROGRESS_ITEMS"; payload: { itemsToAdd: string[] } },
    },

    tsTypes: {} as import("./index.typegen").Typegen0,

    states: {
      idle: {
        on: {
          ADD_PROGRESS_ITEMS: {
            actions: ["addProgressItems", "calculateProgress"],
          },
          UPDATE_PROGRESS: {
            actions: ["updateProgressItems", "calculateProgress"],
          },
        },
      },
    },

    initial: "idle",
  },
  {
    actions: {
      addProgressItems: assign({
        progressItems: (context, event) => ({
          ...context.progressItems,
          ...event.payload.itemsToAdd.reduce(
            (acc, name) => ({ ...acc, [name]: false }),
            {}
          ),
        }),
      }),
      calculateProgress: assign({
        progress: (context) => {
          const values = Object.values(context.progressItems);
          const completed = values.filter(Boolean);
          return completed.length / values.length;
        },
      }),
      updateProgressItems: assign({
        progressItems: (context, event) => ({
          ...context.progressItems,
          [event.payload.itemName]: event.payload.isCompleted,
        }),
      }),
    },
  }
);

const visibilityMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDcCWtUCNUBtUBcBPAWgFsBDAYwAtUA7MAOlogjDoGIBlACQHkA6gG0ADAF1EoAA4B7DPlQy6kkAA9EARgBsATkYiDBgOxaATDoDMOgCwBWCwBoQhTaaP7D220dumNG6wAOAF9gpzQMbDwiMipaBkYIrBwwDn4ANQBRACVRCSQQWXlFZQL1BGsNdy0jHV1bDXMrO0dnTQtTDwMvHz8AkLCQJKiCEgoaeiZhlI5VWHxyfCZyADMlgCcACgtDAEoOYdxR2ImE6bA8lSKCEpVy7T1DYzNLG3snFwRAjUZbTy1vL5-EFQuF0FgjjFxvEmNQZMgwOtIBwAKoAOQyOUuBWuCiUd0QlWqtXqjVeLQ+iG+v3+gL6INBIDoMjY8AKh2iYzikyuchu+LKiGIWkpCGFjI5x2hk2YqFY7F5xQFoHK1lMosCtn0gQsFmsOh0Ik11gZYMikK5pym4MwKUV-NKKsQ5hEjBqdR0DSab1an0C7lsOr1BqNthNAzNEM5JxhzHhiMg9rxjrUiFsYcYRj1VhEpkDRkCOg0osN2t1+sNxqCplCoSAA */
  predictableActionArguments: true,
  id: "visibility-machine",
  initial: "hidden",
  tsTypes: {} as import("./index.typegen").Typegen1,
  schema: {
    events: {} as { type: "SHOW" } | { type: "HOVER" } | { type: "UNHOVER" },
  },
  states: {
    hidden: {
      on: {
        SHOW: "visible",
      },
    },

    visible: {
      after: {
        3000: "hidden",
      },

      on: {
        HOVER: "hovered",
      },
    },

    hovered: {
      on: {
        UNHOVER: "visible",
      },
    },
  },
});

export const ProgressPanel = () => {
  const { changeProgressService } = useContext(GlobalStateContext);
  const [progressState] = useActor(changeProgressService);

  const [visibilityState, sendVisibility] = useMachine(visibilityMachine);

  useEffect(() => {
    if (progressState.context.progress !== 0) sendVisibility("SHOW");
  }, [sendVisibility, progressState.context.progress]);

  return (
    <div className="absolute top-0 right-0 bottom-0 mt-8 mr-8 pointer-events-none hidden lg:block">
      <motion.div
        initial={false}
        animate={visibilityState.value}
        variants={{
          visible: { top: 90 },
          hovered: { top: 90 },
          hidden: { top: -200 },
        }}
        transition={{
          type: "spring",
          bounce: 0.2,
        }}
        onMouseEnter={() => sendVisibility({ type: "HOVER" })}
        onMouseLeave={() => sendVisibility({ type: "UNHOVER" })}
        className="z-10 top-[120px] right-8 w-[290px] bg-neutral-900/80 rounded-2xl p-4 flex flex-col gap-2 sticky backdrop-blur-md "
      >
        <div className="flex justify-between">
          <span>Guide progress</span>
          <span>0/8</span>
        </div>
        <div className="w-full bg-neutral-900 rounded-full h-2.5 ">
          <motion.div
            initial={false}
            className="bg-yellow-400 h-2.5 rounded-full"
            animate={{ width: `${progressState.context.progress * 100}%` }}
            transition={{
              delay: 0.2,
              type: "spring",
              mass: 0.5,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
