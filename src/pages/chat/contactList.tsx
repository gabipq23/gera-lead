// import { List, Empty } from "antd";
// import { useState } from "react";
// import { ContactButton } from "./contactButton";

// export default function ContactsList() {
//   // Simular dados
//   const chats = [
//     {
//       id: "1",
//       prospect: {
//         platformData: {
//           name: "João Silva",
//           picture: `/assets/anonymous_avatar.png`,
//         },
//         lastInteraction: new Date().toISOString(),
//         conversationCount: 3,
//         data: { temperatura_lead: 4, conversa_pausada: false },
//       },
//       messages: [
//         {
//           id: "1",
//           sender: "prospect",
//           data: {
//             content: "Olá, gostaria de mais informações sobre o produto",
//           },
//           read: false,
//         },
//       ],
//     },
//     {
//       id: "2",
//       prospect: {
//         platformData: {
//           name: "Ana Paula",
//           picture: `/assets/anonymous_avatar.png`,
//         },
//         lastInteraction: new Date().toISOString(),
//         conversationCount: 3,
//         data: { temperatura_lead: 2, conversa_pausada: false },
//       },
//       messages: [
//         {
//           id: "2",
//           sender: "prospect",
//           data: {
//             content: "Você poderia falar mais sobre os preços?",
//           },
//           read: false,
//         },
//       ],
//     },
//   ];

//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const [favorites, setFavorites] = useState<string[]>([]);

//   const handleSelectChat = (chatId: any) => {
//     setSelectedChatId(chatId);
//   };

//   const handleToggleFavorite = (chatId: any) => {
//     setFavorites((prev) =>
//       prev.includes(chatId)
//         ? prev.filter((id) => id !== chatId)
//         : [...prev, chatId],
//     );
//   };

//   return (
//     <List
//       dataSource={chats}
//       renderItem={(chat) => (
//         <ContactButton
//           key={chat.id}
//           chat={chat}
//           isSelected={selectedChatId === chat.id}
//           isFavorite={favorites.includes(chat.id)}
//           onClick={() => handleSelectChat(chat.id)}
//           onFavorite={() => handleToggleFavorite(chat.id)}
//         />
//       )}
//       locale={{ emptyText: <Empty description="Nenhum chat encontrado" /> }}
//     />
//   );
// }
