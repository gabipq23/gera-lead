import { Button, ConfigProvider, Table, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { ArrowLeft } from "lucide-react";
import { DownloadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { customLocale } from "@/utils/customLocale";
import { formatCEP } from "@/utils/formatCEP";

import { useState } from "react";
import { ConsultAvailabilityService } from "@/services/consultAvailability";
import {
  IBulkAvailabilityResponse,
  IBulkAvailabilityResult,
} from "@/interfaces/availability";
import {
  useExportBulkAvailabilityController,
  useExportBulkAvailabilityCSVController,
} from "../../consultAvailability/controller/exportBulk";
import { useBulkAvailabilityStore } from "../../consultAvailability/context/BulkAvailabilityContext";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table-container .ant-table-body,
      .ant-table-container .ant-table-content {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        scrollbar-gutter: stable;
      }
      /* Diminui fonte do header */
      .ant-table-thead > tr > th {
        font-size: 12px !important;
      }
      /* Diminui fonte do body */
      .ant-table-tbody > tr > td {
        font-size: 12px !important;
      }
      /* Cor de fundo do header */
      .ant-table-thead > tr > th {
        background: #e9e9e9 !important;
      }
      /* Cor de fundo do body */
      .ant-table-tbody > tr > td {
        background: #fff !important;
      }
      /* Destaca a linha ao passar o mouse (mantém o efeito padrão do Ant Design) */
      .ant-table-tbody > tr.ant-table-row:hover > td {
        background: #e9e9e9 !important;
      }
      .ant-table-pagination {
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }
    `,
  };
});

export default function ResultBulkAvailability() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData: IBulkAvailabilityResponse = location.state;
  const { styles } = useStyle();
  const { exportData, isExporting } = useExportBulkAvailabilityController();
  const { exportDataCSV, isExportingCSV } =
    useExportBulkAvailabilityCSVController();

  const [currentData, setCurrentData] = useState(initialData);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const consultAvailabilityService = new ConsultAvailabilityService();
  const originalDados = useBulkAvailabilityStore(
    (state) => state.originalDados,
  );

  if (!initialData || !initialData.resultados) {
    navigate("/admin/consulta-disponibilidade");
    return null;
  }

  const totalItems =
    currentData.paginacao?.total || currentData.relatorio?.total || 0;

  const handlePageChange = async (page: number, pageSize?: number) => {
    if (originalDados.length === 0) {
      console.error(
        "❌ originalDados está vazio! Não é possível fazer paginação.",
      );
      return;
    }

    setIsLoadingPage(true);
    try {
      const response = await consultAvailabilityService.consultAvailabilityBulk(
        originalDados,
        pageSize || currentData.paginacao?.limite || 500,
        page,
      );
      setCurrentData(response);
    } catch (error) {
      console.error("Erro ao carregar página:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const exportToExcel = () => {
    exportData();
  };

  const exportToCSV = () => {
    exportDataCSV();
  };

  const tableColumns: TableColumnsType<IBulkAvailabilityResult> = [
    // {
    //   title: "Linha",
    //   dataIndex: "linha",
    //   width: 60,
    // },
    {
      title: "CEP",
      dataIndex: "cep",
      width: 90,
      render: (cep) => formatCEP(cep) || "-",
    },
    {
      title: "Número",
      dataIndex: "numero",
      width: 80,
      ellipsis: {
        showTitle: false,
      },
      render: (numero) => (
        <Tooltip
          placement="topLeft"
          title={numero}
          styles={{ body: { fontSize: "12px" } }}
        >
          {numero || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Disponibilidade",
      dataIndex: "disponibilidade",
      width: 120,
      render: (value: boolean) => <span>{value ? "Sim" : "Não"}</span>,
    },
    {
      title: "UF",
      dataIndex: "uf",
      width: 50,
      render: (uf) => uf || "-",
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (cidade) => (
        <Tooltip
          placement="topLeft"
          title={cidade}
          styles={{ body: { fontSize: "12px" } }}
        >
          {cidade || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Bairro",
      dataIndex: "bairro",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (bairro) => (
        <Tooltip
          placement="topLeft"
          title={bairro}
          styles={{ body: { fontSize: "12px" } }}
        >
          {bairro || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Logradouro",
      dataIndex: "logradouro",
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (logradouro) => (
        <Tooltip
          placement="topLeft"
          title={logradouro}
          styles={{ body: { fontSize: "12px" } }}
        >
          {logradouro || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Endereço Completo",
      dataIndex: "endereco_completo",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (endereco) => (
        <Tooltip
          placement="topLeft"
          title={endereco}
          styles={{ body: { fontSize: "12px" } }}
        >
          {endereco || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Armário",
      dataIndex: "armario",
      width: 120,
      render: (armario) => armario || "-",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      width: 100,
      render: (tipo) => tipo || "-",
    },
    {
      title: "Território",
      dataIndex: "territorio",
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: (territorio) => (
        <Tooltip
          placement="topLeft"
          title={territorio}
          styles={{ body: { fontSize: "12px" } }}
        >
          {territorio || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Via Range",
      dataIndex: "encontrado_via_range",
      width: 100,
      render: (value: boolean) => (value ? "Sim" : "Não"),
    },
    {
      title: "Range Min",
      dataIndex: "range_min",
      width: 100,
      render: (range, record) =>
        record.encontrado_via_range ? range || "-" : "-",
    },
    {
      title: "Range Max",
      dataIndex: "range_max",
      width: 100,
      render: (range, record) =>
        record.encontrado_via_range ? range || "-" : "-",
    },
  ];

  return (
    <>
      <div className="px-6 md:px-10 lg:px-14">
        <div className="flex gap-4 justify-between mt-6 mb-4">
          <h1 className="text-[22px] pl-16">Resultado da Consulta em Massa</h1>

          <div className="flex gap-2 mb-2">
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
                    colorPrimaryHover: "#a3a3a3",
                  },
                },
              }}
            >
              <Button
                type="default"
                variant="solid"
                icon={<DownloadOutlined />}
                loading={isExporting}
                onClick={exportToExcel}
                disabled={
                  !currentData?.resultados ||
                  currentData.resultados.length === 0
                }
              >
                {isExporting ? "Exportando..." : "Exportar em .xlsx"}
              </Button>
              <Button
                type="default"
                variant="solid"
                icon={<DownloadOutlined />}
                loading={isExportingCSV}
                onClick={exportToCSV}
                disabled={
                  !currentData?.resultados ||
                  currentData.resultados.length === 0
                }
              >
                {isExportingCSV ? "Exportando..." : "Exportar em .csv"}
              </Button>
            </ConfigProvider>

            {/* Botão Voltar */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorBorder: "#8b8e8f",
                    colorText: "#8b8e8f",
                    colorPrimary: "#8b8e8f",
                    colorPrimaryHover: "#a3a3a3",
                  },
                },
              }}
            >
              <Button
                type="default"
                variant="solid"
                onClick={() => {
                  navigate("/admin/consulta-disponibilidade");
                }}
              >
                <ArrowLeft size={14} />
                <span>Voltar para consulta</span>
              </Button>
            </ConfigProvider>
          </div>
        </div>

        <ConfigProvider
          locale={customLocale}
          theme={{
            components: {
              Checkbox: {
                colorPrimary: "#8b8e8f",
                colorPrimaryHover: "#8b8e8f",
                borderRadius: 4,
                controlInteractiveSize: 18,
                lineWidth: 2,
              },
            },
          }}
        >
          <div className="overflow-y-auto">
            <Table<IBulkAvailabilityResult>
              rowKey="linha"
              className={styles?.customTable}
              columns={tableColumns}
              dataSource={currentData.resultados || []}
              loading={isLoadingPage}
              pagination={{
                current: currentData.paginacao?.pagina || 1,
                pageSize: currentData.paginacao?.limite || 500,
                total: totalItems,
                showSizeChanger: true,
                pageSizeOptions: ["50", "100", "200", "500"],
                showLessItems: true,
                onChange: handlePageChange,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} de ${total} registros`,
              }}
            />
          </div>
        </ConfigProvider>
      </div>
    </>
  );
}
