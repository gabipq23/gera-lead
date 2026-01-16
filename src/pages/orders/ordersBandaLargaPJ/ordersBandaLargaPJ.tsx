import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ConfigProvider, Table } from "antd";
import { customLocale } from "@/utils/customLocale";
import { useAllOrdersController } from "./controllers/dataController";
import { useAllOrdersFilterController } from "./controllers/filterController";
import { useNavigate } from "react-router-dom";
import { OrderBandaLargaPJDetailsModal } from "./Modals/orderBandaLargaPJDetails";
import { FiltroOrdersBandaLargaPJForm } from "./components/filter";
import { OrderBandaLargaPJ } from "@/interfaces/bandaLargaPJ";
import { TableProps } from "antd/lib";
import { useState } from "react";

export default function OrdersBandaLargaPJ() {
  const queryClient = new QueryClient();

  const {
    showModal,
    ordersBandaLarga,
    closeModal,
    isModalOpen,
    isLoading,
    orderBandaLargaPJ,
    updateBandaLargaOrder,
    removeBandaLargaPJOrder,
    isRemoveBandaLargaPJOrderFetching,
    updateDataIdVivoAndConsultorResponsavel,
    changeBandaLargaPJOrderStatus,
  } = useAllOrdersController();
  const navigate = useNavigate();

  const {
    control,
    onSubmit,
    handleSubmit,
    clearFilters,
    selectedBLOrder,
    setSelectedBLOrder,
    currentPage,
    pageSize,
    columns,
    styles,
  } = useAllOrdersFilterController();

  const totalItems = 0;

  const rowClassName = (record: OrderBandaLargaPJ) => {
    const hasAvaiability = record?.availability;
    const isCoveredByRange = record?.encontrado_via_range;
    const hasUnicCep = record?.cep_unico;
    if (record?.status === "fechado") {
      if (
        hasAvaiability === false ||
        hasAvaiability === null ||
        hasAvaiability === 0
      ) {
        return "ant-table-row-red";
      } else if (isCoveredByRange === 1 || hasUnicCep === 1) {
        return "ant-table-row-yellow";
      }

      return "ant-table-row-green";
    }
    return "";
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<any>["rowSelection"] = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="px-6 md:px-10 lg:px-14">
          <div className="flex justify-between  mt-6  mb-4">
            <div>
              <div className="flex  gap-8 justify-between">
                <h1 className="text-[22px]  pl-16">Leads</h1>
              </div>

              {/* Filtro */}
              <FiltroOrdersBandaLargaPJForm
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                selectedRowKeys={selectedRowKeys}
                onClear={clearFilters}
                orderBandaLargaPJ={orderBandaLargaPJ}
                statusOptions={ordersBandaLarga?.status_pos_venda_enum}
              />
            </div>
          </div>
          <ConfigProvider
            locale={customLocale}
            theme={{
              token: {
                colorPrimary: "#116e75",
                colorPrimaryHover: "#833baa",
                colorLink: "#116e75",
                colorPrimaryBg: "transparent",
              },
              components: {
                Checkbox: {
                  colorPrimary: "#116e75",
                  colorPrimaryHover: "#116e75",
                  borderRadius: 4,
                  controlInteractiveSize: 18,
                  lineWidth: 2,
                },
              },
            }}
          >
            {/* Tabela */}
            <div className="overflow-y-auto ">
              <Table<any>
                rowKey="id"
                loading={isLoading}
                rowSelection={rowSelection}
                className={styles.customTable}
                dataSource={orderBandaLargaPJ}
                rowClassName={(record) => rowClassName(record) ?? ""}
                columns={columns}
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedBLOrder(record);
                    showModal();
                  },
                  style: { cursor: "pointer" },
                })}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalItems,
                  showSizeChanger: true,
                  pageSizeOptions: ["50", "100", "200", "500"],
                  showLessItems: true,
                  onChange: (page, pageSize) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("page", page.toString());
                    params.set("limit", pageSize.toString());
                    navigate(`?${params.toString()}`);
                  },
                  showTotal: (total) => `Total de ${total} pedidos`,
                }}
              />
            </div>
          </ConfigProvider>

          {/* Modal */}
          <OrderBandaLargaPJDetailsModal
            statusOptions={ordersBandaLarga?.status_pos_venda_enum}
            updateOrderData={updateBandaLargaOrder}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedId={selectedBLOrder}
            removeBandaLargaPJOrder={removeBandaLargaPJOrder}
            isRemoveBandaLargaPJOrderFetching={
              isRemoveBandaLargaPJOrderFetching
            }
            updateDataIdVivoAndConsultorResponsavel={
              updateDataIdVivoAndConsultorResponsavel
            }
            changeBandaLargaPJOrderStatus={changeBandaLargaPJOrderStatus}
          />
        </div>
      </QueryClientProvider>
    </>
  );
}
