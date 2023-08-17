import { FC, PropsWithChildren } from "react";

export const InlineCode: FC<PropsWithChildren> = ({ children }) => (
  <code className="text-neutral-300 inline-block bg-neutral-800 px-2 mx-1 pb-[2px] pt-[3px] rounded-full leading-tight not-prose">
    {children}
  </code>
);
