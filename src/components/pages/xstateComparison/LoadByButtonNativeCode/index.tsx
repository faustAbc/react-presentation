"use client";

import { appendFile, commonFilesLoading } from "@/config/code/common";
import {
  Sandpack,
  SandpackCodeEditor,
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
);

export const LoadByButtonXStateCodeDescription = () => (
  <SandpackProvider template="react" files={commonFilesLoading}>
    <SandpackLayout>
      <SandpackCodeEditor />
      <div>hello</div>
    </SandpackLayout>
  </SandpackProvider>
);
