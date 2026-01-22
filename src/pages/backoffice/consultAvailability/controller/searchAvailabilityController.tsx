import {
  ISearchAvailabilityResponse,
  IAvailability,
} from "@/interfaces/availability";
import { ConsultAvailabilityService } from "@/services/consultAvailability";
import { formatCEP } from "@/utils/formatCEP";
import { useQuery } from "@tanstack/react-query";
import { TableColumnsType, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

export function useSearchAvailabilityController({
  uf,
  cidade,
  limite,
  cep,
  numero,
  bairro,
  page,
}: {
  uf?: string;
  cidade?: string;
  limite?: number;
  cep?: string;
  numero?: string;
  bairro?: string | string[];
  page?: number;
}) {
  const consultAvailabilityService = new ConsultAvailabilityService();

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch,
  } = useQuery<ISearchAvailabilityResponse>({
    refetchOnWindowFocus: false,
    queryKey: [
      "searchAvailability",
      uf,
      cidade,
      limite,
      cep,
      numero,
      bairro,
      page,
    ],
    queryFn: async (): Promise<ISearchAvailabilityResponse> => {
      const response = await consultAvailabilityService.searchAvailability(
        cep,
        numero,
        uf,
        bairro,
        cidade,
        limite,
        page,
      );
      return response;
    },
    enabled: !!uf,
  });

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
          margin-top: 16px; /* opcional: dá um espaçamento
        colorText: "#660099",
        colorTextActive: "#550088", */
        }
      `,
    };
  });
  const { styles } = useStyle();

  const tableColumns: TableColumnsType<IAvailability> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },

    {
      title: (
        <div className="flex items-center justify-center">
          <img src="/assets/vivo.png" alt="Vivo" className="max-h-6" />
        </div>
      ),
      dataIndex: "disponibilidade",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`VIVO - Disponível (via range numérico: ${record.range_min} - ${record.range_max})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="VIVO - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="VIVO - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <img className="h-8 w-8" src="/assets/claro.png" alt="Claro" />
        </div>
      ),
      dataIndex: "availability_claro",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range_claro ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`CLARO - Disponível (via range numérico: ${record.range_min_claro} - ${record.range_max_claro})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="CLARO - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="CLARO - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <img className="h-7 w-14" src="/assets/tim.svg" alt="TIM" />
        </div>
      ),
      dataIndex: "availability_tim",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range_tim ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`TIM - Disponível (via range numérico: ${record.range_min_tim} - ${record.range_max_tim})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="TIM - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="TIM - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <img className="h-8 w-9" src="/assets/oi.svg" alt="OI" />
        </div>
      ),
      dataIndex: "availability_oi",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range_oi ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`OI - Disponível (via range numérico: ${record.range_min_oi} - ${record.range_max_oi})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="OI - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="OI - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <img className="h-5" src="/assets/sky.svg" alt="Sky" />
        </div>
      ),
      dataIndex: "availability_sky",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range_sky ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`SKY - Disponível (via range numérico: ${record.range_min_sky} - ${record.range_max_sky})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="SKY - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="SKY - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <img className="h-4" src="/assets/nio.svg" alt="NIO" />
        </div>
      ),
      dataIndex: "availability_nio",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center">-</div>
        ) : availability ? (
          record.encontrado_via_range_nio ? (
            <div className="flex items-center justify-center">
              <Tooltip
                title={`NIO - Disponível (via range numérico: ${record.range_min_nio} - ${record.range_max_nio})`}
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Tooltip
                title="NIO - Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip
              title="NIO - Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2  rounded-full">-</div>
            </Tooltip>
          </div>
        ),
    },

    {
      title: "UF",
      dataIndex: "UF",
      key: "UF",
      width: 50,
      render: (uf) => uf || "-",
    },
    {
      title: "Cidade",
      dataIndex: "CIDADE",
      key: "CIDADE",
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
          {cidade}
        </Tooltip>
      ),
    },

    {
      title: "Bairro",
      dataIndex: "BAIRRO",
      key: "BAIRRO",
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
      title: "CEP",
      dataIndex: "CEP",
      key: "CEP",
      width: 90,
      render: (cep) => formatCEP(cep) || "-",
    },
    {
      title: "Logradouro",
      dataIndex: "LOGRADOURO",
      key: "LOGRADOURO",
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
          {logradouro}
        </Tooltip>
      ),
    },
    {
      title: "Número",
      dataIndex: "NUM",
      key: "NUM",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (numero) => (
        <Tooltip
          placement="topLeft"
          title={numero}
          styles={{ body: { fontSize: "12px" } }}
        >
          {numero}
        </Tooltip>
      ),
    },

    {
      title: "Território",
      dataIndex: "TERRITORIO",
      key: "TERRITORIO",
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
      title: "Armário",
      dataIndex: "ARMARIO",
      key: "ARMARIO",
      width: 120,
      render: (armario) => armario || "-",
    },

    {
      title: "Tipo",
      dataIndex: "TIPO",
      key: "TIPO",
      width: 100,
      render: (tipo) => tipo || "-",
    },
  ];

  const defaultVisible = tableColumns.map((col) => col.key as string);
  const [visibleColumns, setVisibleColumns] =
    useState<string[]>(defaultVisible);

  const allColumnOptions = tableColumns.map((col) => ({
    label:
      typeof col.title === "function" ? String(col.key) : String(col.title),
    value: String(col.key),
  }));

  const handleColumnsChange = (checkedValues: string[]) => {
    setVisibleColumns(checkedValues);
  };

  const filteredTableColumns = tableColumns.filter((col) =>
    visibleColumns.includes(col.key as string),
  );

  return {
    styles,
    tableColumns: filteredTableColumns,
    allTableColumns: tableColumns,
    searchData,
    isSearchLoading,
    searchError,
    refetchSearch,
    visibleColumns,
    allColumnOptions,
    handleColumnsChange,
  };
}

export function useGetAllCidadesController(uf: string) {
  const consultAvailabilityService = new ConsultAvailabilityService();

  const { data, isLoading, error, refetch } = useQuery<any>({
    refetchOnWindowFocus: false,
    queryKey: ["getAllCidades", uf],
    queryFn: async (): Promise<any> => {
      const response = await consultAvailabilityService.getAllCidades(uf);
      return response;
    },
    enabled: !!uf,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export function useGetAllBairrosController(uf: string, cidade: string) {
  const consultAvailabilityService = new ConsultAvailabilityService();

  const { data, isLoading, error, refetch } = useQuery<any>({
    refetchOnWindowFocus: false,
    queryKey: ["getAllBairros", uf, cidade],
    queryFn: async (): Promise<any> => {
      const response = await consultAvailabilityService.getAllBairros(
        uf,
        cidade,
      );
      return response;
    },
    enabled: !!uf && !!cidade,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
