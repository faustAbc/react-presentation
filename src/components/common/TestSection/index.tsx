import { Button } from "@/components/common/Button";
import { createTestSectionMachine } from "@/components/common/TestSection/test-section.machine";
import { changeProgressMachine } from "@/components/pages/xstateComparison/ProgressPanel";
import { GlobalStateContext } from "@/state";
import { useActor, useMachine } from "@xstate/react";
import clsx from "clsx";
import {
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";

type AnswerProps<Selection extends string> = {
  value: Selection;
  selected: boolean;
  onSelect: () => void;
  correct: boolean;
  incorrect: boolean;
} & PropsWithChildren;

const Answer = <Selection extends string>({
  children,
  value,
  selected,
  onSelect,
  correct,
  incorrect,
}: AnswerProps<Selection>) => {
  return (
    <label
      htmlFor={value}
      className={clsx(
        "cursor-pointer flex border border-neutral-800 rounded-full p-4 items-center gap-2 transition-colors bg-opacity-20",
        selected && "border-yellow-400",
        selected && correct && "bg-yellow-400",
        selected && incorrect && "bg-red-400 border-red-400"
      )}
    >
      <input
        id={value}
        type="radio"
        value={value}
        onChange={onSelect}
        checked={selected}
        className={clsx(
          "w-4 h-4  bg-gray-700 border-gray-600",
          selected && incorrect
            ? "bg-red-400 border-red-400 accent-red-400"
            : "accent-yellow-400"
        )}
      />
      {children}
    </label>
  );
};

interface TestSectionProps<Selection extends string> {
  options: {
    value: Selection;
    content: ReactNode;
    correct?: boolean;
  }[];
  id: string;
}

export const TestSection = <Selection extends string>({
  options,
  id,
}: TestSectionProps<Selection>) => {
  const {
    changeProgressService: { send: sendProgress },
  } = useContext(GlobalStateContext);

  const correctAnswer = useMemo(() => {
    const correctOptions = options.filter((option) => option.correct);
    if (correctOptions.length !== 1) {
      throw new Error("There is 0 or more then one correct options");
    }

    return correctOptions[0].value;
  }, [options]);

  const updateProgress = (isCompleted: boolean) =>
    sendProgress({
      type: "UPDATE_PROGRESS",
      payload: {
        isCompleted,
        itemName: id,
      },
    });

  const [state, send] = useMachine(
    useMemo(
      () => createTestSectionMachine({ id, correctAnswer }),
      [correctAnswer, id]
    ),
    {
      actions: {
        onCorrect: () => updateProgress(true),
        onIncorrect: () => updateProgress(false),
      },
    }
  );

  useEffect(() => {
    sendProgress({
      type: "ADD_PROGRESS_ITEMS",
      payload: {
        itemsToAdd: [id],
      },
    });
  }, [id, sendProgress]);

  return (
    <div className="text-white my-16">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send("SUBMIT");
        }}
        className="max-w-screen-lg mx-auto rounded-[40px] px-16 py-8"
      >
        <p className="lead text-yellow-400">
          <AcademicCapIcon width={48} className="inline stroke-yellow-400" />{" "}
          Check yourself
        </p>
        <legend>
          <p>
            Now let’s verify you understand React hooks implementation:
            <br /> What variable stores posts to display?
          </p>
        </legend>

        <fieldset className="flex flex-col gap-2">
          {options.map(({ content, value, correct }) => {
            const selected = value === state.context.selection;

            return (
              <Answer
                selected={selected}
                onSelect={() => {
                  send({
                    type: "SELECT",
                    payload: value,
                  });
                }}
                key={value}
                value={value}
                correct={state.matches("confirmed") && !!correct}
                incorrect={state.matches("confirmed") && !correct}
              >
                {content}
              </Answer>
            );
          })}
          <div className="ml-auto mt-4 mb-8">
            <Button color="primary" variant="outlined">
              Confirm
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
