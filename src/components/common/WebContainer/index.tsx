"use client";

import {
  FileSystemTree,
  WebContainer as WebContainerClass,
} from "@webcontainer/api";
import { useEffect, useRef } from "react";

export const files = {
  "index.js": {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  "package.json": {
    file: {
      contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
} satisfies FileSystemTree;

export const WebContainer = () => {
  const webcontainerInstance = useRef<WebContainerClass>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const bootContainer = async () => {
      webcontainerInstance.current = await WebContainerClass.boot();
      await webcontainerInstance.current.mount(files);

      const installProcess = await webcontainerInstance.current.spawn("npm", [
        "install",
      ]);
      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        throw new Error("Unable to run npm install");
      }

      webcontainerInstance.current.on("server-ready", (port, url) => {
        console.log("started");

        if (!iframeRef.current) return;
        iframeRef.current.src = url;
      });

      await webcontainerInstance.current.spawn("npm", ["run", "start"]);
    };

    bootContainer();
  }, []);

  return (
    <div className="bg-slate-300 w-full h-[500px] flex">
      <textarea className="h-full w-1/2"></textarea>
      <iframe className="bg-slate-300 h-full w-1/2" ref={iframeRef}></iframe>
    </div>
  );
};
