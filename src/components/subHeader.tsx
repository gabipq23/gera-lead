import { useAuthContext } from "@/pages/login/context";
import { LogoutOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";

export default function SubHeader() {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<string>("leads-pj");
  const { logout } = useAuthContext();
  // const user = JSON.parse(localStorage.getItem("vivoGold@user") || "null");
  // const userID = user?.id;

  const handleLogOut = useCallback(() => {
    logout();
    navigate("/admin");
  }, [logout, navigate]);

  // const managementMenuItems: MenuProps["items"] = [
  //   {
  //     key: "usuarios",
  //     label: (
  //       <span
  //         onClick={() => {
  //           setSelectedLink("usuarios");
  //           navigate("/admin/usuarios");
  //         }}
  //       >
  //         Usuários
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "representantes",
  //     label: (
  //       <span
  //         onClick={() => {
  //           setSelectedLink("representantes");
  //           navigate("/admin/representantes");
  //         }}
  //       >
  //         Representantes
  //       </span>
  //     ),
  //   },
  // ];

  const ordersMenuItems: MenuProps["items"] = [
    {
      key: "leads-pj",
      label: (
        <span
          onClick={() => {
            setSelectedLink("leads-pj");
            navigate(`/admin/leads-pj`);
          }}
        >
          Leads PJ
        </span>
      ),
    },
    {
      key: "leads-pf",
      label: (
        <span
          onClick={() => {
            setSelectedLink("leads-pf");
            navigate(`/admin/leads-pf`);
          }}
        >
          Leads PF
        </span>
      ),
    },

    // {
    //   key: "pedido-vivo-tech-pj",
    //   label: (
    //     <span
    //       onClick={() => {
    //         setSelectedLink("pedido-vivo-tech-pj");
    //         navigate(`/admin/pedido-vivo-tech-pj`);
    //       }}
    //     >
    //       Pedido Vivo Tech PJ
    //     </span>
    //   ),
    // },
  ];

  return (
    <div className="relative z-2">
      <div className="">
        <div className="flex  justify-between items-center p-2 bg-[#b3b3b3] px-6 md:px-10 lg:px-14">
          <div className="flex items-center gap-8">
            <Dropdown menu={{ items: ordersMenuItems }} placement="bottom">
              <a
                onClick={(e) => e.preventDefault()}
                className={`text-[14px] cursor-pointer text-neutral-200 hover:text-neutral-50 ${
                  selectedLink === "leads-pj" || selectedLink === "leads-pf"
                    ? "font-bold text-neutral-100"
                    : ""
                }`}
              >
                Leads
              </a>
            </Dropdown>
            <a
              onClick={() => {
                setSelectedLink("consulta-disponibilidade");
                navigate(`/admin/consulta-disponibilidade  `);
              }}
              className={`text-[14px] cursor-pointer text-neutral-200 hover:text-neutral-50 ${
                selectedLink === "consulta-disponibilidade"
                  ? "font-bold text-neutral-100"
                  : ""
              }`}
            >
              Disponibilidade
            </a>
            <a
              onClick={() => {
                setSelectedLink("chats");
                navigate(`/admin/chats`);
              }}
              className={`text-[14px] cursor-pointer text-neutral-200 hover:text-neutral-50 ${
                selectedLink === "chats" ? "font-bold text-neutral-100" : ""
              }`}
            >
              Chat
            </a>
            {/* <Dropdown menu={{ items: managementMenuItems }} placement="bottom">
              <a className="text-[14px] cursor-pointer text-neutral-300 hover:text-neutral-100">
                Gestão
              </a>
            </Dropdown> */}
          </div>

          <div className="flex items-center gap-4">
            {/* <Button
              type="link"
              onClick={() => navigate(`/admin/perfil-usuario/${userID}`)}
              style={{ padding: 0 }}
              className="logout-btn "
            >
              <UserOutlined style={{ color: "#e4e0e0" }} />
            </Button> */}
            <Button
              type="link"
              onClick={handleLogOut}
              style={{ padding: 0 }}
              className="logout-btn "
            >
              <LogoutOutlined style={{ color: "#e4e0e0" }} />
            </Button>
            <style>
              {`
              .logout-btn:hover .anticon {
                color: #ffffff !important;
                font-size: 15px;
              }
            
              `}
            </style>
          </div>
        </div>
      </div>
    </div>
  );
}
