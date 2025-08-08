import { useThemeColors } from "@/hooks/useThemeColors";
import { ConnectorStatus, ConnectorType } from "@/types/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ConnectorIconProps {
  type: ConnectorType;
  status: ConnectorStatus;
  size: number;
}

function ConnectorIcon(props: ConnectorIconProps) {
  const themeColors = useThemeColors();

  let color = themeColors.primaryGreen;

  if (props.status === "IN USE") {
    color = themeColors.inUse;
  } else if (props.status === "UNAVAILABLE") {
    color = themeColors.primaryRed;
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
