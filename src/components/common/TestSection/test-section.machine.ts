import { assign, createMachine } from "xstate";

export enum BasicReactAnswers {
  setPosts = "setPosts",
  posts = "posts",
  Posts = "Posts",
}

export const createTestSectionMachine = <Answer extends string>({
  id,
  correctAnswer,
}: {
  id: string;
  correctAnswer: Answer;
}) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQFEAZegYQBUBtABgF1FQADgHtYuAC64h+fiAAeiAExKSAFgCcCgIwAOAOwBWADQgAnom2aS+zWtt37a7QF8nxtFjyFS5KnQCqAEIAsgCSnLwywqISUjLyCJq6lgoAzNoKFgpGpoiaKbok2tpqumqaAGyVVeW6Lm4YOATEZJQ0tIGhnJp8SCBR4pLSvfGJyWkZmlnGZglFJGklZdVVtXUg+EIQcDLujV6RIgOxw4gAtJrTZ-okjlx39w9cOmu7ns0+YAfRg3GIKrqXWYKVS6FKTdQORwvBpvUiYKQAM1wACdUJAvkchqB4voVICVCpgUVFhVlqt6h4mnDESi0RASPDkciwJgxBiYli5LkuApAfoUkTiqVSdVySBXlSGTTUZAyPhGczWeyficEjzAeU0vMhUsyS4XEA */
      id,

      context: {
        correctAnswer,
      },

      states: {
        idle: {
          on: {
            SELECT: {
              target: "idle",
              actions: "onSelect",
            },
            SUBMIT: [
              {
                target: "confirmed.correct",
                cond: "isCorrect",
              },
              "confirmed.incorrect",
            ],
          },
        },

        confirmed: {
          type: "final",

          states: {
            correct: {
              entry: "onCorrect",
            },
            incorrect: {
              entry: "onIncorrect",
            },
          },
        },
      },

      tsTypes: {} as import("./test-section.machine.typegen").Typegen0,

      initial: "idle",

      schema: {
        events: {} as { type: "SELECT"; payload: Answer } | { type: "SUBMIT" },
        context: {} as { selection?: Answer; correctAnswer: Answer },
      },
    },
    {
      actions: {
        onSelect: assign({
          selection: (_context, event) => event.payload,
        }),
      },
      guards: {
        isCorrect: (context) => context.correctAnswer === context.selection,
      },
    }
  );
