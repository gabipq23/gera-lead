import { useMutation } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { IBulkAvailabilityResult } from "@/interfaces/availability";
import { useBulkAvailabilityStore } from "../context/BulkAvailabilityContext";
import { ConsultAvailabilityService } from "@/services/consultAvailability";

// Função helper para formatar status da operadora
function formatOperadoraStatus(
  availability: boolean,
  encontrado_via_range: boolean,
  range_min: number | null,
  range_max: number | null,
): string {
  if (!availability) {
    return "Indisponível";
  }

  if (encontrado_via_range && range_min !== null && range_max !== null) {
    return `Disponível via range numérico (${range_min} - ${range_max})`;
  }

  return "Disponível";
}

export function useExportBulkAvailabilityController() {
  const originalDados = useBulkAvailabilityStore(
    (state) => state.originalDados,
  );
  const consultAvailabilityService = new ConsultAvailabilityService();

  const exportMutation = useMutation({
    mutationFn: async () => {
      const response = await consultAvailabilityService.consultAvailabilityBulk(
        originalDados,
        originalDados.length,
        1,
      );
      return response.resultados;
    },
    onSuccess: (data) => {
      exportToXLSX(data);
    },
  });

  return {
    exportData: () => exportMutation.mutate(),
    isExporting: exportMutation.isPending,
    exportError: exportMutation.error,
  };
}

function exportToXLSX(dados: IBulkAvailabilityResult[]) {
  try {
    const workbook = XLSX.utils.book_new();

    const exportData = dados.map((item) => ({
      CEP: item.cep || "",
      Número: item.numero || "",
      Vivo: formatOperadoraStatus(
        item.disponibilidade,
        item.encontrado_via_range,
        item.range_min,
        item.range_max,
      ),
      Claro: formatOperadoraStatus(
        item.availability_claro,
        item.encontrado_via_range_claro,
        item.range_min_claro,
        item.range_max_claro,
      ),
      TIM: formatOperadoraStatus(
        item.availability_tim,
        item.encontrado_via_range_tim,
        item.range_min_tim,
        item.range_max_tim,
      ),
      OI: formatOperadoraStatus(
        item.availability_oi,
        item.encontrado_via_range_oi,
        item.range_min_oi,
        item.range_max_oi,
      ),
      Sky: formatOperadoraStatus(
        item.availability_sky,
        item.encontrado_via_range_sky,
        item.range_min_sky,
        item.range_max_sky,
      ),
      NIO: formatOperadoraStatus(
        item.availability_nio,
        item.encontrado_via_range_nio,
        item.range_min_nio,
        item.range_max_nio,
      ),
      UF: item.uf || "",
      Cidade: item.cidade || "",
      Bairro: item.bairro || "",
      Logradouro: item.logradouro || "",
      "Endereço Completo": item.endereco_completo || "",
      Armário: item.armario || "",
      Tipo: item.tipo || "",
      Território: item.territorio || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Consulta Massa");

    const fileName = generateFileName();
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error("❌ Erro ao exportar dados:", error);
  }
}

function generateFileName(): string {
  const date = new Date().toISOString().split("T")[0];
  const time = new Date()
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "");

  return `consulta_massa_${date}_${time}.xlsx`;
}

export function useExportBulkAvailabilityCSVController() {
  const originalDados = useBulkAvailabilityStore(
    (state) => state.originalDados,
  );
  const consultAvailabilityService = new ConsultAvailabilityService();

  const exportMutation = useMutation({
    mutationFn: async () => {
      // Faz nova requisição com limite igual ao total de dados para obter todos os resultados
      const response = await consultAvailabilityService.consultAvailabilityBulk(
        originalDados,
        originalDados.length, // limite = quantidade total de CEPs/números
        1, // página 1
      );
      return response.resultados;
    },
    onSuccess: (data) => {
      exportToCSV(data);
    },
  });

  return {
    exportDataCSV: () => exportMutation.mutate(),
    isExportingCSV: exportMutation.isPending,
    exportErrorCSV: exportMutation.error,
  };
}

function exportToCSV(dados: IBulkAvailabilityResult[]) {
  try {
    const exportData = dados.map((item) => ({
      CEP: item.cep || "",
      Número: item.numero || "",
      Vivo: formatOperadoraStatus(
        item.disponibilidade,
        item.encontrado_via_range,
        item.range_min,
        item.range_max,
      ),
      Claro: formatOperadoraStatus(
        item.availability_claro,
        item.encontrado_via_range_claro,
        item.range_min_claro,
        item.range_max_claro,
      ),
      TIM: formatOperadoraStatus(
        item.availability_tim,
        item.encontrado_via_range_tim,
        item.range_min_tim,
        item.range_max_tim,
      ),
      OI: formatOperadoraStatus(
        item.availability_oi,
        item.encontrado_via_range_oi,
        item.range_min_oi,
        item.range_max_oi,
      ),
      Sky: formatOperadoraStatus(
        item.availability_sky,
        item.encontrado_via_range_sky,
        item.range_min_sky,
        item.range_max_sky,
      ),
      NIO: formatOperadoraStatus(
        item.availability_nio,
        item.encontrado_via_range_nio,
        item.range_min_nio,
        item.range_max_nio,
      ),
      UF: item.uf || "",
      Cidade: item.cidade || "",
      Bairro: item.bairro || "",
      Logradouro: item.logradouro || "",
      "Endereço Completo": item.endereco_completo || "",
      Armário: item.armario || "",
      Tipo: item.tipo || "",
      Território: item.territorio || "",
    }));

    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(","),
      ...exportData.map((row) =>
        headers
          .map((header) => {
            const value = (row as any)[header];
            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(","),
      ),
    ].join("\n");
    const BOM = "\uFEFF";
    const finalContent = BOM + csvContent;

    const blob = new Blob([finalContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = generateFileNameCSV();
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("❌ Erro ao exportar dados CSV:", error);
  }
}

function generateFileNameCSV(): string {
  const date = new Date().toISOString().split("T")[0];
  const time = new Date()
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "");

  return `consulta_massa_${date}_${time}.csv`;
}
