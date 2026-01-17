import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCEP } from "@/utils/formatCEP";
import { formatCPF } from "@/utils/formatCPF";
import { OrderBandaLargaPF } from "@/interfaces/bandaLargaPF";
import DisplayGenerator from "@/components/displayGenerator";
import { ConfigProvider, Form } from "antd";
import { useEffect } from "react";
import { ExclamationOutlined } from "@ant-design/icons";

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

  const getAlertScenarios = (
    availability?: boolean | number,
    encontrado_via_range?: number,
    cep_unico?: number,
    status?: string,
  ) => {
    const scenarios: { color: string; content: React.ReactNode }[] = [];
    const noAvailability =
      availability === false || availability === null || availability === 0;
    const isCoveredByRange = encontrado_via_range === 1;
    const hasUnicCep = cep_unico === 1;

    if (status === "fechado") {
      if (noAvailability) {
        scenarios.push({
          color: "#ffeaea",
          content:
            "Não foi identificada disponibilidade no endereço fornecido.",
        });
      } else if (isCoveredByRange) {
        scenarios.push({
          color: "#fff6c7",
          content:
            "O número fornecido esta dentro de um range com disponibilidade.",
        });
      } else if (hasUnicCep) {
        scenarios.push({
          color: "#fff6c7",
          content: "CEP Único",
        });
      }
    }

    if (
      status === "fechado" &&
      !hasUnicCep &&
      !isCoveredByRange &&
      !noAvailability
    ) {
      scenarios.push({
        color: "#e6ffed",
        content: "Esse pedido não possui travas",
      });
    }
    return scenarios;
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Seção de Ofertas */}
      <div className="flex flex-col gap-2 bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
        {/* <p className="text-[14px] text-neutral-700">
          <strong>Ofertas:</strong>{" "}
          {localData.accept_offers === 1
            ? "Este cliente deseja receber ofertas"
            : "Este cliente não deseja receber ofertas"}
        </p> */}
        <p className="text-[14px] text-neutral-700">
          <strong>Possui Disponibilidade? </strong>{" "}
          {localData.availability
            ? "Sim"
            : localData.availability === null
              ? "-"
              : "Não"}
        </p>
        {localData.encontrado_via_range === 1 && (
          <p className="text-[14px] text-neutral-700">
            <strong>Disponibilidade encontrada via range </strong> entre os
            números {localData.range_min} e {localData.range_max}
          </p>
        )}
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
              <DisplayGenerator
                title="Nome Completo:"
                value={localData.fullname}
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
                title="Nome da Mãe:"
                value={localData.motherfullname}
              />

              <DisplayGenerator
                title="Telefone:"
                value={formatPhoneNumber(localData.phone)}
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

      {localData?.status === "fechado" &&
        getAlertScenarios(
          localData?.availability,
          localData?.encontrado_via_range,
          localData?.cep_unico,
          localData?.status,
        ).map((scenario, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 mb-3 rounded-[4px] p-3 w-full"
            style={{ backgroundColor: scenario.color }}
          >
            <div className="flex items-center">
              <h2 className="text-[14px] font-semibold">
                <ExclamationOutlined />
                <ExclamationOutlined /> ALERTA
                <ExclamationOutlined />
                <ExclamationOutlined />
              </h2>
            </div>
            <div className="flex flex-col text-neutral-800 gap-2 rounded-lg min-h-[50px] p-3">
              <div className="text-[14px] w-full text-neutral-700">
                {scenario.content}
              </div>
            </div>
          </div>
        ))}

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
              colorBorder: "#660099",
              colorText: "#660099",

              colorPrimary: "#660099",

              colorPrimaryHover: "#883fa2",
            },
          },
        }}
      ></ConfigProvider>
    </div>
  );
}
