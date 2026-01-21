import { capitalizeWords } from "@/utils/capitaliWords";
import { formatCEP } from "@/utils/formatCEP";
import { Button, ConfigProvider } from "antd";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ResultAvailability() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const params = useParams();
  const numeroFromUrl = params.numero;
  return (
    <>
      <div className="px-6 md:px-10 lg:px-14">
        <div className="flex  gap-8 justify-between mt-6 mb-2">
          <h1 className="text-[22px]  pl-16">Resultado de Disponibilidade</h1>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  activeShadow: "none",
                },
                Select: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  activeOutlineColor: "none",
                },
                DatePicker: {
                  hoverBorderColor: "#8b8e8f",
                  activeBorderColor: "#8b8e8f",
                  colorPrimaryBorder: "#8b8e8f",
                  colorPrimary: "#8b8e8f",
                },
                Button: {
                  colorBorder: "#8b8e8f",
                  colorText: "#8b8e8f",
                  colorPrimary: "#8b8e8f",
                  colorPrimaryHover: "#a3a3a3",
                },
              },
            }}
          >
            <div className=" self-end">
              <Button
                type="default"
                variant="solid"
                className=""
                onClick={() => {
                  navigate("/admin/consulta-disponibilidade");
                }}
              >
                <ArrowLeft size={14} />
                <span>Voltar para consulta</span>
              </Button>
            </div>
          </ConfigProvider>
        </div>

        {/* Seção de Disponibilidade */}
        <div className="text-[14px] bg-white p-4 gap-2 rounded-[4px] border-1 border-neutral-200 w-full mb-4">
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
                    <img
                      className="h-5 mx-auto"
                      src="/assets/sky.svg"
                      alt="Sky"
                    />
                  </td>
                  <td className="text-center p-2 border-b border-gray-200">
                    <img
                      className="h-4 mx-auto"
                      src="/assets/nio.svg"
                      alt="NIO"
                    />
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
                    {data.availability === null ||
                    data.availability === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {data.availability_claro === null ||
                    data.availability_claro === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability_claro ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {data.availability_tim === null ||
                    data.availability_tim === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability_tim ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {data.availability_oi === null ||
                    data.availability_oi === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability_oi ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {data.availability_sky === null ||
                    data.availability_sky === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability_sky ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {data.availability_nio === null ||
                    data.availability_nio === undefined ? (
                      <span className="text-[12px] text-neutral-500">-</span>
                    ) : data.availability_nio ? (
                      data.encontrado_via_range ? (
                        <div
                          className="h-3 w-3 bg-yellow-500 rounded-full mx-auto"
                          title="Disponível via range"
                        ></div>
                      ) : (
                        <div
                          className="h-3 w-3 bg-green-500 rounded-full mx-auto"
                          title="Disponível"
                        ></div>
                      )
                    ) : (
                      <div
                        className="h-3 w-3 bg-red-500 rounded-full mx-auto"
                        title="Indisponível"
                      ></div>
                    )}
                  </td>
                </tr>

                {/* Linha 2: Range de números */}
                {data.encontrado_via_range === 1 && (
                  <tr>
                    <td className="text-[12px] w-32 font-medium text-gray-600 p-2 pr-4">
                      Range de números
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability_claro
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability_tim
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability_oi
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability_sky
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                    <td className="text-center p-2 text-[11px] ">
                      {data.availability_nio
                        ? `${data.range_min} - ${data.range_max}`
                        : "-"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {data.disponibilidade === true && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 text-[14px] bg-white p-4 gap-2 rounded-[4px] border-1 border-neutral-200 w-full ">
            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">Armário:</span>
              <span className="w-full ">
                {capitalizeWords(data.dados.ARMARIO)}
              </span>
            </div>
            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">Tipo:</span>
              <span className="w-full ">
                {capitalizeWords(data.dados.TIPO)}
              </span>
            </div>
            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">CEP:</span>
              <span className="w-full ">{formatCEP(data.dados.CEP)}</span>
            </div>
            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">
                Logradouro:
              </span>
              <span className="w-full ">
                {capitalizeWords(data.dados.LOGRADOURO)}
              </span>
            </div>
            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">Número:</span>
              {data.dados.NUM === numeroFromUrl ? (
                <span className="w-full ">
                  {capitalizeWords(data.dados.NUM)}
                </span>
              ) : (
                <p>
                  Dentro do range de {data.range_min}/{data.range_max}{" "}
                </p>
              )}
            </div>

            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">Bairro:</span>
              <span className="w-full ">
                {capitalizeWords(data.dados.BAIRRO)}
              </span>
            </div>

            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">Cidade:</span>
              <span className="w-full ">
                {capitalizeWords(data.dados.CIDADE)}
              </span>
            </div>

            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">
                Território:
              </span>
              <span className="w-full ">
                {capitalizeWords(data.dados.TERRITORIO)}
              </span>
            </div>

            <div className="flex my-1 gap-2">
              <span className="text-gray-500  whitespace-nowrap">UF:</span>
              <span className="w-full ">{data.dados.UF}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
