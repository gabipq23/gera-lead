import { List, Avatar, Typography, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Text, Paragraph } = Typography;

interface ContactButtonProps {
  chat: any;
  isSelected?: boolean;
  isFavorite?: boolean;
  isHandHelpActive?: boolean;
  searchedTerm?: string;
  onClick?: () => void;
  onFavorite?: () => void;
  onHandHelp?: () => void;
}

export function ContactButton({
  chat,
  isSelected = false,

  searchedTerm = "",
  onClick,
}: ContactButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Simular dados do chat
  const lastMessage = chat.messages?.[chat.messages.length - 1];
  const contactName = chat.prospect?.platformData?.name || "Contato";
  const lastTime = new Date(chat.prospect?.lastInteraction).toLocaleTimeString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <List.Item
      className={`p-2 my-1  rounded-lg cursor-pointer transition-all duration-200  ${
        isSelected
          ? "bg-gray-200 border border-gray-200"
          : isHovered
            ? "bg-gray-200 border border-gray-200"
            : "bg-transparent border border-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={chat.prospect?.platformData?.picture}
            icon={<UserOutlined />}
            size={48}
          />
        }
        title={
          <div className="flex justify-between items-center mr-3">
            <Text strong className="text-sm">
              {highlightText(contactName, searchedTerm)}
            </Text>

            <div className="flex items-center gap-1">
              <Text type="secondary" className="text-[11px]">
                {lastTime}
              </Text>
            </div>
          </div>
        }
        description={
          <div>
            {/* Última mensagem */}
            <div className="flex items-center gap-1 mt-1 mr-3">
              <Paragraph
                ellipsis={{ rows: 1 }}
                className="m-0 text-xs text-gray-600 flex-1"
              >
                {lastMessage?.sender === "user" && "📱 "}
                {highlightText(
                  lastMessage?.data?.content || "Sem mensagem",
                  searchedTerm,
                )}
              </Paragraph>
            </div>

            {/* Indicadores adicionais */}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "4px",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {chat.messages?.filter((m) => m.sender !== "user" && !m.read)
                  .length > 0 && (
                  <Badge
                    count={
                      chat.messages.filter(
                        (m) => m.sender !== "user" && !m.read,
                      ).length
                    }
                    size="small"
                  />
                )}
              </div>
            </div> */}
          </div>
        }
      />
    </List.Item>
  );
}
