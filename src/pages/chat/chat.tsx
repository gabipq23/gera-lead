// import { Splitter, Input, Select, Button, Tooltip, ConfigProvider } from "antd";
// import { StarOutlined, FireOutlined } from "@ant-design/icons";
// import { Hand } from "lucide-react";
// import ContactsList from "./contactList";

// const { Option } = Select;

// export function Chat() {
//   return (
//     <div className="h-[calc(100vh-150px)] px-2">
//       <ConfigProvider
//         theme={{
//           token: {
//             colorPrimary: "#a3a3a3",
//           },
//         }}
//       >
//         <Splitter className="h-full shadow-lg">
//           <Splitter.Panel defaultSize="18%" min="16%" max="22%">
//             <div className="p-4 flex flex-col">
//               {/* Filtros */}
//               <div>
//                 <Button type="text" className="float-right">
//                   <p className="text-[12px]">Limpar Filtros</p>
//                 </Button>
//               </div>

//               <div className="flex gap-2 mb-4">
//                 <Select placeholder="Bot" className="flex-1">
//                   <Option value="bot1">Bot 1</Option>
//                 </Select>

//                 <Input placeholder="Buscar..." className="flex-1" />
//               </div>

//               <div className="flex gap-2 mb-4">
//                 <Select placeholder="Plataforma" className="flex-1">
//                   <Option value="whatsapp">WhatsApp</Option>
//                 </Select>

//                 <div className="text-[#a3a3a3] flex gap-1">
//                   <Tooltip title="Favoritos">
//                     <Button icon={<StarOutlined />} />
//                   </Tooltip>

//                   <Tooltip title="Hot Lead">
//                     <Button icon={<FireOutlined />} />
//                   </Tooltip>

//                   <Tooltip title="Ajuda">
//                     <Button icon={<Hand size={16} />} />
//                   </Tooltip>
//                 </div>
//               </div>

//               {/* Lista de chats com scroll */}
//               <div className="h-[calc(100%-120px)] overflow-y-auto">
//                 {/* {/* Seus ContactButton aqui  */}
//               </div>
//             </div>
//             <div>
//               <ContactsList />
//             </div>
//           </Splitter.Panel>

//           {/* Conteúdo principal */}
//           <Splitter.Panel>{/* Seu ChatView aqui */}</Splitter.Panel>
//         </Splitter>
//       </ConfigProvider>
//     </div>
//   );
// }
