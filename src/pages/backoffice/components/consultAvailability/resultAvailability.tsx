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

        <div className="text-[14px] bg-white p-4 gap-2 rounded-[4px] border-1 border-neutral-200 w-full mb-4">
          <div className="flex my-1 gap-2">
            <span className="text-gray-500 whitespace-nowrap">
              {data.disponibilidade === true || data.availability === true
                ? "Há planos disponíveis nesse endereço."
                : "Não há planos disponíveis nesse endereço."}{" "}
            </span>
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
