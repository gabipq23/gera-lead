import { WhatsAppOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Circle, Hand, Star } from "lucide-react";
import anonymousAvatar from "/assets/anonymous_avatar.png";
import { MessagePreview } from "./components/message-preview";
import { FireFromThermometer } from "./components/fire-from-thermometer";
import { Thermometer } from "./components/thermometer";

interface ContactButtonProps {
  chat: any;
  isSelected?: boolean;
  isFavorite?: boolean;
  isHandHelpActive?: boolean;
  searchedTerm?: string;
  isByGlobalSearch?: boolean;
  onClick?: () => void;
  onFavorite?: () => void;
  onHandHelp?: () => void;
}

export function ContactButton({
  chat,
  isSelected = false,
  searchedTerm = "",
  isByGlobalSearch = false,
  onClick,
}: ContactButtonProps) {
  // Simular dados do chat
  const lastMessage = chat.messages?.[chat.messages.length - 1];
  const contactName = chat.prospect?.platformData?.name || "Contato";

  const clientMaxTemperature = 4;
  const value = chat.prospect.data?.temperatura_lead || 0;
  const isClienteMaxTemperatureDefined = value > 0;
  const percentage = (value / clientMaxTemperature) * 100;

  // Calcular data da última interação
  const lastInteractionDate = new Date(
    chat.prospect?.lastInteraction,
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`
    flex  hover:shadow-md hover:bg-slate-400/[.2] p-1.5 pt-3  rounded-lg duration-200  items-center justify-between  cursor-pointer  mr-2
    ${isSelected ? "bg-slate-400/[.2] dark:bg-slate-400/[.2]" : ""}
  `}
      >
        <div className="flex  my-2 mx-2 w-full items-center justify-center gap-3 relative">
          <div className="relative">
            <img
              src={chat.prospect?.platformData?.picture}
              alt={contactName}
              className="rounded-full min-w-10 max-w-10"
            />
          </div>

          <Tooltip title="Whatsapp">
            <WhatsAppOutlined
              size={16}
              className="absolute top-[-10px] left-[-5px] text-green-600"
            />
          </Tooltip>

          <Tooltip title="Favoritar" className="dark:bg-muted text-slate-200">
            <div
              className="absolute bottom-[-5px] left-[-5px]"
              // onClick={onFavoriteChange}
            >
              <Star size={16} className=" text-red-500" />
            </div>
          </Tooltip>

          <Tooltip title="Bot Name" className="dark:bg-muted text-slate-200">
            <img
              className="absolute top-[28px] left-[30px] w-5 rounded-full border border-slate-300"
              src={anonymousAvatar}
            />
          </Tooltip>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-neutral-800  max-w-45 truncate">
                {chat?.prospect?.platformData?.name}
              </h2>
              <Tooltip title="Ajuda" className="dark:bg-muted text-slate-200">
                <div>
                  <Hand size={16} className=" text-red-500" />
                </div>
              </Tooltip>
            </div>

            <MessagePreview
              message={lastMessage}
              searchedTerm={searchedTerm}
              isByGlobalSearch={isByGlobalSearch}
            />
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
          {isSelected && (
            <Circle
              size={10}
              className="absolute top-7 right-1 text-green-300 fill-green-300"
            />
          )}

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
        </div>
      </button>
    </>
  );
}
