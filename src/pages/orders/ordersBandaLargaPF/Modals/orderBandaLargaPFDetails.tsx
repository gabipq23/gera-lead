import { ConfigProvider, Modal, Form } from "antd";
import { useState, useEffect } from "react";
import { OrderBandaLargaPF } from "@/interfaces/bandaLargaPF";
import { OrderBandaLargaPFDisplay } from "./BLPFDisplay";
import { OrderBandaLargaPFEdit } from "./BLPFEdit";

import dayjs from "dayjs";
import ConfirmDeleteModal from "@/components/confirmDeleteModal";
import FooterButtons from "@/components/orders/footerButtons";
import { generatePDF } from "../controllers/exportPDF";
export function OrderBandaLargaPFDetailsModal({
  isModalOpen,
  closeModal,
  selectedId,
  removeOrderData,
  isRemoveOrderFetching,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedId: OrderBandaLargaPF | null;
  updateOrderData?: (params: { id: number; data: any }) => void;
  removeOrderData: any;
  isRemoveOrderFetching: boolean;
  updateDataIdVivoAndConsultorResponsavel: any;
  changeBandaLargaOrderStatus: any;

  statusOptions: string[] | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [localData, setLocalData] = useState<OrderBandaLargaPF | null>(null);
  const [form] = Form.useForm();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedId) {
      setLocalData(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    if (localData && isEditing) {
      form.setFieldsValue({
        plan_id: localData.plan?.id || "",
        plan_name: localData.plan?.name || "",
        plan_price: localData.plan?.price?.toString() || "",
        fullname: localData.fullname,
        cpf: localData.cpf,
        birthdate: localData.birthdate,
        motherfullname: localData.motherfullname,
        phone: localData.phone,
        phoneAdditional: localData.phoneAdditional,
        email: localData.email,
        address: localData.address,
        addressnumber: localData.addressnumber,
        addresscomplement: localData.addresscomplement,
        addresslot: localData.addresslot,
        addressFloor: localData.addressFloor,
        addressblock: localData.addressblock,
        buildingorhouse: localData.buildingorhouse,
        district: localData.district,
        city: localData.city,
        state: localData.state,
        cep: localData.cep,
        addressreferencepoint: localData.addressreferencepoint,
        cep_unico: localData.cep_unico,
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
        url: localData.url,
        status: localData.status,
      });
    }
  }, [localData, isEditing, form]);

  const handleSave = async () => {
    console.log("handleSave called");
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

            colorPrimaryHover: "#8a7e7f",
          },
        },
      }}
    >
      <Modal
        centered
        title="Lead"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={1200}
      >
        <div className="text-[#666666] mt-4 h-[460px] overflow-y-auto scrollbar-thin">
          {isEditing ? (
            <OrderBandaLargaPFEdit
              localData={localData}
              form={form}
              // onPlanChange={handlePlanChange}
              // planOptions={planOptions}
              handleSave={handleSave}
              handleCancel={handleCancel}
              // loading={loading}
            />
          ) : (
            <OrderBandaLargaPFDisplay localData={localData} />
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
          removeOrderData({ id: selectedId?.id });
          closeModal();
        }}
        isLoading={isRemoveOrderFetching}
        message="Tem certeza que deseja excluir o lead"
        itemToDelete={selectedId?.ordernumber || selectedId?.id}
      />
    </ConfigProvider>
  );
}
