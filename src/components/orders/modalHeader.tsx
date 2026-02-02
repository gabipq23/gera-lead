import { FireFromThermometer } from "../fire-from-thermometer";
import { Thermometer } from "../thermometer";

export default function ModalHeader({ localData }: { localData: any }) {
  return (
    <>
      <div className="flex  flex-col md:flex-row lg:flex-row gap-4 mg:items-start lg:items-start justify-between">
        <span className="flex items-center gap-1">
          <span style={{ color: "#252525" }}>Lead:</span>{" "}
          <p className="text-neutral-700">{localData.id}</p>
        </span>{" "}
        <div className="flex w-[340px] h-2 items-center justify-center gap-1 mr-8 mt-2">
          <span style={{ color: "#252525" }}>Temperatura:</span>{" "}
          <Thermometer min={0} max={5} value={5} />
          <FireFromThermometer
            value={Number(5)}
            max={5}
            percentage={100}
            showIcons={true}
          />
        </div>
      </div>
    </>
  );
}
