import { FC } from "react";

interface InlineCodeProps {
  text: string;
}

export const InlineCode: FC<InlineCodeProps> = ({ text }) => (
  <pre className="inline-block bg-gray-300 px-1 rounded-md  text-black leading-tight">
    {text}
  </pre>
);
