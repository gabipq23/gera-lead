import { ConfigProvider, Input, Select } from "antd";

export default function HeaderInputs({
  localData,
  setLocalData,
  selectedId,
  updateDataIdVivoAndConsultorResponsavel,
  changeBandaLargaOrderStatus,
  consultor,
  setConsultor,
  idVivo,
  setIdVivo,
  idCRM,
  setIdCRM,
  statusOptions,
  updateOrderData,
}: any) {
  return (
    <>
      <div className="flex  flex-col md:flex-row lg:flex-row gap-4 mg:items-start lg:items-start justify-between">
        <span style={{ color: "#252525" }}>
          Pedido Nº {localData.ordernumber || localData.id}
        </span>
        <div className="flex flex-col  flex-wrap items-center gap-4 ">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  activeShadow: "none",
                },
                Select: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  activeOutlineColor: "none",
                },
                DatePicker: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  colorPrimaryBorder: "#8b8e8f",
                  colorPrimary: "#8b8e8f",
                },
                Button: {
                  colorBorder: "#8b8e8f",
                  colorText: "#8b8e8f",
                  colorPrimary: "#8b8e8f",
                  colorPrimaryHover: "#8a7e7f",
                },
              },
            }}
          >
            <div className="flex items-start justify-start self-start gap-4 mr-8">
              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold">Consultor:</span>
                <Input
                  size="small"
                  placeholder="Consultor"
                  style={{
                    width: "240px",
                    fontWeight: "400",
                  }}
                  maxLength={13}
                  value={consultor}
                  onChange={(e) => setConsultor(e.target.value)}
                  onPressEnter={() => {
                    updateDataIdVivoAndConsultorResponsavel(selectedId?.id, {
                      consultor_responsavel: consultor,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold"> ID Vivo: </span>
                <Input
                  size="small"
                  value={idVivo}
                  placeholder="ID Vivo"
                  style={{
                    width: "150px",
                    fontWeight: "400",
                  }}
                  maxLength={13}
                  onChange={(e) => setIdVivo(e.target.value)}
                  onPressEnter={() => {
                    updateDataIdVivoAndConsultorResponsavel(selectedId?.id, {
                      id_vivo_corp: idVivo,
                    });
                  }}
                />
              </div>

              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold"> ID CRM: </span>
                <Input
                  size="small"
                  value={idCRM}
                  placeholder="ID CRM"
                  style={{
                    width: "120px",
                    fontWeight: "400",
                  }}
                  maxLength={8}
                  onChange={(e) => setIdCRM(Number(e.target.value))}
                  onPressEnter={() => {
                    updateDataIdVivoAndConsultorResponsavel(selectedId?.id, {
                      id_crm: idCRM,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex items-start justify-start gap-4 self-start mr-8">
              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold">Pedido:</span>
                <Select
                  size="small"
                  style={{ width: 110 }}
                  value={localData?.status}
                  onChange={(value) => {
                    setLocalData((prev: any) =>
                      prev ? { ...prev, status: value } : null,
                    );
                    changeBandaLargaOrderStatus({
                      id: selectedId?.id,
                      data: { status: value },
                    });
                  }}
                  options={[
                    { value: "aberto", label: "Aberto" },
                    { value: "fechado", label: "Fechado" },
                    { value: "cancelado", label: "Cancelado" },
                  ]}
                />
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold">
                  Status do Pedido:{" "}
                </span>
                <Select
                  placeholder="Selecione o status"
                  size="small"
                  value={localData?.status_pos_venda}
                  style={{
                    width: "340px",
                    fontWeight: "400",
                  }}
                  onChange={(value) => {
                    setLocalData((prev: any) =>
                      prev ? { ...prev, status_pos_venda: value } : null,
                    );
                    updateOrderData({
                      id: selectedId?.id,
                      data: { pedido: { status_pos_venda: value } },
                    });
                  }}
                  options={statusOptions?.map((status: string) => ({
                    value: status,
                    label: status,
                  }))}
                />
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-[14px] font-semibold">Equipe:</span>
                <span className="font-normal">{selectedId?.equipe || "-"}</span>
              </div>
            </div>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}
