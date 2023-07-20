"use client";

import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { FC } from "react";

export interface WebContainerProps extends SandpackProps {}

export const WebContainer: FC<WebContainerProps> = ({
  files,
  options,
  ...rest
}) => {
  return (
    <Sandpack
      theme="dark"
      template="react"
      files={files}
      options={options}
      customSetup={{
        dependencies: {
          axios: "latest",
          tailwindcss: "latest",
        },
      }}
      {...rest}
    />
  );
};
