"use client";

import { appendFile, commonFilesLoading } from "@/config/code/common";
import { Sandpack } from "@codesandbox/sandpack-react";
import { SandpackProps } from "@codesandbox/sandpack-react/types";

export const loadingByButtonXState = {
  ...commonFilesLoading,
  ...appendFile(
    "/index.css",
    `:root {

      --bg-color: #151515;
      --text-color: gray;  }`
  ),
  "/App.js": {
    code: `import { createMachine, assign } from "xstate";
import { loadPosts } from "./utils";

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
        src: loadPosts,
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

const App = () => {
  const [state, send] = useMachine(fetchMachine);

  return (
    <>
      <Button onClick={() => send("FETCH")}>Load posts</Button>
      {state.matches("loading") && <Loader />}
      <Posts posts={state.context.posts} />
    </>
  );
};

export default App;`,
    active: true,
  },
} satisfies SandpackProps["files"];

export const LoadByButtonXStateCode = () => (
  <Sandpack
    theme="dark"
    template="react"
    files={loadingByButtonXState}
    options={{
      externalResources: ["https://cdn.tailwindcss.com"],
      editorHeight: 490,
    }}
    customSetup={{
      dependencies: {
        axios: "latest",
        xstate: "latest",
        "@xstate/react": "latest",
      },
    }}
  />
);
