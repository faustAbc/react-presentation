"use client";

import { appendFile, commonFilesLoading } from "@/config/code/common";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackCodeViewer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { SandpackProps } from "@codesandbox/sandpack-react/types";

export const loadingByButtonNative = {
  ...commonFilesLoading,
  ...appendFile(
    "/index.css",
    `:root {
    --bg-color: #151515;
    --text-color: gray;
  }`
  ),
  "/App.js": {
    code: `const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const posts = await loadPosts();
    setIsLoading(false);
    setPosts(posts);
  };

  return (
    <>
      <Button onClick={loadData}>Load posts</Button>
      {isLoading && <Loader />}
      <Posts posts={posts} />
    </>
  );
};

export default App;
`,
    active: true,
  },
} satisfies SandpackProps["files"];

export const LoadByButtonNativeCode = () => (
  <div className="xl:mx-[-52px]">
    <Sandpack
      theme="dark"
      template="react"
      files={loadingByButtonNative}
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
  </div>
);

export const loadByButtonXStateCodeDescriptionFiles = {
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
`,
    active: true,
  },
} satisfies SandpackProps["files"];

export const LoadByButtonXStateCodeDescription = () => (
  <SandpackProvider
    options={{
      classes: {
        // "sp-wrapper": "custom-wrapper",
        // "sp-layout": "h-full",
        "sp-editor-viewer": "sp-editor-viewer-1",
      },
    }}
    template="react"
    theme={"dark"}
    files={loadByButtonXStateCodeDescriptionFiles}
  >
    <SandpackLayout className="test">
      <SandpackCodeViewer />
      <div className="flex-1">hello</div>
    </SandpackLayout>
  </SandpackProvider>
);
