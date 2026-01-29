import { useNotifications } from "@/hooks/use-notifications";
import { Tooltip } from "./common/tooltip";
import { Button } from "./ui/button";
import { Bell, BellRing, MessageCircle, TriangleAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useCallback, useState } from "react";
import { INotification } from "@/interfaces/notification";
import { useNavigate } from "react-router-dom";

type NotificationsGroup = "read" | "unread";

export function Notifications() {
  const navigate = useNavigate();
  const { notifications, hasNewNotifications, setHasNewNotifications } =
    useNotifications();
  const [isNotificationsListOpen, setIsNotificationsListOpen] = useState(false);

  const [notificationsByRead, setNotificationsByRead] =
    useState<NotificationsGroup>("unread");

  const onClickNotification = useCallback((notificiation: INotification) => {
    if (notificiation.type === "NewSupportMessage") {
      navigate("/support");
    }

    if (notificiation.type === "NewMessage") {
      navigate("/chats");
    }

    if (notificiation.type === "NewProspect") {
      navigate("/chats");
    }

    if (notificiation.type === "NewHotLead") {
      navigate("/chats");
    }
  }, []);

  function handleShowNotificationsByRead() {
    setNotificationsByRead((prev) => (prev === "read" ? "unread" : "read"));
  }

  function handleOpenNotificationsList(isOpen: boolean) {
    setIsNotificationsListOpen(isOpen);
    if (isOpen) setHasNewNotifications(false);
  }

  const notificationsList = notifications.filter((notification) =>
    notificationsByRead === "unread"
      ? !notification.acceptedAt
      : notification.acceptedAt
  );

  return (
    <DropdownMenu
      open={isNotificationsListOpen}
      onOpenChange={handleOpenNotificationsList}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant={isNotificationsListOpen ? "outline" : "ghost"}
          size="icon"
        >
          <Tooltip info="Notificação" className="text-slate-200">
            {!hasNewNotifications ? (
              <Bell size={16} />
            ) : (
              <div className="relative items-center">
                <span className="absolute h-[70%] w-[70%] animate-ping rounded-full bg-sky-400 opacity-75 top-0 left-0 right-0 bottom-0 m-auto"></span>
                <BellRing size={16} />
              </div>
            )}
          </Tooltip>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dark:bg-background">
        <ul className="space-y-2 min-w-[20vw] max-w-[30vw] max-h-[40vh] overflow-y-auto p-2">
          {notificationsList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full pt-2">
              <p className="text-xl font-bold">Nenhuma notificação</p>
              <div className="">
                <Bell size={20} />
              </div>
            </div>
          )}
          {notificationsList.map((notification) => {
            const notificationDate = new Date(
              notification.createdAt
            ).toLocaleString("pt-BR", {
              timeStyle: "medium",
              dateStyle: "short",
            });

            return (
              <DropdownMenuItem
                onClick={() => onClickNotification(notification)}
                key={notification.id}
                className="border items-start rounded p-2 flex flex-col gap-2 pr-4 hover:dark:bg-[#1d1d1f]  dark:bg-[#121213] cursor-pointer"
              >
                <div className="flex gap-2 items-start max-w-100">
                  <button className="flex gap-2 items-center cursor-pointer">
                    {notification.type === "NewSupportMessage" ? (
                      <TriangleAlert size={18} color="red" />
                    ) : (
                      <MessageCircle
                        size={18}
                        className="fill-blue-800 stroke-blue-800"
                      />
                    )}
                    <p className="text-sm text-start">{notification.content}</p>
                  </button>
                </div>
                <div className="flex w-full justify-end RightSlot">
                  <p className="text-xs text-slate-400">{notificationDate}</p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </ul>
        <div className="flex justify-between gap-2">
          <Button
            variant="link"
            className="text-xs ml-auto dark:text-slate-300"
            onClick={handleShowNotificationsByRead}
          >
            {notificationsByRead === "read" ? "Voltar" : "Histórico"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
