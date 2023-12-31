import { SandpackProps } from "@codesandbox/sandpack-react/types";

export const commonFilesLoading = {
  "/Loader.js": {
    hidden: true,
    code: `

const Loader = () => (
  <div role="status" className="py-4">
    <svg
      aria-hidden="true"
      className="w-8 h-8 mr-2 animate-spin text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>

  );
export default Loader;
`,
  },
  "/Posts.js": {
    hidden: true,
    code: `

    const Posts = ({ posts }) => (
      <dl className="divide-y divide-gray-700 ">
        {posts.map((post) => (
          <div className="flex flex-col py-3" key={post.id}>
            <span className="mb-1 text-[var(--text-color)] md:text-lg">
              {post.title}
            </span>
          </div>
        ))}
      </dl>
    );
export default Posts;
    `,
  },
  "/index.css": {
    hidden: true,
    code: `
    body {
      padding: 32px;
      background-color: var(--bg-color);
      font-family: 'Fira Code', monospace;
    }
    :root {
      color-scheme: dark;
    }
    `,
  },
  "/utils.js": {
    hidden: true,
    code: `export const loadPosts = async() => {
      const timeToWait = 1000;
      const timeBeforeFetching = Date.now();
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const timeAfterFetching = Date.now();
      return new Promise(res => {
        setTimeout(() => {
          res(data)
        }, Math.max(timeToWait - (timeAfterFetching - timeBeforeFetching), 0))
      })
    }
    
  export const Button = ({children, ...rest}) =>  <button className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" {...rest}>{children}</button>
    `,
  },
  "/index.js": {
    hidden: false,
    code: `import React, { StrictMode, useState } from "react";
    import { useMachine } from '@xstate/react';
    import { createMachine, assign } from 'xstate';
    import { loadPosts, Button } from './utils';
    import axios from 'axios';
    import Posts from './Posts';
    import Loader from './Loader';
    
    window.useMachine = useMachine;
    window.createMachine = createMachine;
    window.assign = assign;
    window.loadPosts = loadPosts;
    
    window.useState = useState;
    window.Loader = Loader;
    window.Posts = Posts;
    window.axios = axios;
    window.Button = Button;

    import { createRoot } from "react-dom/client";
    import "./styles.css";
    import './index.css';
    import App from "./App";

    const root = createRoot(document.getElementById("root"));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );`,
  },
} satisfies SandpackProps["files"];

export const appendFile = (
  file: keyof typeof commonFilesLoading,
  content: string
) => ({
  [file]: {
    ...commonFilesLoading[file],
    code: content + commonFilesLoading[file].code,
  },
});
