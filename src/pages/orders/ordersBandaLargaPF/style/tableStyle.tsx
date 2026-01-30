import { TableColumnsType, Tooltip } from "antd";
import { getFiltersFromURL } from "../controllers/filterController";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "@/utils/formatCPF";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useStyle } from "./useStyle";
import OperatorAvailability from "@/components/OperatorAvailability";

export default function TableStyle() {
  const { styles } = useStyle();
  const filters = getFiltersFromURL();
  const navigate = useNavigate();

  const columns: TableColumnsType<any> = [
    {
      title: "",
      dataIndex: "avatar",
      width: 80,
      render: (avatar) => {
        return (
          <img
            src={avatar || "/assets/anonymous_avatar.png"}
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
      render: (availability, record) => (
        <OperatorAvailability
          operatorName="VIVO"
          operatorData={{
            availability,
            encontrado_via_range: record.encontrado_via_range,
          }}
        />
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
      render: (_, record) => (
        <OperatorAvailability
          operatorName="CLARO"
          operatorData={record.availability_operadoras?.claro}
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-9" src="/assets/tim.svg" alt="TIM" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "tim", "availability"],
      width: 80,
      render: (_, record) => (
        <OperatorAvailability
          operatorName="TIM"
          operatorData={record.availability_operadoras?.tim}
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-8" src="/assets/oi.svg" alt="OI" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "oi", "availability"],
      width: 80,
      render: (_, record) => (
        <OperatorAvailability
          operatorName="OI"
          operatorData={record.availability_operadoras?.oi}
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-6" src="/assets/sky.svg" alt="Sky" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "sky", "availability"],
      width: 80,
      render: (_, record) => (
        <OperatorAvailability
          operatorName="SKY"
          operatorData={record.availability_operadoras?.sky}
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center ">
          <img className="h-3" src="/assets/nio.svg" alt="NIO" />
        </div>
      ),
      dataIndex: ["availability_operadoras", "nio", "availability"],
      width: 80,
      render: (_, record) => (
        <OperatorAvailability
          operatorName="NIO"
          operatorData={record.availability_operadoras?.nio}
        />
      ),
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
          {fullname || "-"}
        </Tooltip>
      ),
      width: 150,
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
      title: "Titular",
      dataIndex: "titular_pf_pj",
      width: 120,
      render: (titular_pf_pj) => (titular_pf_pj ? titular_pf_pj : "-"),
    },
    {
      title: "Titularidade",
      dataIndex: "titularidade",
      width: 120,
      render: (titularidade) => (titularidade ? titularidade : "-"),
    },
    {
      title: "Título WA",
      dataIndex: "nome_whatsapp",
      width: 120,
      render: (nome_whatsapp) => (nome_whatsapp ? nome_whatsapp : "-"),
    },
    {
      title: "Whatsapp",
      dataIndex: "is_comercial",
      width: 100,
      render: (is_comercial) =>
        is_comercial === true
          ? "Business"
          : is_comercial === false
            ? "Messenger"
            : "-",
    },
    {
      title: "Status",
      dataIndex: "recado",
      ellipsis: {
        showTitle: false,
      },
      render: (recado) => (
        <Tooltip
          placement="topLeft"
          title={recado}
          styles={{ body: { fontSize: "12px" } }}
        >
          {recado || "-"}
        </Tooltip>
      ),
      width: 140,
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
          {email || "-"}
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
          {motherfullname || "-"}
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
      dataIndex: "ip_isp",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (ip_isp) => (
        <Tooltip
          placement="topLeft"
          title={ip_isp}
          styles={{ body: { fontSize: "12px" } }}
        >
          {ip_isp}
        </Tooltip>
      ),
    },
    {
      title: "Tipo de acesso",
      dataIndex: "ip_tipo_acesso",
      width: 140,
      render: (ip_tipo_acesso) =>
        ip_tipo_acesso === "movel"
          ? "Móvel"
          : ip_tipo_acesso === "fixo"
            ? "Fixo"
            : ip_tipo_acesso === "hosting"
              ? "Hosting"
              : ip_tipo_acesso === "proxy"
                ? "Proxy"
                : ip_tipo_acesso === "local"
                  ? "Local"
                  : ip_tipo_acesso === "desconhecido"
                    ? "Desconhecido"
                    : "-",
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
    columns,
    styles: { customTable: styles.customTable },
  };
}
