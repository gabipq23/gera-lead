import { memo } from "react";
import { IBaseMessage } from ".";
import { Checks } from "@phosphor-icons/react";
import { MessageFormatter } from "@/utils/messages-formatter";

interface ITextMessage extends IBaseMessage {
  wasEdited: boolean;
  text: string;
  highlightTerm?: string;
  isCurrentMatch: boolean;
}

export const TextMessage = memo(
  ({ text, messageTime, highlightTerm, isCurrentMatch }: ITextMessage) => {
    const changeMessageWithSearchedTerm = (
      highlightTerm: string,
      formattedText: string,
      isCurrentMatch: boolean
    ) => {
      const regex = new RegExp(`(${highlightTerm})`, "gi");
      const highlightClass = isCurrentMatch ? "bg-yellow-300" : "bg-yellow-700";

      return formattedText.replace(
        regex,
        `<mark class="${highlightClass}">$1</mark>`
      );
    };

    let formattedText = MessageFormatter.transformText(text);

    if (highlightTerm) {
      formattedText = changeMessageWithSearchedTerm(
        highlightTerm,
        formattedText,
        isCurrentMatch
      );
    }

    return (
      <div>
        <div className="flex flex-col gap-2 max-w-[60%] w-max mr-auto overflow-hidden">
          <div className="flex justify-between gap-2 bg-primary shadow-md p-2 rounded-md border border-b-gray-300 w-full">
            <p
              className="text-sm text-slate-300 dark:text-gray-800 relative"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
            <Checks
              size={16}
              color="#b3b3b3"
              className="justify-self-end mt-1"
            />
          </div>
          <small className="flex items-center text-[11px] font-normal text-neutral-500 dark:text-neutral-300 justify-start">
            {messageTime}
          </small>
        </div>
      </div>
    );
  }
);
