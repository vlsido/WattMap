import { notificationManager } from "@/managers/NotificationManager";
import { useCallback, useEffect, useRef, useState } from "react";
import { NotificationMessage } from "./types";
import Notification from "./Notification/Notification";

function NotificationHelper() {
  const [message, setMessage] = useState<NotificationMessage[]>([]);
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((text, type, ms?) => {
      setMessage((prev) => [
        ...prev,
        { id: Math.random().toString(36), text, type, ms: ms ?? 5000 },
      ]);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    if (message.at(0)) {
      timeoutId.current = setTimeout(() => {
        setMessage((prev) => prev.slice(1));
      }, message[0].ms);
    }
  }, [message[0]]);

  const handleOnClose = useCallback(() => {
    clearTimeout(timeoutId.current);
    setMessage((prev) => prev.slice(1));
  }, []);

  return (
    <>
      {message[0] && (
        <Notification
          key={message[0].id}
          id={message[0].id}
          text={message[0].text}
          type={message[0].type}
          ms={message[0].ms}
          onClose={handleOnClose}
        />
      )}
    </>
  );
}

export default NotificationHelper;
