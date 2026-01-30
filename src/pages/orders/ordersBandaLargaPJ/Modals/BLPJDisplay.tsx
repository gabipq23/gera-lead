import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCEP } from "@/utils/formatCEP";
import { OrderBandaLargaPJ } from "@/interfaces/bandaLargaPJ";
import { formatCNPJ } from "@/utils/formatCNPJ";
import DisplayGenerator from "@/components/displayGenerator";
import { useEffect } from "react";
import { ConfigProvider, Form } from "antd";
import { formatCPF } from "@/utils/formatCPF";
import { formatBRL } from "@/utils/formatBRL";
import AvailabilityTable from "@/components/orders/availabilityTable";
import { EmpresasDisplay } from "@/components/empresasDisplay";

interface OrderBandaLargaPJDisplayProps {
  localData: OrderBandaLargaPJ;
}

export function OrderBandaLargaPJDisplay({
  localData,
}: OrderBandaLargaPJDisplayProps) {
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

      {/* Informações da Empresa */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center mb-3">
          <h2 className="text-[14px] text-[#666666] font-medium">
            Informações da Empresa
          </h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg ">
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <DisplayGenerator
                title="CNPJ"
                value={formatCNPJ(localData.cnpj)}
              />
              <DisplayGenerator
                title="Razão Social"
                value={localData.razaosocial}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Gestor */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px]  p-3 w-full">
        <div className="flex items-center mb-3">
          <h2 className="text-[14px] text-[#666666] font-medium ">
            Informações do Gestor
          </h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-4 rounded-lg ">
          {/* Dados Pessoais */}
          <div className="bg-white rounded-md p-2">
            <img
              src={localData.whatsapp?.avatar || "/assets/anonymous_avatar.png"}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <DisplayGenerator
                title="Nome:"
                value={localData?.manager?.name}
              />
              <DisplayGenerator
                title="Nome (RFB):"
                value={localData.nome_receita}
              />
              <DisplayGenerator
                title="CPF:"
                value={formatCPF(localData?.manager?.cpf)}
              />
              <DisplayGenerator
                title="Email:"
                value={localData?.manager?.email}
              />
              <DisplayGenerator
                title="Autorização Legal:"
                value={
                  localData?.manager?.hasLegalAuthorization ? "Sim" : "Não"
                }
              />
              {/* <DisplayGenerator
                title="Título WhatsApp:"
                value={localData.nome_whatsapp}
              /> */}
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Telefone Principal */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500">
                  Telefone Principal
                </div>
                <div className=" p-1 space-y-1">
                  <DisplayGenerator
                    title="Número:"
                    value={formatPhoneNumber(localData?.manager?.phone)}
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
                    title="WhatsApp:"
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
                </div>
              </div>

              {/* Telefone Adicional */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500">
                  Telefone Adicional
                </div>
                <div className=" rounded p-1 space-y-1">
                  <DisplayGenerator
                    title="Número:"
                    value={formatPhoneNumber(localData?.phoneAdditional || "")}
                  />
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
                </div>
              </div>
            </div>
          </div>

          {/* Informações Empresariais */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <DisplayGenerator
                title="Sócio:"
                value={localData.socio ? "Sim" : "Não"}
              />{" "}
              <EmpresasDisplay empresas={localData.socios_empresas} />
              <div className="md:col-span-2">
                <DisplayGenerator
                  title="MEI:"
                  value={localData.mei ? "Sim" : "Não"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Plano */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Plano Desejado</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 bg-white rounded-md p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
      {/* Dados do Tráfego */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center mb-3">
          <h2 className="text-[14px] text-[#666666] font-medium">
            Dados do Tráfego
          </h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-4 rounded-lg">
          {/* Informações de Rede */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
              />
              <DisplayGenerator
                title="URL:"
                value={localData.url}
                maxLength={50}
              />
            </div>
          </div>

          {/* Informações do Dispositivo */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
      {/* Endereço */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center mb-3">
          <h2 className="text-[14px] text-[#666666] font-medium">Endereço</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-4 rounded-lg ">
          {/* Dados do Endereço */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <DisplayGenerator title="Rua:" value={localData.address} />
              <DisplayGenerator
                title="Número:"
                value={localData.addressnumber}
              />
              <DisplayGenerator
                title="Complemento:"
                value={localData.addresscomplement}
              />
              <DisplayGenerator title="Bairro:" value={localData.district} />
              <DisplayGenerator title="Cidade:" value={localData.city} />
              <DisplayGenerator title="UF:" value={localData.state} />
            </div>
          </div>

          {/* Detalhes Técnicos */}
          <div className="bg-white rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <DisplayGenerator
                  title="Tipo:"
                  value={
                    localData.buildingorhouse === "building"
                      ? "Edifício"
                      : "Casa"
                  }
                />

                <DisplayGenerator
                  title="Andar:"
                  value={localData?.addressFloor}
                />
                <DisplayGenerator
                  title="Ponto de Referência:"
                  value={localData.addressreferencepoint}
                />
              </div>

              <div className="space-y-2">
                <DisplayGenerator
                  title="CEP:"
                  value={formatCEP(localData.cep)}
                />
                <DisplayGenerator
                  title="CEP único:"
                  value={localData.cep_unico ? "Sim" : "Não"}
                />
              </div>
              <div className="space-y-2">
                <DisplayGenerator title="Lote:" value={localData.addresslot} />
                <DisplayGenerator
                  title="Quadra:"
                  value={localData.addressblock}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#8b8e8f",
              activeBorderColor: "#8b8e8f",
              activeShadow: "none",
              colorBorder: "#bfbfbf",
              colorTextPlaceholder: "#666666",
            },
            Button: {
              colorBorder: "#8b8e8f",
              colorText: "#8b8e8f",
              colorPrimary: "#8b8e8f",
              colorPrimaryHover: "#883fa2",
            },
          },
        }}
      ></ConfigProvider>
    </div>
  );
}
