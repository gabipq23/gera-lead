import { ConfigProvider, Modal, Form } from "antd";
import { useState, useEffect } from "react";
import { OrderBandaLargaPJDisplay } from "./BLPJDisplay";
import { OrderBandaLargaPJEdit } from "./BLPJEdit";
import { OrderBandaLargaPJ } from "@/interfaces/bandaLargaPJ";
import dayjs from "dayjs";

import ConfirmDeleteModal from "@/components/confirmDeleteModal";
import FooterButtons from "@/components/orders/footerButtons";
import { generatePDF } from "../controllers/exportPDF";
import { Thermometer } from "lucide-react";

export function OrderBandaLargaPJDetailsModal({
  isModalOpen,
  closeModal,
  selectedId,
  updateOrderData,
  removeBandaLargaPJOrder,
  isRemoveBandaLargaPJOrderFetching,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedId: OrderBandaLargaPJ | null;
  updateOrderData?: (params: { id: number; data: any }) => void;
  updateDataIdVivoAndConsultorResponsavel: any;
  removeBandaLargaPJOrder: any;
  isRemoveBandaLargaPJOrderFetching: boolean;
  changeBandaLargaPJOrderStatus: any;
  statusOptions: string[] | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState<OrderBandaLargaPJ | null>(null);
  const [form] = Form.useForm();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedId) {
      setLocalData(selectedId);
    }
  }, [selectedId]);

  const handlePlanChange = (planId: number) => {
    console.log("oi", planId);
  };

  useEffect(() => {
    if (localData && isEditing) {
      form.setFieldsValue({
        plan_id: localData.plan?.id || "",
        plan_name: localData.plan?.name || "",
        plan_price: localData.plan?.price?.toString() || "",
        fullname: localData.fullname,

        cnpj: localData.cnpj,
        razaosocial: localData.razaosocial,

        phone: localData.phone,
        phoneAdditional: localData.phoneAdditional,

        address: localData.address,
        addressnumber: localData.addressnumber,
        addresscomplement: localData.addresscomplement,
        addresslot: localData.addresslot,
        addressblock: localData.addressblock,
        buildingorhouse: localData.buildingorhouse,
        district: localData.district,
        city: localData.city,
        state: localData.state,
        cep: localData.cep,
        addressreferencepoint: localData.addressreferencepoint,

        installation_preferred_date_one:
          localData.installation_preferred_date_one
            ? dayjs(localData.installation_preferred_date_one, "DD/MM/YYYY")
            : null,

        installation_preferred_date_two:
          localData.installation_preferred_date_two
            ? dayjs(localData.installation_preferred_date_two, "DD/MM/YYYY")
            : null,

        installation_preferred_period_one:
          localData.installation_preferred_period_one,
        installation_preferred_period_two:
          localData.installation_preferred_period_two,
        dueday: localData.dueday,
        accept_offers: localData.accept_offers,
        terms_accepted: localData.terms_accepted,
        status: localData.status,
        url: localData.url,
        manager: {
          cpf: localData.manager?.cpf,
          email: localData.manager?.email,
          name: localData.manager?.name,
          phone: localData.manager?.phone,
          hasLegalAuthorization: localData.manager?.hasLegalAuthorization,
        },
      });
    }
  }, [localData, isEditing, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (values.installation_preferred_date_one) {
        values.installation_preferred_date_one = dayjs(
          values.installation_preferred_date_one,
        ).format("DD/MM/YYYY");
      }
      if (values.installation_preferred_date_two) {
        values.installation_preferred_date_two = dayjs(
          values.installation_preferred_date_two,
        ).format("DD/MM/YYYY");
      }
      if (updateOrderData && localData && localData.id) {
        const formattedData = {
          pedido: { ...values },
        };

        await updateOrderData({
          id: localData.id,
          data: formattedData,
        });

        setLocalData((prev) => (prev ? { ...prev, ...values } : null));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro ao validar campos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  if (!localData) return null;

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBorderColor: "#8b8e8f",
            activeBorderColor: "#8b8e8f",
            activeShadow: "none",
            colorBorder: "#bfbfbf",
            colorTextPlaceholder: "#666666",
          },
          Select: {
            hoverBorderColor: "#8b8e8f",
            activeBorderColor: "#8b8e8f",
            activeOutlineColor: "none",
            colorBorder: "#bfbfbf",
            colorTextPlaceholder: "#666666",
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
      <Modal
        centered
        title={
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
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={1200}
      >
        <div className="text-[#666666] mt-4 h-[460px] overflow-y-auto scrollbar-thin">
          {isEditing ? (
            <OrderBandaLargaPJEdit
              localData={localData}
              form={form}
              onPlanChange={handlePlanChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              loading={loading}
            />
          ) : (
            <OrderBandaLargaPJDisplay localData={localData} />
          )}
        </div>
        <div className="mt-4 flex gap-4 justify-end">
          {!isEditing && (
            <FooterButtons
              onGeneratePDF={() => generatePDF(localData)}
              onEdit={() => setIsEditing(true)}
              onDelete={() => setShowDeleteModal(true)}
            />
          )}
        </div>
      </Modal>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          removeBandaLargaPJOrder({ id: selectedId?.id });
          closeModal();
        }}
        isLoading={isRemoveBandaLargaPJOrderFetching}
        message="Tem certeza que deseja excluir o lead"
        itemToDelete={selectedId?.ordernumber || selectedId?.id}
      />
    </ConfigProvider>
  );
}
