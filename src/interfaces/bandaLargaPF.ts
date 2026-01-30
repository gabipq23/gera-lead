export interface OrderBandaLargaPFResponse {
  pedidos: OrderBandaLargaPF[];
  status_pos_venda_enum: string[];
}

export interface OperadoraAvailability {
  range_max: number | null;
  range_min: number | null;
  availability: boolean;
  encontrado_via_range: boolean;
}

export interface OrderBandaLargaPF {
  accept_offers: number;
  address: string;
  cep_unico: number;
  addressblock: string;
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
  birthdate: string;
  buildingorhouse: number | string;
  cep: string;
  city: string;
  client_ip: string;
  consultor_responsavel?: string;
  consulta: boolean;
  cpf: string;
  created_at: string;
  district: string;
  dueday: number;
  email: string;
  equipe: string;
  finger_print: string;
  fixedLineNumberToPort?: string | null;
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
  motherfullname: string;
  numero_valido: boolean | number;
  ordernumber: number;
  obs_consultor: string;
  observacao_consultor: string;
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
  razaosocial?: string;
  status: string;
  status_pos_venda?: string;
  state: string;
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
  is_comercial?: boolean;
  nome_whatsapp?: string;
  recado?: string;
  avatar?: string;
  voz_fixa?: string;
  browser?: string;
  resolution?: string;
  nome_receita: string;
  data_de_nascimento_receita: string;
  nome_da_mae_receita: string;
  is_mei: boolean | number;
  is_socio: boolean | number;
  socios_empresas: SociosEmpresas[];
}

interface SociosEmpresas {
  cnpj: string;
  nome: string;
  porte: string;
}

export interface BandaLargaFilters {
  status_pos_venda?: string | null;
  availability?: boolean;
  plan?: string;
  fullname?: string;
  phone?: string;
  cpf?: string;
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
  consulta?: boolean | number;
  pedido?: boolean | number;
  initial_status?: string;
}
