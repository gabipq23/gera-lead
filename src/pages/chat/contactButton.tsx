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
        <mark key={index} style={{ backgroundColor: "#fff2a8" }}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <List.Item
      style={{
        padding: "12px",
        margin: "4px 0",
        borderRadius: "8px",
        backgroundColor: isSelected
          ? "#a3a3a3"
          : isHovered
            ? "#b3b3b3"
            : "transparent",
        border: isSelected ? "1px solid #b3b3b3" : "1px solid transparent",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <List.Item.Meta
        avatar={
          <Badge
            dot
            status={
              chat.prospect?.data?.conversa_pausada ? "default" : "success"
            }
            offset={[-8, 8]}
          >
            <Avatar
              src={chat.prospect?.platformData?.picture}
              icon={<UserOutlined />}
              size={48}
            />
          </Badge>
        }
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "14px" }}>
              {highlightText(contactName, searchedTerm)}
            </Text>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                {lastTime}
              </Text>
            </div>
          </div>
        }
        description={
          <div>
            {/* Última mensagem */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <Paragraph
                ellipsis={{ rows: 1 }}
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#666",
                  flex: 1,
                }}
              >
                {lastMessage?.sender === "user" && "📱 "}
                {highlightText(
                  lastMessage?.data?.content || "Sem mensagem",
                  searchedTerm,
                )}
              </Paragraph>
            </div>

            {/* Indicadores adicionais */}
            <div
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
            </div>
          </div>
        }
      />
    </List.Item>
  );
}
