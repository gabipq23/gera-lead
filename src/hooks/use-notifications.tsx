import { useCallback, useEffect, useState } from "react";
import { notificationsSocket as socket } from "@/configs/socket";
import { AuthService } from "@/services/auth";
import { useAuthContext } from "@/contexts/auth-context";
import {
  INotificationSocket,
  INotificationType,
} from "@/interfaces/notification";
import { useChatStore } from "@/contexts/chat-context";
import { ILeadTemperatureSocket } from "@/interfaces/chat/chat";

const authService = new AuthService();

export const useNotifications = () => {
  const { user, notifications, addNotification } = useAuthContext();
  const {
    changeTemperature,
    pauseConversation,
    resumeConversation,
    // updateClientDailyStats,
  } = useChatStore();
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      addNotification({
        type:
          options?.tag === undefined
            ? "NewProspect"
            : (options.tag as INotificationType),
        content: options?.body || title,
        createdAt: new Date().toISOString(),
        acceptedAt: null,
        id: Math.random() * 999,
        userId: user?.id || "",
      });
      setHasNewNotifications(true);
    },
    [addNotification, user]
  );

  const onReceiveNotification = useCallback(
    ({ payload, to }: INotificationSocket) => {
      if (!user) return;
      if (to.includes(user.id)) {
        addNotification({
          type: payload.type,
          content: payload.content,
          createdAt: new Date().toISOString(),
          acceptedAt: null,
          id: Math.random() * 999,
          userId: user.id,
        });
        setHasNewNotifications(true);
      }
    },
    [user, addNotification]
  );

  const onNewTemperature = useCallback(
    (socketMessage: ILeadTemperatureSocket) => {
      changeTemperature(socketMessage.prospectId, socketMessage.temperature);
    },
    [changeTemperature]
  );

  const onPauseConversation = useCallback(
    (socketMessage: { prospectId: string }) => {
      pauseConversation(socketMessage.prospectId);
      console.log("onPauseConversation");
    },
    [pauseConversation]
  );

  const onResumeConversation = useCallback(
    (socketMessage: { prospectId: string }) => {
      resumeConversation(socketMessage.prospectId);
      console.log("resumeConversation");
    },
    [resumeConversation]
  );

  const onPauseConversationOnText = useCallback(
    (socketMessage: { prospectId: string }) => {
      pauseConversation(socketMessage.prospectId);
      console.log("onPauseConversationOnText");
    },
    [pauseConversation]
  );

  // const { selectedClient } = useAuthContext();

  // const onUpdateDailyStats = useCallback(
  //   (socketMessage: { clientID: string }) => {
  //     if (socketMessage.clientID === selectedClient?.id) {
  //       updateClientDailyStats(socketMessage.clientID);
  //       console.log("onDailyUpdates");
  //     }
  //   },
  //   [updateClientDailyStats, selectedClient]
  // );

  useEffect(() => {
    const auth = authService.getAuthToken();

    if (!user || !auth?.token) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      token: auth?.token,
    };

    socket.connect(); // Conecta o socket manualmente

    socket.on("connect", () => {
      console.log("Notifications socket conectado com sucesso!");

      // mensagem recebida
      socket.on("new-notification", onReceiveNotification);

      // atualização da temperatura_lead
      socket.on("temperature-update", onNewTemperature);

      // atualização pausar/retomar bot no botão
      socket.on("pause-conversation", onPauseConversation);
      socket.on("resume-conversation", onResumeConversation);

      // atualização pausar bot no input
      socket.on("conversation-paused", onPauseConversationOnText);

      // atualização do numero de prospects e hot leads do dia
      // socket.on("daily-stats", onUpdateDailyStats);
    });

    socket.on("connect_error", (error) => {
      console.error("Erro de conexão do Socket:", error);
    });

    return () => {
      socket.off("new-notification", onReceiveNotification);
      socket.off("temperature-update", onNewTemperature);
      socket.off("pause-conversation", onPauseConversation);
      socket.off("resume-conversation", onResumeConversation);
      socket.off("conversation-paused", onPauseConversationOnText);
      // socket.off("daily-stats", onUpdateDailyStats);
      socket.disconnect();
    };
  }, [
    user,
    onNewTemperature,
    onReceiveNotification,
    onPauseConversation,
    onResumeConversation,
    onPauseConversationOnText,
    // onUpdateDailyStats,
  ]);

  return {
    notifications,
    hasNewNotifications,
    setHasNewNotifications,
    pauseConversation,
    resumeConversation,
    showNotification,
  }; // Retorna o socket para que outros componentes possam usá-lo, se necessário
};
