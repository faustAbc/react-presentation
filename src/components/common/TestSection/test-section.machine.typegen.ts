// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "onCorrect" | "onIncorrect";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    onCorrect: "SUBMIT";
    onIncorrect: "SUBMIT";
    onSelect: "SELECT";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isCorrect: "SUBMIT";
  };
  eventsCausingServices: {};
  matchesStates:
    | "confirmed"
    | "confirmed.correct"
    | "confirmed.incorrect"
    | "idle"
    | { confirmed?: "correct" | "incorrect" };
  tags: never;
}
