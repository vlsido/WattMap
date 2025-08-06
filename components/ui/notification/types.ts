export interface NotificationMessage {
  id: string;
  text: string;
  type: "INFO" | "ERROR";
  /**
   * milliseconds
   */
  ms: number;
}
