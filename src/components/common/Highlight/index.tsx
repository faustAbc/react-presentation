import { FC, PropsWithChildren } from "react";

export const Highlight: FC<PropsWithChildren> = ({ children }) => (
  <span className="mx-3 before:block before:absolute before:-inset-1  before:bg-[#ffd800] relative">
    <span className="relative text-black">{children}</span>
  </span>
);
