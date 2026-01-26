import { Splitter, Input, Select, Button, Tooltip, ConfigProvider } from "antd";
import { StarOutlined, FireOutlined } from "@ant-design/icons";
import { Hand } from "lucide-react";
import ContactsList from "./contactList";

const { Option } = Select;

export function Chat() {
  return (
    <div style={{ height: "calc(100vh - 150px)" }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a3a3a3",
          },
        }}
      >
        <Splitter
          style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Splitter.Panel defaultSize="18%" min="16%" max="22%">
            <div style={{ padding: "16px" }}>
              {/* Filtros */}
              <div style={{ marginBottom: "16px" }}>
                <Button size="small" type="text" style={{ float: "right" }}>
                  Limpar Filtros
                </Button>
              </div>

              <div
                style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
              >
                <Select placeholder="Bot" style={{ flex: 1 }}>
                  <Option value="bot1">Bot 1</Option>
                </Select>

                <Input placeholder="Buscar..." style={{ flex: 1 }} />
              </div>

              <div
                style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
              >
                <Select placeholder="Plataforma" style={{ flex: 1 }}>
                  <Option value="whatsapp">WhatsApp</Option>
                </Select>

                <div
                  className="text-[#a3a3a3]"
                  style={{ display: "flex", gap: "4px" }}
                >
                  <Tooltip title="Favoritos">
                    <Button icon={<StarOutlined />} />
                  </Tooltip>

                  <Tooltip title="Hot Lead">
                    <Button icon={<FireOutlined />} />
                  </Tooltip>

                  <Tooltip title="Ajuda">
                    <Button icon={<Hand size={16} />} />
                  </Tooltip>
                </div>
              </div>

              {/* Lista de chats com scroll */}
              <div style={{ height: "calc(100% - 120px)", overflowY: "auto" }}>
                {/* Seus ContactButton aqui */}
              </div>
            </div>
            <div>
              <ContactsList />
            </div>
          </Splitter.Panel>

          {/* Conteúdo principal */}
          <Splitter.Panel>{/* Seu ChatView aqui */}</Splitter.Panel>
        </Splitter>
      </ConfigProvider>
    </div>
  );
}
