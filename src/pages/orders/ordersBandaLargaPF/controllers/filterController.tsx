import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TableColumnsType, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCPF } from "@/utils/formatCPF";
import { BandaLargaFilters } from "@/interfaces/bandaLargaPF";

function getFiltersFromURL(): BandaLargaFilters {
  const params = new URLSearchParams(window.location.search);

  const availability = params.get("availability");
  let availabilityBool: boolean | undefined = undefined;
  if (availability === "true") availabilityBool = true;
  if (availability === "false") availabilityBool = false;
  const plan = params.get("plan") || undefined;
  const fullname = params.get("fullname") || undefined;
  const phone = params.get("phone") || undefined;
  const cpf = params.get("cpf") || undefined;
  const cnpj = params.get("cnpj") || undefined;
  const razaosocial = params.get("razaosocial") || undefined;
  const ordernumber = params.get("ordernumber") || undefined;
  const data_ate = params.get("data_ate") || undefined;
  const data_de = params.get("data_de") || undefined;
  const page = parseInt(params.get("page") || "1", 10);
  const limit = parseInt(params.get("limit") || "200", 10);
  const order = params.get("order") as "asc" | "desc" | null;
  const sort = params.get("sort") || undefined;
  const status_pos_venda = params.get("status_pos_venda") || null;

  return {
    availability: availabilityBool,
    plan,
    fullname,
    phone,
    cpf,
    cnpj,
    razaosocial,
    ordernumber,
    data_ate,
    data_de,
    page,
    limit,
    order: order === "asc" || order === "desc" ? order : undefined,
    status,
    sort,
    status_pos_venda,
  };
}

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
      .ant-table-tbody > tr {
        background: #fff !important;
      }
      /* Cor de fundo do body */
      .ant-table-tbody > td {
        background: #fff !important;
      }
      /* Cor de fundo do body */
      .ant-table-row-green > td {
        background-color: #e6ffed !important;
      }
      .ant-table-row-yellow > td {
        background-color: #fff6c7 !important;
      }
      .ant-table-row-red > td {
        background-color: #ffeaea !important;
      }
      .ant-table-row-purple > td {
        background-color: #f5e6ff !important;
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

export function useAllOrdersFilterController() {
  const navigate = useNavigate();
  const filters = getFiltersFromURL();

  const [selectedBLOrder, setSelectedBLOrder] = useState<any | null>(null);

  const currentPage = filters.page;
  const pageSize = filters.limit;

  const { handleSubmit, reset, control } = useForm<BandaLargaFilters>({
    defaultValues: {
      availability: undefined,
      plan: "",
      fullname: "",
      phone: "",
      cpf: "",
      cnpj: "",
      razaosocial: "",
      ordernumber: "",
      data_ate: "",
      data_de: "",
      order: undefined,
      sort: "",
      status: null,
      status_pos_venda: "",
      initial_status: filters.initial_status || "",
    },
  });

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const onSubmit = (data: BandaLargaFilters) => {
    const params = new URLSearchParams();

    if (data.availability !== undefined)
      params.set("availability", String(data.availability));
    if (data.plan) params.set("plan", data.plan);
    if (data.fullname) params.set("fullname", data.fullname);
    if (data.phone) {
      const phoneSemMascara = data.phone.replace(/\D/g, "");
      params.set("phone", phoneSemMascara);
    }
    if (data.status_pos_venda)
      params.set("status_pos_venda", data.status_pos_venda);
    if (data.cpf) {
      const cpfSemMascara = data.cpf.replace(/\D/g, "");
      params.set("cpf", cpfSemMascara);
    }
    if (data.cnpj) {
      const cnpjSemMascara = data.cnpj.replace(/\D/g, "");
      params.set("cnpj", cnpjSemMascara);
    }
    if (data.razaosocial) params.set("razaosocial", data.razaosocial);
    if (data.ordernumber) params.set("ordernumber", data.ordernumber);
    if (data.data_de) params.set("data_de", data.data_de);
    if (data.data_ate) params.set("data_ate", data.data_ate);
    if (data.status) params.set("status", data.status);
    if (data.initial_status) params.set("initial_status", data.initial_status);

    params.set("page", "1");
    params.set("limit", "200");
    if (data.order) params.set("order", data.order);
    if (data.sort) params.set("sort", data.sort);

    navigate(`?${params.toString()}`);
    setIsFiltered(true);
  };

  const clearFilters = () => {
    reset();
    navigate("");
    setIsFiltered(false);
  };

  const { styles } = useStyle();

  const columns: TableColumnsType<any> = [
    {
      title: "",
      dataIndex: "avatar",
      width: 80,
      render: () => {
        return (
          <img
            src="\assets\anonymous_avatar.png"
            className="h-9 w-9 rounded-full"
          />
        );
      },
    },

    {
      title: "ID",
      dataIndex: "ordernumber",
      width: 80,
      render: (ordernumber, record) =>
        ordernumber ? ordernumber : record.id || "-",
    },

    {
      title: "Abertura",
      dataIndex: "created_at",
      width: 110,
      sorter: true,
      sortOrder:
        filters.sort === "created_at"
          ? filters.order === "asc"
            ? "ascend"
            : filters.order === "desc"
              ? "descend"
              : undefined
          : undefined,
      onHeaderCell: () => ({
        onClick: () => {
          const newOrder =
            filters.sort === "created_at" && filters.order === "asc"
              ? "desc"
              : "asc";
          const params = new URLSearchParams(window.location.search);
          params.set("sort", "created_at");
          params.set("order", newOrder);
          params.set("page", "1");
          navigate(`?${params.toString()}`);
        },
        style: { cursor: "pointer" },
      }),
    },
    {
      title: "Título WA",
      dataIndex: "titulo_wa",
      width: 120,
      render: (titulo_wa) => (titulo_wa ? titulo_wa : "-"),
    },
    {
      title: "Whatsapp",
      dataIndex: "whatsapp",
      width: 100,
      render: (whatsapp) => (whatsapp ? whatsapp : "-"),
    },
    {
      title: "VIVO",
      dataIndex: "availability",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          "-"
        ) : availability ? (
          record.encontrado_via_range ? (
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        ),
    },
    {
      title: "CLARO",
      dataIndex: "availability_claro",
      width: 80,
      render: (availability_claro, record) =>
        availability_claro === null || availability_claro === undefined ? (
          "-"
        ) : availability_claro ? (
          record.encontrado_via_range ? (
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        ),
    },
    {
      title: "TIM",
      dataIndex: "availability_tim",
      width: 80,
      render: (availability_tim, record) =>
        availability_tim === null || availability_tim === undefined ? (
          "-"
        ) : availability_tim ? (
          record.encontrado_via_range ? (
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        ),
    },
    {
      title: "SKY",
      dataIndex: "availability_sky",
      width: 80,
      render: (availability_sky, record) =>
        availability_sky === null || availability_sky === undefined ? (
          "-"
        ) : availability_sky ? (
          record.encontrado_via_range ? (
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        ),
    },
    {
      title: "NIO",
      dataIndex: "availability_nio",
      width: 80,
      render: (availability_nio, record) =>
        availability_nio === null || availability_nio === undefined ? (
          "-"
        ) : availability_nio ? (
          record.encontrado_via_range ? (
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          )
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        ),
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      width: 120,
      render: (cpf) => (cpf ? formatCPF(cpf) : "-"),
      filters: [
        {
          text: "Preenchido",
          value: "preenchido",
        },
        {
          text: "Vazio",
          value: "vazio",
        },
      ],

      onFilter: (value, record) => {
        if (value === "preenchido") {
          return (
            record.cpf !== null && record.cpf !== undefined && record.cpf !== ""
          );
        }
        if (value === "vazio") {
          return (
            record.cpf === null || record.cpf === undefined || record.cpf === ""
          );
        }
        return true;
      },
    },
    {
      title: "Nome Completo",
      dataIndex: "fullname",
      ellipsis: {
        showTitle: false,
      },
      render: (fullname) => (
        <Tooltip
          placement="topLeft"
          title={fullname}
          styles={{ body: { fontSize: "12px" } }}
        >
          {fullname}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      width: 120,
      render: (phone) => (phone ? formatPhoneNumber(phone) : "-"),
      filters: [
        {
          text: "Preenchido",
          value: "preenchido",
        },
        {
          text: "Vazio",
          value: "vazio",
        },
      ],

      onFilter: (value, record) => {
        if (value === "preenchido") {
          return (
            record.phone !== null &&
            record.phone !== undefined &&
            record.phone !== ""
          );
        }
        if (value === "vazio") {
          return (
            record.phone === null ||
            record.phone === undefined ||
            record.phone === ""
          );
        }
        return true;
      },
    },
    {
      title: "Anatel",
      dataIndex: "numero_valido",
      width: 70,
      render: (numero_valido) =>
        numero_valido ? "Sim" : numero_valido === null ? "-" : "Não",
    },
    {
      title: "Operadora",
      dataIndex: "operadora",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <Tooltip
          placement="topLeft"
          title={record.operadora}
          styles={{ body: { fontSize: "12px" } }}
        >
          {record.operadora || "-"}
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip
          placement="topLeft"
          title={email}
          styles={{ body: { fontSize: "12px" } }}
        >
          {email}
        </Tooltip>
      ),
      width: 140,
    },

    {
      title: "Data de Nascimento",
      dataIndex: "birthdate",
      width: 150,
    },
    {
      title: "Nome da Mãe",
      dataIndex: "motherfullname",
      ellipsis: {
        showTitle: false,
      },
      render: (motherfullname) => (
        <Tooltip
          placement="topLeft"
          title={motherfullname}
          styles={{ body: { fontSize: "12px" } }}
        >
          {motherfullname}
        </Tooltip>
      ),
      width: 140,
    },
    {
      title: "CEP",
      dataIndex: "cep",
      width: 100,
    },
    {
      title: "Endereço",
      dataIndex: "address",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip
          placement="topLeft"
          title={address}
          styles={{ body: { fontSize: "12px" } }}
        >
          {address}
        </Tooltip>
      ),
      width: 140,
    },
    {
      title: "Número",
      dataIndex: "addressnumber",
      width: 80,
    },

    {
      title: "Bairro",
      dataIndex: "district",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (district) => (
        <Tooltip
          placement="topLeft"
          title={district}
          styles={{ body: { fontSize: "12px" } }}
        >
          {district}
        </Tooltip>
      ),
    },

    {
      title: "Cidade",
      dataIndex: "city",
      width: 120,
    },
    {
      title: "UF",
      dataIndex: "state",
      width: 60,
    },
    {
      title: "URL",
      dataIndex: "url",
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: (url) => (
        <Tooltip
          placement="topLeft"
          title={url}
          styles={{ body: { fontSize: "12px" } }}
        >
          {url}
        </Tooltip>
      ),
    },
    {
      title: "IP do Cliente",
      dataIndex: "client_ip",
      width: 120,
      render: (client_ip) => (client_ip ? client_ip : "-"),
    },
    {
      title: "Device",
      dataIndex: "device",
      width: 120,
      render: (device) => (device ? device : "-"),
    },
    {
      title: "Sistema Operacional",
      dataIndex: "so",
      width: 160,
      render: (so) => (so ? so : "-"),
    },
    // {
    //   title: "Fingerprint",
    //   dataIndex: "finger_print",
    //   render: (finger_print) => (finger_print ? finger_print : "-"),
    //   width: 100,
    // },
  ];

  return {
    isFiltered,
    control,
    onSubmit,
    handleSubmit,
    clearFilters,
    selectedBLOrder,
    setSelectedBLOrder,
    currentPage,
    pageSize,
    columns,
    styles: { customTable: styles.customTable },
  };
}
