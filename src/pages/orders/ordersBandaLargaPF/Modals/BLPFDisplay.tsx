import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCEP } from "@/utils/formatCEP";
import { formatCPF } from "@/utils/formatCPF";
import { OrderBandaLargaPF } from "@/interfaces/bandaLargaPF";
import DisplayGenerator from "@/components/displayGenerator";
import { ConfigProvider, Form } from "antd";
import { useEffect } from "react";
import { formatBRL } from "@/utils/formatBRL";
import AvailabilityTable from "@/components/orders/availabilityTable";
import { EmpresasDisplay } from "@/components/empresasDisplay";

interface OrderBandaLargaPFDisplayProps {
  localData: OrderBandaLargaPF;
}

export function OrderBandaLargaPFDisplay({
  localData,
  // updateOrderData,
}: OrderBandaLargaPFDisplayProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (localData) {
      form.setFieldsValue({
        observacao_consultor: localData.observacao_consultor || "",
      });
    }
  }, [localData, form]);

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Seção de Disponibilidade */}
      <AvailabilityTable localData={localData} />

      {/* Informações do Cliente */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Informações do Cliente</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <img
                src={
                  localData.whatsapp?.avatar || "/assets/anonymous_avatar.png"
                }
                className="h-9 w-9 rounded-full"
              />
              <DisplayGenerator title="Nome:" value={localData.fullname} />
              <DisplayGenerator
                title="Nome (RFB):"
                value={localData.nome_receita}
              />
              <DisplayGenerator
                title="Nome da Mãe:"
                value={localData.motherfullname}
              />
              <DisplayGenerator
                title="Nome Mãe (RFB):"
                value={localData.nome_da_mae_receita}
              />
              <DisplayGenerator title="CPF:" value={formatCPF(localData.cpf)} />
              <DisplayGenerator
                title="Data de Nascimento:"
                value={localData.birthdate}
              />
              <DisplayGenerator
                title="Data Nascimento (RFB):"
                value={localData.data_de_nascimento_receita}
              />
              <DisplayGenerator title="Email:" value={localData.email} />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col">
              <DisplayGenerator
                title="Telefone:"
                value={formatPhoneNumber(localData.phone)}
              />
              <DisplayGenerator
                title="Título WA:"
                value={localData.nome_whatsapp}
              />
              <DisplayGenerator
                title="Whatsapp:"
                value={
                  localData.whatsapp?.is_comercial === true
                    ? "Business"
                    : localData.is_comercial === false
                      ? "Messenger"
                      : "-"
                }
              />
              <DisplayGenerator
                title="Status:"
                value={localData.whatsapp?.recado}
              />
              <DisplayGenerator
                title="Anatel:"
                value={
                  localData.numero_valido
                    ? "Sim"
                    : localData.numero_valido === null
                      ? "-"
                      : "Não"
                }
              />
              <DisplayGenerator
                title="Operadora:"
                value={localData.operadora}
              />
              <DisplayGenerator
                title="Telefone Adicional:"
                value={formatPhoneNumber(localData.phoneAdditional || "")}
              />{" "}
              <DisplayGenerator
                title="Anatel:"
                value={
                  localData.numero_adicional_valido
                    ? "Sim"
                    : localData.numero_adicional_valido === null
                      ? "-"
                      : "Não"
                }
              />
              <DisplayGenerator
                title="Operadora:"
                value={localData.operadora_adicional}
              />
              <DisplayGenerator
                title="MEI:"
                value={localData.is_mei ? "Sim" : "Não"}
              />
              <DisplayGenerator
                title="Sócio:"
                value={localData.socio ? "Sim" : "Não"}
              />
              <EmpresasDisplay empresas={localData.socios_empresas} />
            </div>
          </div>
        </div>
      </div>
      {/* Plano */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Plano Desejado</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator
                title="Plano:"
                value={localData.plan?.name + " " + localData.plan?.speed}
              />
              <DisplayGenerator
                title="Preço:"
                value={formatBRL(localData.plan?.price)}
              />
              <DisplayGenerator
                title="APP:"
                value={localData.app ? "Sim" : "Não"}
              />
              <DisplayGenerator title="Pacote:" value={localData.app_package} />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col">
              <DisplayGenerator
                title="TV:"
                value={localData.tv ? "Sim" : "Não"}
              />
              <DisplayGenerator title="Pacote:" value={localData.tv_package} />
              <DisplayGenerator
                title="IP Fixo:"
                value={localData.wantsFixedIp ? "Sim" : "Não"}
              />
              <DisplayGenerator
                title="Voz Fixa:"
                value={localData.voz_fixa ? localData.voz_fixa : "-"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Informações Técnicas */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Dados do Tráfego</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator title="IP:" value={localData.client_ip} />
              <DisplayGenerator title="Provedor:" value={localData.ip_isp} />
              <DisplayGenerator
                title="Tipo de acesso:"
                value={
                  localData.ip_tipo_acesso === "movel"
                    ? "Móvel"
                    : localData.ip_tipo_acesso === "fixo"
                      ? "Fixo"
                      : localData.ip_tipo_acesso === "hosting"
                        ? "Hosting"
                        : localData.ip_tipo_acesso === "proxy"
                          ? "Proxy"
                          : localData.ip_tipo_acesso === "local"
                            ? "Local"
                            : localData.ip_tipo_acesso === "desconhecido"
                              ? "Desconhecido"
                              : "-"
                }
              />{" "}
              <DisplayGenerator
                title="URL:"
                value={localData.url}
                maxLength={50}
              />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col">
              <DisplayGenerator
                title="Sistema Operacional:"
                value={localData.so}
              />
              <DisplayGenerator title="Device:" value={localData.device} />
              <DisplayGenerator title="Browser:" value={localData.browser} />
              <DisplayGenerator
                title="Resolução:"
                value={localData.resolution}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Informações de Endereço */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Endereço</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator title="Endereço:" value={localData.address} />
              <DisplayGenerator
                title="Número:"
                value={localData.addressnumber}
              />
              <DisplayGenerator
                title="Complemento:"
                value={localData.addresscomplement}
              />
              <DisplayGenerator title="Andar:" value={localData.addressFloor} />
              <DisplayGenerator title="Lote:" value={localData.addresslot} />

              <DisplayGenerator
                title="Quadra:"
                value={localData.addressblock}
              />
              <DisplayGenerator
                title="Ponto de Referência:"
                value={localData.addressreferencepoint}
              />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator
                title="Tipo:"
                value={
                  localData.buildingorhouse === "building" ? "Edifício" : "Casa"
                }
              />

              <DisplayGenerator title="Bairro:" value={localData.district} />
              <DisplayGenerator title="Cidade:" value={localData.city} />
              <DisplayGenerator title="UF:" value={localData.state} />
              <DisplayGenerator title="CEP:" value={formatCEP(localData.cep)} />
              <DisplayGenerator
                title="CEP único:"
                value={localData.cep_unico ? "Sim" : "Não"}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#660099",
              activeBorderColor: "#660099",
              activeShadow: "none",
              colorBorder: "#bfbfbf",
              colorTextPlaceholder: "#666666",
            },
            Button: {
              colorBorder: "#8b8e8f",
              colorText: "#8b8e8f",
              colorPrimary: "#8b8e8f",
              colorPrimaryHover: "#a3a3a3",
            },
          },
        }}
      ></ConfigProvider>
    </div>
  );
}
