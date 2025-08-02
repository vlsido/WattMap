import { ConnectorType, ConnectorStatus } from "@/LocationList";
import { IconSymbol } from "../ui/IconSymbol";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ConnectorIconProps {
  type: ConnectorType;
  status: ConnectorStatus;
}

function ConnectorIcon(props: ConnectorIconProps) {
  let color = "#1EE78D";

  if (props.status === "IN USE") {
    color = "blue";
  } else if (props.status === "UNAVAILABLE") {
    color = "red";
  }

  switch (props.type) {
    case "Type 2":
      return (
        <MaterialCommunityIcons name="ev-plug-type2" color={color} size={28} />
      );
    case "CHAdeMO":
      return (
        <MaterialCommunityIcons
          name="ev-plug-chademo"
          color={color}
          size={28}
        />
      );
    case "Combo CCS":
      return (
        <MaterialCommunityIcons name="ev-plug-ccs2" color={color} size={28} />
      );
  }
}

export default ConnectorIcon;
