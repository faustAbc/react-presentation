import { FC } from "react";

// type TypographyVariants =

interface TypographyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  variant: "";
}

export const Typography: FC<TypographyProps> = (props) => {
  return <span></span>;
};
