"use client";

import React, { FC, PropsWithChildren, createContext } from "react";
import { useInterpret } from "@xstate/react";
import { changeProgressMachine } from "@/components/pages/xstateComparison/ProgressPanel";
import { InterpreterFrom } from "xstate";

export const GlobalStateContext = createContext({
  changeProgressService: {} as InterpreterFrom<typeof changeProgressMachine>,
});

export const GlobalStateProvider: FC<PropsWithChildren> = (props) => {
  const changeProgressService = useInterpret(changeProgressMachine);

  return (
    <GlobalStateContext.Provider value={{ changeProgressService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
