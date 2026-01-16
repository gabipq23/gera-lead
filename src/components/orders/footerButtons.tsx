import { Button } from "antd";

interface FooterButtonsProps {
  onGeneratePDF: () => void;
  onEdit: () => void;
  onDelete: () => void;

  editText?: string;
  deleteText?: string;
}

export default function FooterButtons({
  onEdit,
  onDelete,

  editText = "Editar",
  deleteText = "Deletar pedido",
}: FooterButtonsProps) {
  return (
    <>
      <div className="mt-4 flex gap-4 justify-end">
        <Button
          onClick={onEdit}
          color="cyan"
          variant="outlined"
          style={{
            color: "#116e75",
            fontSize: "14px",
          }}
        >
          {editText}
        </Button>
        <Button
          onClick={onDelete}
          color="red"
          variant="outlined"
          style={{
            color: "red",
            fontSize: "14px",
          }}
        >
          {deleteText}
        </Button>
      </div>
    </>
  );
}
