import { Tooltip } from "antd";

export default function AvailabilityTable({ localData }: { localData: any }) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-100 mb-3 rounded-[4px] p-3 w-full">
      {/* Tabela de Disponibilidade */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header com logos */}
          <thead>
            <tr>
              <td className="w-24"></td>{" "}
              {/* Coluna vazia para os labels laterais */}
              <td className="text-center p-2 border-b border-gray-200">
                <img
                  src="/assets/vivo.png"
                  alt="Vivo"
                  className="max-h-6 mx-auto"
                />
              </td>
              <td className="text-center p-2 border-b border-gray-200">
                <img
                  className="h-8 w-8 mx-auto"
                  src="/assets/claro.png"
                  alt="Claro"
                />
              </td>
              <td className="text-center p-2 border-b border-gray-200">
                <img
                  className="h-7 w-14 mx-auto"
                  src="/assets/tim.svg"
                  alt="TIM"
                />
              </td>
              <td className="text-center p-2 border-b border-gray-200">
                <img
                  className="h-8=9 w-9 mx-auto"
                  src="/assets/oi.svg"
                  alt="OI"
                />
              </td>
              <td className="text-center p-2 border-b border-gray-200">
                <img className="h-5 mx-auto" src="/assets/sky.svg" alt="Sky" />
              </td>
              <td className="text-center p-2 border-b border-gray-200">
                <img className="h-4 mx-auto" src="/assets/nio.svg" alt="NIO" />
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Linha 1: Disponibilidade */}
            <tr>
              <td className="text-[12px] font-medium text-gray-600 p-2 pr-4">
                Disponibilidade
              </td>
              <td className="text-center p-2">
                {localData.availability === null ||
                localData.availability === undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability ? (
                  localData.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
              <td className="text-center p-2">
                {localData.availability_operadoras?.claro?.availability ===
                  null ||
                localData.availability_operadoras?.claro?.availability ===
                  undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability_operadoras?.claro?.availability ? (
                  localData.availability_operadoras?.claro
                    ?.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
              <td className="text-center p-2">
                {localData.availability_operadoras?.tim?.availability ===
                  null ||
                localData.availability_operadoras?.tim?.availability ===
                  undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability_operadoras?.tim?.availability ? (
                  localData.availability_operadoras?.tim
                    ?.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
              <td className="text-center p-2">
                {localData.availability_operadoras?.oi?.availability === null ||
                localData.availability_operadoras?.oi?.availability ===
                  undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability_operadoras?.oi?.availability ? (
                  localData.availability_operadoras?.oi
                    ?.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
              <td className="text-center p-2">
                {localData.availability_operadoras?.sky?.availability ===
                  null ||
                localData.availability_operadoras?.sky?.availability ===
                  undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability_operadoras?.sky?.availability ? (
                  localData.availability_operadoras?.sky
                    ?.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
              <td className="text-center p-2">
                {localData.availability_operadoras?.nio?.availability ===
                  null ||
                localData.availability_operadoras?.nio?.availability ===
                  undefined ? (
                  <span className="text-[12px] text-neutral-500">-</span>
                ) : localData.availability_operadoras?.nio?.availability ? (
                  localData.availability_operadoras?.nio
                    ?.encontrado_via_range ? (
                    <Tooltip
                      title="Disponível (via range numérico)"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto  cursor-pointer"></div>{" "}
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Disponível"
                      placement="top"
                      styles={{ body: { fontSize: "12px" } }}
                    >
                      <div className="h-3 w-3 bg-green-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Indisponível"
                    placement="top"
                    styles={{ body: { fontSize: "12px" } }}
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mx-auto cursor-pointer"></div>{" "}
                  </Tooltip>
                )}
              </td>
            </tr>

            {/* Linha 2: Range de números */}
            {(localData.encontrado_via_range ||
              localData.availability_operadoras?.claro?.encontrado_via_range ||
              localData.availability_operadoras?.tim?.encontrado_via_range ||
              localData.availability_operadoras?.oi?.encontrado_via_range ||
              localData.availability_operadoras?.sky?.encontrado_via_range ||
              localData.availability_operadoras?.nio?.encontrado_via_range) && (
              <tr>
                <td className="text-[12px] w-30 font-medium text-gray-600 p-2 pr-4">
                  Range numérico
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability && localData.encontrado_via_range
                    ? `${localData.range_min} - ${localData.range_max}`
                    : "-"}
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability_operadoras?.claro?.availability &&
                  localData.availability_operadoras?.claro?.encontrado_via_range
                    ? `${localData.availability_operadoras.claro.range_min} - ${localData.availability_operadoras.claro.range_max}`
                    : "-"}
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability_operadoras?.tim?.availability &&
                  localData.availability_operadoras?.tim?.encontrado_via_range
                    ? `${localData.availability_operadoras.tim.range_min} - ${localData.availability_operadoras.tim.range_max}`
                    : "-"}
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability_operadoras?.oi?.availability &&
                  localData.availability_operadoras?.oi?.encontrado_via_range
                    ? `${localData.availability_operadoras.oi.range_min} - ${localData.availability_operadoras.oi.range_max}`
                    : "-"}
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability_operadoras?.sky?.availability &&
                  localData.availability_operadoras?.sky?.encontrado_via_range
                    ? `${localData.availability_operadoras.sky.range_min} - ${localData.availability_operadoras.sky.range_max}`
                    : "-"}
                </td>
                <td className="text-center p-2 text-[11px] ">
                  {localData.availability_operadoras?.nio?.availability &&
                  localData.availability_operadoras?.nio?.encontrado_via_range
                    ? `${localData.availability_operadoras.nio.range_min} - ${localData.availability_operadoras.nio.range_max}`
                    : "-"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
