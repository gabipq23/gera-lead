import { WhatsappLogo } from "@phosphor-icons/react";
import { Circle, Pause } from "lucide-react";
import { MessagePreview } from "./message-preview";
// import { FavoriteButton } from "./favorite-button";
import { IChat } from "@/interfaces/chat/chat"; // Import the Thermometer component
import { HandHelpButton } from "./hand-help-button";
import { useChatContext } from "@/hooks/use-chat";
import { MessagesService } from "@/services/messages";
import { useMutation } from "@tanstack/react-query";
import { formatPhoneNumber } from "@/utils/format_number";
import { Tooltip } from "@/components/chat/common/tooltip";
import { Button } from "@/components/chat/ui/button";
import { FireFromThermometer } from "@/components/chat/common/fire-from-thermometer";
import { Visible } from "@/components/chat/common/visible";
import { Image } from "@/components/chat/common/image";
import { Thermometer } from "@/components/chat/common/thermometer";

interface IContactButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  chat: IChat;
  isSelected: boolean;
  searchedTerm: string;
  isFavorite: boolean;
  // onFavorite: () => void;
  onHandHelpChange: () => void;
  isHandHelpButtonActive: boolean;
  isByGlobalSearch: boolean;
  clientsIdQuery?: any;
  botsQuery?: any;
}
const messagesService = new MessagesService();
export function ContactButton({
  chat,
  isSelected,
  searchedTerm,
  // isFavorite,
  clientsIdQuery,
  isByGlobalSearch,
  onClick,
  // onFavorite,
  onHandHelpChange,
  isHandHelpButtonActive,
  botsQuery,
}: IContactButtonProps) {
  const { resumeConversation } = useChatContext();
  const name =
    chat.prospect.data?.nome ||
    chat.prospect.platformData?.name ||
    formatPhoneNumber(chat.prospect.externalId);

  const lastMessage = chat?.messages?.at(-1)?.data?.content ?? "";
  const lastMessageType =
    chat?.messages?.at(-1)?.data?.messageType ?? "conversation";
  const isLastMessageDeleted = !!chat?.messages?.at(-1)?.deletedAt;
  const avatar = chat?.prospect?.platformData?.picture;
  const lastInteractionDateTime = new Date(chat?.prospect?.lastInteraction);

  const lastInteractionDate = lastInteractionDateTime.toLocaleString("pt-BR", {
    timeStyle: "short",
    dateStyle: "short",
  });

  const { mutate: resumeConversationMutation } = useMutation({
    mutationFn: async () => {
      await messagesService.resumeConversation(chat?.prospect?.id);
    },
    onSuccess: () => {
      resumeConversation(chat?.prospect?.id);
    },
  });
  const botAvatar = botsQuery[0].evolutionData.profilePicUrl;

  // Busca o bot correto pelo nome e pega o número de telefone
  let botPhoneNumber = "";
  if (Array.isArray(botsQuery)) {
    const matchedBot = botsQuery.find(
      (bot: any) =>
        chat.prospect?.bot?.platformId === bot.evolutionData.profileName,
    );
    if (matchedBot) {
      botPhoneNumber = matchedBot.evolutionData.phoneNumber || "";
    }
  }

  const botInfoTooltip = botPhoneNumber
    ? `${chat?.prospect?.bot?.platformId} - ${formatPhoneNumber(
        botPhoneNumber,
      )}`
    : chat?.prospect?.bot?.platformId;

  const min = 0;
  const clientMaxTemperature =
    clientsIdQuery?.data?.[0]?.countTowardsTemperature?.length;
  const value = chat.prospect?.data?.temperatura_lead ?? 0;
  const percentage = Math.max(
    0,
    Math.min(100, ((value - min) / (clientMaxTemperature - min)) * 100),
  );
  const isClienteMaxTemperatureDefined =
    clientMaxTemperature !== undefined && clientMaxTemperature > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
    flex-col hover:shadow-md hover:bg-slate-400/[.2] p-1.5 pt-3  rounded-lg duration-200 flex items-center justify-between relative cursor-pointer  mr-2
    ${isSelected ? "bg-slate-400/[.2] dark:bg-slate-400/[.2]" : ""}
  `}
    >
      <div className="flex w-full items-center gap-3 relative">
        {/* Avatar */}
        {!chat?.isResultByMessage && (
          <>
            <div className="relative">
              <Image
                className="rounded-full min-w-10 max-w-10"
                src={avatar ?? "/assets/anonymous_avatar.png"}
                fallback="/assets/anonymous_avatar.png"
              />

              {chat.prospect?.data?.conversa_pausada && (
                <Tooltip
                  info="Retomar Bot"
                  className="dark:bg-muted text-slate-200"
                >
                  <Button
                    onClick={() => resumeConversationMutation()}
                    className=" absolute top-2 right-2 flex items-center justify-center w-6 h-6 p-1 rounded-full bg-gray-100 hover:bg-gray-300  cursor-pointer"
                  >
                    <Pause
                      size={16}
                      className="text-slate-600 dark:text-gray-500"
                    />
                  </Button>
                </Tooltip>
              )}
            </div>

            <Tooltip info="WhatsApp" className="dark:bg-muted text-slate-200">
              <WhatsappLogo
                size={16}
                color="#22c55e"
                className="absolute top-[-10px] left-[-5px]"
              />
            </Tooltip>
            {/* 
            <FavoriteButton
              onFavoriteChange={onFavorite}
              isFavorited={isFavorite}
            /> */}

            <Tooltip
              info={botInfoTooltip}
              className="dark:bg-muted text-slate-200"
            >
              <Image
                className="absolute top-[28px] left-[30px] w-5 rounded-full border border-slate-300"
                src={botAvatar || "/assets/anonymous_avatar.png"}
                fallback="/assets/anonymous_avatar.png"
              />
            </Tooltip>
          </>
        )}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-neutral-500 dark:text-neutral-300 max-w-45 truncate">
              {name}
            </h2>
            {chat?.prospect?.data?.conversa_pendente && (
              <HandHelpButton
                onHandHelpChange={() => {
                  onHandHelpChange();
                  chat.prospect.data.conversa_pendente = false;
                }}
                isHandHelpButtonActive={isHandHelpButtonActive}
              />
            )}
          </div>

          <MessagePreview
            isDeleted={isLastMessageDeleted}
            content={lastMessage}
            messageType={lastMessageType}
            searchedTerm={searchedTerm}
            isByGlobalSearch={isByGlobalSearch}
          />
        </div>
      </div>

      {isClienteMaxTemperatureDefined && (
        <div className="absolute top-1 right-10">
          <FireFromThermometer
            value={value}
            max={clientMaxTemperature}
            percentage={percentage}
            showIcons={true}
          />
        </div>
      )}

      {/* Pin */}
      <Visible when={isSelected}>
        <Circle
          size={10}
          className="absolute top-7 right-1 text-green-300 fill-green-300"
        />
      </Visible>

      <div className="flex w-full items-center justify-between gap-4 pl-13">
        {isClienteMaxTemperatureDefined && (
          <div className="flex-3 h-2">
            <Thermometer
              min={0}
              max={clientMaxTemperature}
              value={chat.prospect?.data?.temperatura_lead ?? 0}
            />
          </div>
        )}
        <span className="flex-1 w-full text-end  text-[10px] text-neutral-500 dark:text-neutral-300 whitespace-nowrap">
          {lastInteractionDate}
        </span>
      </div>

      {/* Last Interaction Time */}
    </button>
  );
}
