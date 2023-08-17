import { propsAreEqual } from "@/utils/propsAreEqual";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  memo,
} from "react";

type ButtonVariant = "filled" | "outlined";
type ButtonColor = "primary" | "default";

interface ButtonProps extends PropsWithChildren {
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const variantToClass = (variant: ButtonVariant, color: ButtonColor) => {
  const classNames: string[] = [];

  if (variant === "filled" && color === "default") {
    classNames.push(
      "bg-neutral-800 hover:bg-neutral-700 focus:ring-neutral-800"
    );
  } else if (variant === "filled" && color === "primary") {
    classNames.push(
      "bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-neutral-600"
    );
  } else if (variant === "outlined" && color === "default") {
    classNames.push(
      "border border-neutral-800 hover:border-neutral-700 focus:ring-neutral-800"
    );
  } else if (variant === "outlined" && color === "primary") {
    classNames.push(
      "border border-yellow-400 hover:border-yellow-300 text-yellow-400 hover:text-yellow-300 focus:ring-yellow-600"
    );
  }

  return clsx(classNames);
};

const BaseButton: FC<ButtonProps> = ({
  children,
  variant = "filled",
  buttonProps = {},
  color = "default",
}) => {
  return (
    <button
      {...buttonProps}
      className={clsx(
        "py-2.5 px-5 focus:outline-none rounded-full focus:z-10 focus:ring-4",
        variantToClass(variant, color),
        buttonProps.className
      )}
    >
      {children}
    </button>
  );
};

export const Button = memo(BaseButton, (pervProps, nextProps) => {
  const { buttonProps: prevButtonProps, ...restPrevProps } = pervProps;
  const { buttonProps: nextButtonProps, ...restNextProps } = nextProps;

  return (
    propsAreEqual(restPrevProps, restNextProps) &&
    propsAreEqual(prevButtonProps, nextButtonProps)
  );
});
