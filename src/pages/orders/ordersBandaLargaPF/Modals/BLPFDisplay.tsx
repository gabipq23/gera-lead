import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCEP } from "@/utils/formatCEP";
import { formatCPF } from "@/utils/formatCPF";
import { OrderBandaLargaPF } from "@/interfaces/bandaLargaPF";
import DisplayGenerator from "@/components/displayGenerator";
import { ConfigProvider, Form } from "antd";
import { useEffect } from "react";
import { formatBRL } from "@/utils/formatBRL";

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
      <div className="flex flex-col gap-2 bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        {/* Tabela de Disponibilidade */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header com logos */}
            <thead>
              <tr>
                <td className="w-24"></td>{" "}
                {/* Coluna vazia para os labels laterais */}
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    src="/assets/vivo.png"
                    alt="Vivo"
                    className="max-h-6 mx-auto"
                  />
                </td>
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    className="h-8 w-8 mx-auto"
                    src="/assets/claro.png"
                    alt="Claro"
                  />
                </td>
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    className="h-7 w-14 mx-auto"
                    src="/assets/tim.svg"
                    alt="TIM"
                  />
                </td>
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    className="h-8=9 w-9 mx-auto"
                    src="/assets/oi.svg"
                    alt="OI"
                  />
                </td>
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    className="h-5 mx-auto"
                    src="/assets/sky.svg"
                    alt="Sky"
                  />
                </td>
                <td className="text-center p-2 border-b border-gray-200">
                  <img
                    className="h-4 mx-auto"
                    src="/assets/nio.svg"
                    alt="NIO"
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {/* Linha 1: Disponibilidade */}
              <tr>
                <td className="text-[12px] font-medium text-gray-600 p-2 pr-4">
                  Disponibilidade
                </td>
                <td className="text-center p-2">
                  {localData.availability === null ||
                  localData.availability === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
                <td className="text-center p-2">
                  {localData.availability_claro === null ||
                  localData.availability_claro === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability_claro ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
                <td className="text-center p-2">
                  {localData.availability_tim === null ||
                  localData.availability_tim === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability_tim ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
                <td className="text-center p-2">
                  {localData.availability_oi === null ||
                  localData.availability_oi === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability_oi ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
                <td className="text-center p-2">
                  {localData.availability_sky === null ||
                  localData.availability_sky === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability_sky ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
                <td className="text-center p-2">
                  {localData.availability_nio === null ||
                  localData.availability_nio === undefined ? (
                    <span className="text-[12px] text-neutral-500">-</span>
                  ) : localData.availability_nio ? (
                    localData.encontrado_via_range ? (
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                        title="Disponível via range"
                      ></div>
                    ) : (
                      <div
                        className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                        title="Disponível"
                      ></div>
                    )
                  ) : (
                    <div
                      className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                      title="Indisponível"
                    ></div>
                  )}
                </td>
              </tr>

              {/* Linha 2: Range de números */}
              {localData.encontrado_via_range === 1 && (
                <tr>
                  <td className="text-[12px] w-32 font-medium text-gray-600 p-2 pr-4">
                    Range de números
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability_claro
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability_tim
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability_oi
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability_sky
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                  <td className="text-center p-2 text-[11px] ">
                    {localData.availability_nio
                      ? `${localData.range_min} - ${localData.range_max}`
                      : "-"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                src="\assets\anonymous_avatar.png"
                className="h-9 w-9 rounded-full"
              />
              <DisplayGenerator
                title="Nome Completo:"
                value={localData.fullname}
              />
              <DisplayGenerator
                title="Nome da Mãe:"
                value={localData.motherfullname}
              />
              <DisplayGenerator title="CPF:" value={formatCPF(localData.cpf)} />
              <DisplayGenerator
                title="Data de Nascimento:"
                value={localData.birthdate}
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
                value={localData.motherfullname}
              />
              <DisplayGenerator title="Whatsapp:" value="Business" />

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
              />
            </div>
          </div>
        </div>
      </div>
      {/* Plano */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Plano Escolhido</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator
                title="Plano:"
                value={localData.plan?.name + " " + localData.plan?.speed}
              />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col">
              <DisplayGenerator
                title="Preço:"
                value={formatBRL(localData.plan?.price)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Informações Técnicas */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">Informações Técnicas</h2>
        </div>

        <div className="flex flex-col text-neutral-800 gap-2 rounded-lg p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 - Visualização */}
            <div className="flex flex-col ">
              <DisplayGenerator title="Device:" value="Desktop" />
              <DisplayGenerator title="IP:" value={localData.client_ip} />
            </div>

            {/* Coluna 2 - Visualização */}
            <div className="flex flex-col">
              <DisplayGenerator title="Sistema Operacional:" value="Windows" />
              <DisplayGenerator
                title="URL:"
                value={localData.url}
                maxLength={50}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Informações de Endereço */}
      <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-[14px] text-[#666666]">
            Informações de Endereço
          </h2>
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
              colorPrimaryHover: "#8a7e7f",
            },
          },
        }}
      ></ConfigProvider>
    </div>
  );
}
