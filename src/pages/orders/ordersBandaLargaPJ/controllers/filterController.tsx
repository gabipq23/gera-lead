import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TableColumnsType, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { BandaLargaPJFilters } from "@/interfaces/bandaLargaPJ";
import { formatCPF } from "@/utils/formatCPF";

function getFiltersFromURL(): BandaLargaPJFilters {
  const params = new URLSearchParams(window.location.search);

  const rawInitialStatus = params.get("initial_status");
  const initial_status =
    rawInitialStatus === "consulta"
      ? "consulta"
      : rawInitialStatus === "pedido"
        ? "pedido"
        : "";
  const availability = params.get("availability");
  let availabilityBool: boolean | undefined = undefined;
  if (availability === "true") availabilityBool = true;
  if (availability === "false") availabilityBool = false;
  const plan = params.get("plan") || undefined;
  const fullname = params.get("fullname") || undefined;
  const phone = params.get("phone") || undefined;
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
    cnpj,
    razaosocial,
    status,
    ordernumber,
    data_ate,
    data_de,
    page,
    limit,
    order: order === "asc" || order === "desc" ? order : undefined,
    sort,
    status_pos_venda,
    initial_status,
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
        colorText: "#116e75",
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

  const { handleSubmit, reset, control } = useForm<BandaLargaPJFilters>({
    defaultValues: {
      availability: undefined,
      plan: "",
      fullname: "",
      phone: "",
      cnpj: "",
      razaosocial: "",
      status: null,
      status_pos_venda: "",
      initial_status: filters.initial_status || "",

      ordernumber: "",
      data_ate: "",
      data_de: "",
      order: undefined,
      sort: "",
    },
  });

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const onSubmit = (data: BandaLargaPJFilters) => {
    const params = new URLSearchParams();
    if (data.availability !== undefined)
      params.set("availability", String(data.availability));
    if (data.plan) params.set("plan", data.plan);
    if (data.fullname) params.set("fullname", data.fullname);
    if (data.phone) {
      const phoneSemMascara = data.phone.replace(/\D/g, "");
      params.set("phone", phoneSemMascara);
    }
    if (data.cnpj) {
      const cnpjSemMascara = data.cnpj.replace(/\D/g, "");
      params.set("cnpj", cnpjSemMascara);
    }
    if (data.initial_status) params.set("initial_status", data.initial_status);

    if (data.razaosocial) params.set("razaosocial", data.razaosocial);
    if (data.ordernumber) params.set("ordernumber", data.ordernumber);
    if (data.data_de) params.set("data_de", data.data_de);
    if (data.data_ate) params.set("data_ate", data.data_ate);
    if (data.status) params.set("status", data.status);
    if (data.status_pos_venda)
      params.set("status_pos_venda", data.status_pos_venda);

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
  const capitalizeWords = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const columns: TableColumnsType<any> = [
    {
      title: "ID do Pedido",
      dataIndex: "ordernumber",
      width: 110,
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
      title: "Tipo",
      dataIndex: "typeclient",
      width: 100,
      render: (typeclient) => (typeclient === "PJ" ? "PJ" : "PF"),
    },
    {
      title: "Tem disponibilidade?",
      dataIndex: "availability",
      width: 150,
      render: (availability) => (availability ? "Sim" : "Não"),
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      width: 140,
      render: (cnpj) => (cnpj ? formatCNPJ(cnpj) : "-"),
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
            record.cnpj !== null &&
            record.cnpj !== undefined &&
            record.cnpj !== ""
          );
        }
        if (value === "vazio") {
          return (
            record.cnpj === null ||
            record.cnpj === undefined ||
            record.cnpj === ""
          );
        }
        return true;
      },
    },
    {
      title: "Razão Social ",
      dataIndex: "razaosocial",
      ellipsis: {
        showTitle: false,
      },
      render: (razaosocial) => (
        <Tooltip
          placement="topLeft"
          title={capitalizeWords(razaosocial)}
          styles={{ body: { fontSize: "12px" } }}
        >
          {capitalizeWords(razaosocial)}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      width: 140,
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
            record.cnpj === null ||
            record.cnpj === undefined ||
            record.cnpj === ""
          );
        }
        return true;
      },
    },
    {
      title: "Nome",
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
          {fullname || "-"}
        </Tooltip>
      ),
      width: 140,
    },
    {
      title: "Nome da mãe",
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
          {motherfullname || "-"}
        </Tooltip>
      ),
      width: 140,
    },

    {
      title: "Telefone",
      dataIndex: ["manager", "phone"],
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
            record.manager?.phone !== null &&
            record.manager?.phone !== undefined &&
            record.manager?.phone !== ""
          );
        }
        if (value === "vazio") {
          return (
            record.manager?.phone === null ||
            record.manager?.phone === undefined ||
            record.manager?.phone === ""
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
      dataIndex: ["manager", "email"],
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip
          placement="topLeft"
          title={email}
          styles={{ body: { fontSize: "12px" } }}
        >
          {email || "-"}
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
