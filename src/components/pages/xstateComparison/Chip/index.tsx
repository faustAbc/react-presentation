import { ReactNode, FC, useState } from "react";

interface ChipProps {
  children: (hovered: boolean) => ReactNode;
}

export const Chip: FC<ChipProps> = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit flex justify-center items-center font-medium py-2 px-3 bg-neural-500 bg-opacity-20 rounded-full text-white-100  border border-neutral-800 hover:border-yellow-400 transition-colors duration-1000"
    >
      <div className="text-xs font-normal leading-none flex-initial flex items-center gap-2">
        {children(hovered)}
      </div>
    </div>
  );
};
