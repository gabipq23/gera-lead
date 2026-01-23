import { Form, Select, Button } from "antd";
import { FormInstance } from "antd/es/form";
import { OrderBandaLargaPJ } from "@/interfaces/bandaLargaPJ";
import InputGenerator from "@/components/inputGenerator";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCPF } from "@/utils/formatCPF";

interface OrderBandaLargaPJEditProps {
  localData: OrderBandaLargaPJ;
  form: FormInstance;
  handleSave: () => void;
  handleCancel: () => void;
  loading: boolean;
}

export function OrderBandaLargaPJEdit({
  localData,
  form,
  handleSave,
  handleCancel,
  loading,
}: OrderBandaLargaPJEditProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col h-full gap-4"
      onFinish={handleSave}
    >
      <div className="flex flex-col w-full gap-2">
        {/* Informações da Empresa */}
        <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3  w-full">
          <div className="flex items-center mb-1">
            <h2 className="text-[14px] text-[#666666]">
              Informações da Empresa
            </h2>
          </div>
          <div className="flex flex-col text-neutral-800  rounded-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coluna 1 */}
              <div className="flex flex-col gap-1">
                <InputGenerator
                  title="CNPJ:"
                  formItemName="cnpj"
                  formItemValue={localData.cnpj || ""}
                  placeholder="CNPJ"
                />
              </div>

              {/* Coluna 2 */}
              <div className="flex flex-col gap-1">
                <InputGenerator
                  title="Razão Social:"
                  formItemName="razaosocial"
                  formItemValue={localData.razaosocial || ""}
                  placeholder="Razão Social"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Cliente */}
        <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3  w-full">
          <div className="flex items-center mb-1">
            <h2 className="text-[14px] text-[#666666]">
              Informações do Gestor
            </h2>
          </div>
          <div className="flex flex-col text-neutral-800  rounded-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coluna 1 */}
              <div className="flex flex-col gap-1">
                <InputGenerator
                  title="Nome:"
                  formItemName={["manager", "name"]}
                  formItemValue={localData?.manager?.name || ""}
                  placeholder="Nome"
                />
                <InputGenerator
                  title="CPF:"
                  formItemName={["manager", "cpf"]}
                  formItemValue={formatCPF(localData?.manager?.cpf) || ""}
                  placeholder="CPF"
                />
              </div>

              {/* Coluna 2 */}
              <div className="flex flex-col gap-1">
                <InputGenerator
                  title="Telefone:"
                  formItemName={["manager", "phone"]}
                  formItemValue={
                    formatPhoneNumber(localData?.manager?.phone) || ""
                  }
                  placeholder="Telefone"
                />
                <InputGenerator
                  title="Telefone adicional:"
                  formItemName="phoneAdditional"
                  formItemValue={
                    formatPhoneNumber(localData?.phoneAdditional || "") || ""
                  }
                  placeholder="Telefone adicional"
                />
                <InputGenerator
                  title="Email:"
                  formItemName={["manager", "email"]}
                  formItemValue={localData?.manager?.email || ""}
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Informações de Endereço */}
        <div className="flex flex-col bg-neutral-100 mb-3 rounded-[4px] p-3  w-full">
          <div className="flex items-center mb-1">
            <h2 className="text-[14px] text-[#666666]">
              Informações de Endereço
            </h2>
          </div>

          <div className="flex flex-col text-neutral-800  rounded-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coluna 1 */}
              <div className="flex flex-col gap-1">
                <InputGenerator
                  title="Endereço:"
                  formItemName="address"
                  formItemValue={localData.address || ""}
                  placeholder="Endereço"
                />
                <InputGenerator
                  title="Número:"
                  formItemName="addressnumber"
                  formItemValue={localData.addressnumber || ""}
                  placeholder="Número"
                />

                <InputGenerator
                  title="Complemento:"
                  formItemName="addresscomplement"
                  formItemValue={localData.addresscomplement || ""}
                  placeholder="Complemento"
                />
                <InputGenerator
                  title="Lote:"
                  formItemName="addresslot"
                  formItemValue={localData.addresslot || ""}
                  placeholder="Lote"
                />

                <InputGenerator
                  title="Quadra:"
                  formItemName="addressblock"
                  formItemValue={localData.addressblock || ""}
                  placeholder="Quadra"
                />

                <InputGenerator
                  title="Ponto de Referência:"
                  formItemName="addressreferencepoint"
                  formItemValue={localData.addressreferencepoint || ""}
                  placeholder="Ponto de referência"
                />
              </div>

              {/* Coluna 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex h-9 gap-4 text-[14px] w-full text-neutral-700">
                  <div className="flex ">
                    <p>
                      <strong>Tipo:</strong>
                    </p>
                  </div>
                  <div className="flex flex-1">
                    <Form.Item name="buildingorhouse" className="mb-0 ">
                      <Select
                        placeholder="Tipo de imóvel"
                        className="min-w-[150px]"
                        size="small"
                      >
                        <Select.Option value={"building"}>
                          Edifício
                        </Select.Option>
                        <Select.Option value={"house"}>Casa</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <InputGenerator
                  title="Andar:"
                  formItemName="addressFloor"
                  formItemValue={localData.addressFloor || ""}
                  placeholder="Andar"
                />
                <InputGenerator
                  title="Bairro:"
                  formItemName="district"
                  formItemValue={localData.district || ""}
                  placeholder="Bairro"
                />
                <InputGenerator
                  title="Cidade:"
                  formItemName="city"
                  formItemValue={localData.city || ""}
                  placeholder="Cidade"
                />
                <InputGenerator
                  title="UF:"
                  formItemName="state"
                  formItemValue={localData.state || ""}
                  placeholder="UF"
                />
                <InputGenerator
                  title="CEP:"
                  formItemName="cep"
                  formItemValue={localData.cep || ""}
                  placeholder="CEP"
                />
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div
        className="flex justify-end gap-4 z-10"
        style={{
          position: "sticky",
          bottom: -1,
          left: 0,
          right: 0,
          paddingTop: "8px",
          paddingBottom: "8px",
          background: "#ffffff",
        }}
      >
        <Button
          onClick={handleCancel}
          color="default"
          variant="outlined"
          style={{
            color: "#8b8e8f",
            fontSize: "14px",
          }}
        >
          Cancelar
        </Button>
        <Button
          htmlType="submit"
          loading={loading}
          color="default"
          variant="outlined"
          style={{
            color: "#8b8e8f",
            fontSize: "14px",
          }}
        >
          Salvar
        </Button>
      </div>
    </Form>
  );
}
