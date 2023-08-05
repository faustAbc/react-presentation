// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    addProgressItems: "ADD_PROGRESS_ITEMS";
    calculateProgress: "ADD_PROGRESS_ITEMS" | "UPDATE_PROGRESS";
    updateProgressItems: "UPDATE_PROGRESS";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: "idle";
  tags: never;
}

export interface Typegen1 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(3000)#visibility-machine.visible": {
      type: "xstate.after(3000)#visibility-machine.visible";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {};
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: "hidden" | "hovered" | "visible";
  tags: never;
}
