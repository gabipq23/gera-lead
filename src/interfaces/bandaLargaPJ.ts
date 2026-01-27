export interface OrderBandaLargaPJResponse {
  pedidos: OrderBandaLargaPJ[];
  status_pos_venda_enum: string[];
}
export interface OperadoraAvailability {
  range_max: number | null;
  range_min: number | null;
  availability: boolean;
  encontrado_via_range: boolean;
}

export interface OrderBandaLargaPJ {
  accept_offers: number;
  address: string;
  addressblock: string;
  cep_unico: number;

  addresscomplement: string;
  addressFloor: string;
  addresslot: string;
  addressnumber: string;
  addressreferencepoint: string;
  range_max: number | null;
  range_min: number | null;
  availability: boolean;
  encontrado_via_range: boolean;
  availability_operadoras: {
    claro?: OperadoraAvailability;
    tim?: OperadoraAvailability;
    oi?: OperadoraAvailability;
    sky?: OperadoraAvailability;
    nio?: OperadoraAvailability;
    net?: OperadoraAvailability;
  };
  buildingorhouse: string;
  cep: string;
  city: string;
  client_ip: string;
  cnpj: string;
  consulta: boolean;
  consultor_responsavel?: string;
  created_at: string;
  district: string;
  dueday: number;
  equipe: string;
  finger_print: string;
  fixedLineNumberToPort?: string;
  hasFixedLinePortability?: boolean | number;
  fullname: string;
  id: number;
  id_consult: string;
  id_crm?: number;
  id_order: string;
  id_vivo_corp?: string;
  installation_preferred_date_one: string;
  installation_preferred_date_two: string;
  installation_preferred_period_one: string;
  installation_preferred_period_two: string;
  manager: {
    cpf: string;
    email: string;
    name: string;
    phone: string;
    hasLegalAuthorization: boolean;
  };
  manager_name: string;
  numero_valido: boolean | number;
  obs_consultor: string;
  observacao_consultor: string;
  ordernumber: number;
  operadora: string;
  pedido: boolean;
  phone: string;
  phoneAdditional?: string;
  plan: {
    name: string;
    price: number;
    id: string;
    speed: string;
  };
  razaosocial: string;
  state: string;
  status: string;
  status_pos_venda?: string;
  terms_accepted: number;
  typeclient: "PF" | "PJ";
  url: string;
  wantsFixedIp: boolean;
  tv: boolean;
  tv_package: string;
  app: boolean;
  app_package: string;
  mei: boolean;
  socio: boolean;
  device: string;
  so: string;
  provider: string;
  provedor: string;
  empresas: string;
  ip_isp: string;
  ip_tipo_acesso: string;
}
export interface BandaLargaPJFilters {
  availability?: boolean;
  plan?: string;
  fullname?: string;
  phone?: string;
  cnpj?: string;
  razaosocial?: string;
  ordernumber?: string;
  data_de?: string;
  data_ate?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  status: string | null;
  status_pos_venda?: string | null;
  consulta?: boolean | number;
  pedido?: boolean | number;
  initial_status?: string;
}
