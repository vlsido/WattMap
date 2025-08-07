import { NotificationMessage } from "../types";
import ErrorCard from "./ErrorCard";
import InfoCard from "./InfoCard";

export interface NotificationCardProps extends NotificationMessage {
  onClose: (id: string) => void;
}

function Notification(props: NotificationCardProps) {
  switch (props.type) {
    case "INFO":
      return <InfoCard {...props} />;
    case "ERROR":
      return <ErrorCard {...props} />;
  }
}

export default Notification;
