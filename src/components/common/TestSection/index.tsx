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
        "cursor-pointer flex border border-neutral-800 rounded-full p-8 items-center gap-8 transition-colors bg-opacity-20",
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
      devTools: true,
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
    <div className="py-8 bg-amber-598 text-black  border-neutral-800 border-t border-b">
      <div className="text-white p-8 max-w-screen-lg mx-auto">
        <div className="my-8">
          <p>Now let’s verify you understand React hooks implementation:</p>
          <p>What variable stores posts to display?</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send("SUBMIT");
          }}
          className="flex flex-col gap-2"
        >
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
          <div className="ml-auto mt-4">
            <button className="py-2.5 px-5 mr-2 mb-2 font-medium focus:outline-none rounded-full border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
              Confirm ....... Add explanation if user's not correct
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
