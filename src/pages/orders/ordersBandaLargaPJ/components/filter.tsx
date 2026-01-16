import { Controller } from "react-hook-form";
import { Input, Button, Tooltip, ConfigProvider, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ptBR from "antd/es/locale/pt_BR";
import { PatternFormat, PatternFormatProps } from "react-number-format";
interface FiltroPedidosPJFormProps {
  control: any;
  handleSubmit: any;
  onSubmit: any;
  onClear: () => void;
  selectedRowKeys: any;
  statusOptions?: string[];
  orderBandaLargaPJ: any;
}

const CNPJInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="##.###.###/####-##"
    customInput={Input}
    placeholder="CNPJ"
    size="middle"
  />
);
export function FiltroOrdersBandaLargaPJForm({
  control,
  handleSubmit,
  onSubmit,
  onClear,
}: FiltroPedidosPJFormProps) {
  const { RangePicker } = DatePicker;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onClear}
      className="flex min-w-[200px] flex-wrap gap-2 mt-4"
    >
      <div className="flex gap-2 flex-wrap">
        <ConfigProvider
          locale={ptBR}
          theme={{
            components: {
              Input: {
                hoverBorderColor: "#116e75",
                activeBorderColor: "#116e75",
                activeShadow: "none",
              },
              Select: {
                hoverBorderColor: "#116e75",
                activeBorderColor: "#116e75",
                activeOutlineColor: "none",
              },
              DatePicker: {
                hoverBorderColor: "#116e75",
                activeBorderColor: "#116e75",
                colorPrimaryBorder: "#116e75",
                colorPrimary: "#116e75",
              },
            },
          }}
        >
          <Controller
            control={control}
            name="ordernumber"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="ID do Pedido"
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
            name="cnpj"
            render={({ field }) => (
              <CNPJInput
                {...field}
                format="##.###.###/####-##"
                value={field.value || ""}
                onValueChange={(values) => field.onChange(values.value)}
                style={{ width: "150px" }}
              />
            )}
          />
          <Controller
            control={control}
            name="razaosocial"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Razão Social"
                value={field.value || ""}
                onChange={field.onChange}
                style={{
                  width: "170px",
                }}
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
        </ConfigProvider>
      </div>

      <div className="flex gap-2 items-center">
        <Tooltip
          title="Filtrar"
          placement="top"
          styles={{ body: { fontSize: "11px" } }}
        >
          <Button
            variant="outlined"
            color="cyan"
            style={{
              width: "24px",
              height: "28px",
              color: "#116e75",
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
            color="cyan"
            onClick={onClear}
            style={{ width: "24px", height: "28px", color: "#116e75" }}
          >
            X
          </Button>
        </Tooltip>
        {/* <Tooltip
          title="Download"
          placement="top"
          styles={{ body: { fontSize: "11px" } }}
        >
          <Button
            variant="outlined"
            color="cyan"
            style={{ width: "24px", height: "28px", color: "#116e75" }}
            onClick={() => handleExportXLSX(orderBandaLargaPJ, selectedRowKeys)}
          >
            <DownloadOutlined />
          </Button>
        </Tooltip> */}
      </div>
    </form>
  );
}
