type NotificationManagerListener = (
  message: string,
  type: "INFO" | "ERROR",
  ms?: number,
) => void;

class NotificationManager {
  private listeners = new Set<NotificationManagerListener>();

  showUserMessage(text: string, type: "INFO" | "ERROR", ms?: number) {
    for (const listener of this.listeners) {
      listener(text, type, ms);
    }
  }

  subscribe(listener: NotificationManagerListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const notificationManager = new NotificationManager();
