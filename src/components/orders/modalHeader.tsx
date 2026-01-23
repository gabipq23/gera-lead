import { Thermometer } from "lucide-react";

export default function ModalHeader({ localData }: { localData: any }) {
  return (
    <>
      <div className="flex  flex-col md:flex-row lg:flex-row gap-4 mg:items-start lg:items-start justify-between">
        <span className="flex items-center gap-1">
          <span style={{ color: "#252525" }}>Lead:</span>{" "}
          <p className="text-neutral-700">{localData.id}</p>
        </span>{" "}
        <span className="flex items-center gap-1 mr-8">
          <span className="flex items-center " style={{ color: "#252525" }}>
            <Thermometer /> Temperatura:{" "}
          </span>{" "}
          <p className="text-neutral-700">4</p>
        </span>
      </div>
    </>
  );
}
