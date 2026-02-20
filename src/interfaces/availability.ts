export interface IAvailability {
  disponibilidade: boolean;
  availability: boolean;
  encontrado_via_range: boolean;
  range_max: number;
  range_min: number;
  availability_algar: boolean;
  encontrado_via_range_algar: boolean;
  range_min_algar: number | null;
  range_max_algar: number | null;
  availability_claro: boolean;
  encontrado_via_range_claro: boolean;
  range_min_claro: number | null;
  range_max_claro: number | null;
  availability_tim: boolean;
  encontrado_via_range_tim: boolean;
  range_min_tim: number | null;
  range_max_tim: number | null;
  availability_nio: boolean;
  encontrado_via_range_nio: boolean;
  range_min_nio: number | null;
  range_max_nio: number | null;
  availability_net: boolean;
  encontrado_via_range_net: boolean;
  range_min_net: number | null;
  range_max_net: number | null;
  availability_oi: boolean;
  encontrado_via_range_oi: boolean;
  range_min_oi: number | null;
  range_max_oi: number | null;
  availability_sky: boolean;
  encontrado_via_range_sky: boolean;
  range_min_sky: number | null;
  range_max_sky: number | null;

  id: number;
  UF: string;
  CIDADE: string;
  ARMARIO: string;
  TERRITORIO: string;
  LOGRADOURO: string;
  NUM: string;
  CEP: string;
  BAIRRO: string;
  TIPO: string | null;
  created_at: string;
  updated_at: string;
}

export interface ISearchAvailabilityResponse {
  sucesso: boolean;
  dados: IAvailability[];
  paginacao: {
    total: number;
    limite: number;
    pagina: number;
    totalPaginas: number;
  };
  filtros: {
    uf?: string;
    cidade?: string;
    limite?: number;
    page?: number;
    cep?: string;
    numero?: string;
    bairro?: string[];
  };
}

export interface IBulkAvailabilityResult {
  linha: number;
  cep: string;
  numero: string | null;
  disponibilidade: boolean;
  encontrado_via_range: boolean;
  range_min: number | null;
  range_max: number | null;
  uf: string;
  cidade: string;
  bairro: string;
  endereco_completo: string;
  logradouro: string;
  numero_endereco: string;
  armario: string | null;
  tipo: string | null;
  territorio: string;
  // Operadoras
  availability_algar: boolean;
  encontrado_via_range_algar: boolean;
  range_min_algar: number | null;
  range_max_algar: number | null;
  availability_claro: boolean;
  encontrado_via_range_claro: boolean;
  range_min_claro: number | null;
  range_max_claro: number | null;
  availability_tim: boolean;
  encontrado_via_range_tim: boolean;
  range_min_tim: number | null;
  range_max_tim: number | null;
  availability_nio: boolean;
  encontrado_via_range_nio: boolean;
  range_min_nio: number | null;
  range_max_nio: number | null;
  availability_net: boolean;
  encontrado_via_range_net: boolean;
  range_min_net: number | null;
  range_max_net: number | null;
  availability_oi: boolean;
  encontrado_via_range_oi: boolean;
  range_min_oi: number | null;
  range_max_oi: number | null;
  availability_sky: boolean;
  encontrado_via_range_sky: boolean;
  range_min_sky: number | null;
  range_max_sky: number | null;
}

export interface IBulkAvailabilityReport {
  total: number;
  com_disponibilidade: number;
  sem_disponibilidade: number;
  erros: number;
}

export interface IBulkAvailabilityResponse {
  sucesso: boolean;
  mensagem: string;
  relatorio: IBulkAvailabilityReport;
  paginacao: {
    total: number;
    limite: number;
    pagina: number;
    totalPaginas: number;
  };
  resultados: IBulkAvailabilityResult[];
}
