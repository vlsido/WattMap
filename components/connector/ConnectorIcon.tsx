import { ConnectorStatus, ConnectorType } from "@/types/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ConnectorIconProps {
  type: ConnectorType;
  status: ConnectorStatus;
  size: number;
}

function ConnectorIcon(props: ConnectorIconProps) {
  let color = "#1EE78D";

  if (props.status === "IN USE") {
    color = "#B0A7FF";
  } else if (props.status === "UNAVAILABLE") {
    color = "#ED060C";
  }

  switch (props.type) {
    case "Type 2":
      return (
        <MaterialCommunityIcons
          name="ev-plug-type2"
          color={color}
          size={props.size}
        />
      );
    case "CHAdeMO":
      return (
        <MaterialCommunityIcons
          name="ev-plug-chademo"
          color={color}
          size={props.size}
        />
      );
    case "Combo CCS":
      return (
        <MaterialCommunityIcons
          name="ev-plug-ccs2"
          color={color}
          size={props.size}
        />
      );
  }
}

export default ConnectorIcon;
