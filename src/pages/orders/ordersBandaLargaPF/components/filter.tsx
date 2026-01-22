import { Controller, Control, UseFormHandleSubmit } from "react-hook-form";
import { Input, Button, Tooltip, ConfigProvider, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import ptBR from "antd/es/locale/pt_BR";
import { DatePicker } from "antd";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import dayjs from "dayjs";
import { BandaLargaFilters } from "@/interfaces/bandaLargaPF";

interface FiltroPedidosFormProps {
  control: Control<BandaLargaFilters>;
  handleSubmit: UseFormHandleSubmit<BandaLargaFilters>;
  onSubmit: (data: BandaLargaFilters) => void;
  onClear: () => void;
  selectedRowKeys: any;

  orderBandaLargaPF: any;
}

const CPFInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="###.###.###-##"
    customInput={Input}
    placeholder="CPF"
    size="middle"
  />
);
export function FiltroOrdersBandaLargaPFForm({
  control,
  handleSubmit,
  onSubmit,
  onClear,
}: FiltroPedidosFormProps) {
  const { RangePicker } = DatePicker;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onClear}
      className="flex min-w-[200px] flex-wrap gap-2 mt-4"
    >
      <ConfigProvider
        locale={ptBR}
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
        <div className="flex gap-2 flex-wrap">
          <Controller
            control={control}
            name="ordernumber"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="ID"
                value={field.value || ""}
                onChange={field.onChange}
                style={{
                  width: "115px",
                }}
                maxLength={13}
              />
            )}
          />

          <Controller
            control={control}
            name="availability"
            render={({ field }) => (
              <Select
                style={{ minWidth: "120px" }}
                placeholder="Disponibilidade"
                value={field.value || undefined}
                onChange={field.onChange}
                options={[
                  { value: true, label: "Disponível" },
                  { value: false, label: "Indisponível" },
                ]}
                allowClear
              />
            )}
          />
          <Controller
            control={control}
            name="availability"
            render={({ field }) => (
              <Select
                style={{ minWidth: "120px" }}
                placeholder="Provedor"
                value={field.value || undefined}
                onChange={field.onChange}
                options={[
                  { value: "Vivo", label: "Vivo" },
                  { value: "Claro", label: "Claro" },
                  { value: "Oi", label: "Oi" },
                  { value: "Tim", label: "Tim" },
                  { value: "Sky", label: "Sky" },
                ]}
                allowClear
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <CPFInput
                {...field}
                format="###.###.###-##"
                value={field.value || ""}
                onValueChange={(values) => field.onChange(values.value)}
                style={{ width: "150px" }}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Telefone"
                value={field.value || ""}
                onChange={field.onChange}
                style={{
                  width: "110px",
                }}
              />
            )}
          />

          {/* Período de datas: data_de (início) e data_ate (fim) */}
          <Controller
            control={control}
            name="data_de"
            render={({ field: fieldDe }) => (
              <Controller
                control={control}
                name="data_ate"
                render={({ field: fieldAte }) => (
                  <RangePicker
                    style={{
                      width: "215px",
                    }}
                    value={
                      fieldDe.value && fieldAte.value
                        ? [
                            fieldDe.value
                              ? dayjs(decodeURIComponent(fieldDe.value))
                              : null,
                            fieldAte.value
                              ? dayjs(decodeURIComponent(fieldAte.value))
                              : null,
                          ]
                        : [null, null]
                    }
                    format="DD/MM/YYYY"
                    onChange={(dates) => {
                      fieldDe.onChange(
                        dates && dates[0]
                          ? encodeURIComponent(
                              dates[0].startOf("day").format("YYYY-MM-DD"),
                            )
                          : null,
                      );
                      fieldAte.onChange(
                        dates && dates[1]
                          ? encodeURIComponent(
                              dates[1].endOf("day").format("YYYY-MM-DD"),
                            )
                          : null,
                      );
                    }}
                    allowClear
                    placeholder={["de", "até"]}
                  />
                )}
              />
            )}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Tooltip
            title="Filtrar"
            placement="top"
            styles={{ body: { fontSize: "11px" } }}
          >
            <Button
              variant="outlined"
              color="default"
              style={{
                width: "24px",
                height: "28px",
                color: "#8b8e8f",
              }}
              htmlType="submit"
            >
              <FilterOutlined />
            </Button>
          </Tooltip>

          <Tooltip
            title="Limpar filtro"
            placement="top"
            styles={{ body: { fontSize: "11px" } }}
          >
            <Button
              variant="outlined"
              color="default"
              style={{
                width: "24px",
                height: "28px",
                color: "#8b8e8f",
              }}
              onClick={onClear}
            >
              X
            </Button>
          </Tooltip>
        </div>
      </ConfigProvider>
    </form>
  );
}
