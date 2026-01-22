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
        colorText: "#8b8e8f",
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
      title: "Temp",
      dataIndex: "temperatura_lead",
      width: 80,
      render: (temperatura_lead) => (temperatura_lead ? temperatura_lead : "-"),
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
      title: (
        <div className="flex items-center justify-center ">
          <img src="/assets/vivo.png" alt="Vivo" />
        </div>
      ),
      dataIndex: "availability",
      width: 80,
      render: (availability, record) =>
        availability === null || availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : availability ? (
          record.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="VIVO -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="VIVO -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="VIVO -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        ),
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-8 w-8" src="/assets/claro.png" alt="Claro" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "claro", "availability"],
      width: 80,
      render: (_, record) => {
        const claro = record.availability_operadoras?.claro;
        return claro?.availability === null ||
          claro?.availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : claro?.availability ? (
          claro?.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="CLARO -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="CLARO -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="CLARO -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-9" src="/assets/tim.svg" alt="TIM" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "tim", "availability"],
      width: 80,
      render: (_, record) => {
        const tim = record.availability_operadoras?.tim;
        return tim?.availability === null || tim?.availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : tim?.availability ? (
          tim?.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="TIM -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="TIM -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="TIM -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-8" src="/assets/oi.svg" alt="OI" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "oi", "availability"],
      width: 80,
      render: (_, record) => {
        const oi = record.availability_operadoras?.oi;
        return oi?.availability === null || oi?.availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : oi?.availability ? (
          oi?.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="OI -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="OI -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="OI -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-6" src="/assets/sky.svg" alt="Sky" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "sky", "availability"],
      width: 80,
      render: (_, record) => {
        const sky = record.availability_operadoras?.sky;
        return sky?.availability === null || sky?.availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : sky?.availability ? (
          sky?.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="SKY -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="SKY -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="SKY -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-3" src="/assets/nio.svg" alt="NIO" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "nio", "availability"],
      width: 80,
      render: (_, record) => {
        const nio = record.availability_operadoras?.nio;
        return nio?.availability === null || nio?.availability === undefined ? (
          <div className="flex items-center justify-center ">-</div>
        ) : nio?.availability ? (
          nio?.encontrado_via_range ? (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="NIO -  Disponível (via range numérico)"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Tooltip
                title="NIO -  Disponível"
                placement="top"
                styles={{ body: { fontSize: "12px" } }}
              >
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center ">
            <Tooltip
              title="NIO -  Indisponível"
              placement="top"
              styles={{ body: { fontSize: "12px" } }}
            >
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>{" "}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Plano",
      dataIndex: ["plan", "name"],
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <Tooltip
          placement="topLeft"
          title={record.plan?.name}
          styles={{ body: { fontSize: "12px" } }}
        >
          {record.plan?.name
            ? record.plan?.name + " - " + record.plan?.speed
            : "-"}
        </Tooltip>
      ),
      width: 180,
    },
    {
      title: "Valor do Plano",
      dataIndex: ["plan", "price"],
      width: 120,
      render: (_, record) =>
        record.plan?.price ? `R$ ${record.plan.price}` : "-",
    },
    {
      title: "TV",
      dataIndex: "tv",
      width: 70,
      render: (tv) => (tv ? "Sim" : tv === undefined ? "-" : "Não"),
    },
    {
      title: "Pacote TV",
      dataIndex: "tv_package",
      width: 120,
      render: (tv_package) => (tv_package ? tv_package : "-"),
    },
    {
      title: "APP",
      dataIndex: "app",
      width: 70,
      render: (app) => (app ? "Sim" : app === undefined ? "-" : "Não"),
    },
    {
      title: "Pacote APP",
      dataIndex: "app_package",
      width: 120,
      render: (app_package) => (app_package ? app_package : "-"),
    },
    {
      title: "IP Fixo",
      dataIndex: "ip_fixo",
      width: 70,
      render: (ip_fixo) =>
        ip_fixo ? "Sim" : ip_fixo === undefined ? "-" : "Não",
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
          {capitalizeWords(razaosocial) || "-"}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Nome Gestor",
      dataIndex: ["manager", "name"],

      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip
          placement="topLeft"
          title={name}
          styles={{ body: { fontSize: "12px" } }}
        >
          {name || "-"}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "CPF Gestor",
      dataIndex: ["manager", "cpf"],
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
      title: "MEI",
      dataIndex: "mei",
      width: 70,
      render: (mei) => (mei ? "Sim" : mei === undefined ? "-" : "Não"),
    },
    {
      title: "Sócio",
      dataIndex: "socio",
      width: 70,
      render: (socio) => (socio ? "Sim" : socio === undefined ? "-" : "Não"),
    },
    {
      title: "Empresas",
      dataIndex: "empresas",
      width: 140,
      render: (empresas) => (empresas ? empresas : "-"),
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
      title: "Títular PF/PJ",
      dataIndex: "titular_pf_pj",
      width: 120,
      render: (titular_pf_pj) => (titular_pf_pj ? titular_pf_pj : "-"),
    },
    {
      title: "Títularidade",
      dataIndex: "titularidade",
      width: 120,
      render: (titularidade) => (titularidade ? titularidade : "-"),
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
    {
      title: "Provedor",
      dataIndex: "provider",
      width: 120,
      render: (provider) => (provider ? provider : "-"),
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
