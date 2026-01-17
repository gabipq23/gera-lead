import { formatBRL } from "@/utils/formatBRL";
import { formatDateTimeBR } from "@/utils/formatDateTimeBR";
import * as XLSX from "xlsx";

export const handleExportXLSX = (data: any, selectedRowKeys: any) => {
  if (!data || !selectedRowKeys || selectedRowKeys.length === 0) {
    return;
  }

  const pedidosSelecionados = data?.filter((item: any) =>
    selectedRowKeys.includes(item.id)
  );

  if (!pedidosSelecionados || pedidosSelecionados.length === 0) {
    return;
  }

  const camposMonetarios = ["plan.price"];
  const camposDataHora = [
    "birthdate",
    "installation_preferred_date_one",
    "installation_preferred_date_two",
  ];

  // Definir a ordem desejada das colunas
  const ordemColunas = [
    "ordernumber",
    "created_at",
    "status",
    "status_pos_venda",
    "observacao_consultor",
    "fullname",
    "cpf",
    "phone",
    "phoneAdditional",
    "email",
    "birthdate",
    "motherfullname",
    "plan.name",
    "plan.speed",
    "plan.price",
    "availability",
    "cep",
    "address",
    "addressnumber",
    "addresscomplement",
    "addresslot",
    "addressblock",
    "addressFloor",
    "buildingorhouse",
    "district",
    "addressreferencepoint",
    "city",
    "state",
    "dueday",
    "installation_preferred_date_one",
    "installation_preferred_date_two",
    "installation_preferred_period_one",
    "installation_preferred_period_two",
    "accept_offers",
    "terms_accepted",
    "typeclient",
    "consultor_responsavel",
    "id_vivo_corp",
    "id_crm",
    "equipe",
    "url",
    "client_ip",
  ];

  const colNames: Record<string, string> = {
    ordernumber: "Número do Pedido",
    created_at: "Data de Criação",
    cpf: "CPF",
    fullname: "Nome Completo",
    phone: "Telefone",
    phoneAdditional: "Telefone Adicional",
    email: "E-mail",
    birthdate: "Data de Nascimento",
    motherfullname: "Nome da Mãe",
    cep: "CEP",
    address: "Endereço",
    addressnumber: "Número",
    addresscomplement: "Complemento",
    addresslot: "Lote",
    addressblock: "Quadra",
    addressFloor: "Andar",
    buildingorhouse: "Prédio ou Casa",
    district: "Bairro",
    addressreferencepoint: "Ponto de Referência",
    city: "Cidade",
    state: "Estado",
    "plan.name": "Nome do Plano",
    "plan.price": "Preço do Plano",
    "plan.speed": "Velocidade do Plano",
    installation_preferred_date_one: "Data Preferida 1",
    installation_preferred_date_two: "Data Preferida 2",
    installation_preferred_period_one: "Período Preferido 1",
    installation_preferred_period_two: "Período Preferido 2",
    dueday: "Dia de Vencimento",
    accept_offers: "Aceita Ofertas",
    terms_accepted: "Termos Aceitos",
    typeclient: "Tipo de Cliente",
    url: "URL",
    status: "Status",
    id_vivo_corp: "ID Vivo",
    id_crm: "ID CRM",
    consultor_responsavel: "Consultor Responsável",
    status_pos_venda: "Status Pós-Venda",
    equipe: "Equipe",
    client_ip: "IP do Cliente",
    availability: "Disponibilidade",
    observacao_consultor: "Observação do Consultor",
  };

  const pedidosFormatados = pedidosSelecionados.map((pedido: any) => {
    const linha: any = {};

    // Processar campos na ordem definida
    ordemColunas.forEach((key) => {
      if (key.includes(".")) {
        // Campos aninhados como plan.name, plan.price
        const [obj, prop] = key.split(".");
        if (pedido[obj] && pedido[obj][prop] !== undefined) {
          const valor = pedido[obj][prop];

          if (camposMonetarios.includes(key)) {
            linha[colNames[key] || key] = formatBRL(valor);
          } else if (camposDataHora.includes(key)) {
            linha[colNames[key] || key] = formatDateTimeBR(valor);
          } else {
            linha[colNames[key] || key] = valor || "";
          }
        } else {
          linha[colNames[key] || key] = "";
        }
      } else {
        if (pedido[key] !== undefined) {
          const valor = pedido[key];

          if (camposMonetarios.includes(key)) {
            linha[colNames[key] || key] = formatBRL(valor);
          } else if (camposDataHora.includes(key)) {
            linha[colNames[key] || key] = formatDateTimeBR(valor);
          } else {
            linha[colNames[key] || key] = valor;
          }
        } else {
          linha[colNames[key] || key] = "";
        }
      }
    });

    // Aplicar formatações específicas
    linha[colNames["accept_offers"]] =
      pedido.accept_offers === 1 ? "Sim" : "Não";
    linha[colNames["terms_accepted"]] =
      pedido.terms_accepted === 1 ? "Sim" : "Não";
    linha[colNames["buildingorhouse"]] =
      pedido.buildingorhouse === "building" ? "Prédio" : "Casa";
    linha[colNames["availability"]] = pedido.availability === 1 ? "Sim" : "Não";

    return linha;
  });

  const pedidoSheet = XLSX.utils.json_to_sheet(pedidosFormatados);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, pedidoSheet, "Pedidos Banda Larga PF");

  XLSX.writeFile(workbook, `pedidos-banda-larga-pf-selecionados.xlsx`);
};
