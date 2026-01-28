import { Ban, File, Image, Mic, Sticker } from "lucide-react";
import { memo } from "react";

type IMessagePreview = {
  message: any;
  searchedTerm: string;
  isByGlobalSearch: boolean;
};

export const MessagePreview = memo(
  ({ message, searchedTerm, isByGlobalSearch }: IMessagePreview) => {
    const highlightTerm = (text: string, term: string, contextWords = 2) => {
      if (!term) return text;

      const regex = new RegExp(`(${term})`, "i");
      const match = text.match(regex);

      if (!match) return text;

      const matchIndex = match.index!;

      const words = text.split(" ");
      let charCount = 0;
      let matchWordIndex = -1;

      for (let i = 0; i < words.length; i++) {
        charCount += words[i].length + 1;
        if (charCount >= matchIndex + term.length) {
          matchWordIndex = i;
          break;
        }
      }

      if (matchWordIndex === -1) return text;

      const start = Math.max(matchWordIndex - contextWords, 0);
      const end = Math.min(matchWordIndex + contextWords + 1, words.length);
      const clippedWords = words.slice(start, end);
      const showStartEllipsis = start > 0;
      const showEndEllipsis = end < words.length;

      const clippedText = clippedWords.join(" ");
      const finalParts = clippedText.split(new RegExp(`(${term})`, "gi"));

      return (
        <>
          {showStartEllipsis && <span>... </span>}
          {finalParts.map((part, index) =>
            part.toLowerCase() === term.toLowerCase() ? (
              <span key={index} className="bg-yellow-700 text-white px-1">
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            ),
          )}
          {showEndEllipsis && <span> ...</span>}
        </>
      );
    };

    const getMessageType = (msg: any) => {
      if (msg.data?.type) return msg.data.type;
      if (msg.data?.content) return "conversation";
      if (msg.data?.audioMessage) return "audioMessage";
      if (msg.data?.documentMessage) return "documentMessage";
      if (msg.data?.imageMessage) return "imageMessage";
      if (msg.data?.stickerMessage) return "stickerMessage";
      return "conversation";
    };

    const messageType = getMessageType(message);
    const content = message.data?.content || "";
    const isDeleted = message.isDeleted || false;

    return (
      <div className="text-xs text-gray-600 flex items-center gap-1">
        {/* Indicador de mensagem enviada */}

        <span className="flex-1 truncate">
          {isDeleted ? (
            <span className="text-neutral-400 flex items-center gap-1 italic">
              <Ban size={12} /> Mensagem apagada
            </span>
          ) : (
            <>
              {messageType === "conversation" && isByGlobalSearch
                ? highlightTerm(content, searchedTerm)
                : messageType === "conversation" && content}

              {messageType === "audioMessage" && (
                <span className="flex items-center gap-1 italic">
                  <Mic size={14} /> Mensagem de voz
                </span>
              )}

              {messageType === "documentMessage" && (
                <span className="flex items-center gap-1 italic">
                  <File size={14} /> Documento
                </span>
              )}

              {messageType === "imageMessage" && (
                <span className="flex items-center gap-1 italic">
                  <Image size={14} /> Imagem
                </span>
              )}

              {messageType === "stickerMessage" && (
                <span className="flex items-center gap-1 italic">
                  <Sticker size={14} /> Figurinha
                </span>
              )}
            </>
          )}
        </span>
      </div>
    );
  },
);
