import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import ConnectorView from "./ConnectorView";
import { Connector } from "@/types/common";

interface ChargerProps {
  id: string;
  connectors: Connector[];
  selectedChargerId?: string;
  selectedConnectorId?: number;
  onSelectConnector: (connector: Connector) => void;
}

function ChargerView(props: ChargerProps) {
  return (
    <View style={[styles.gap, styles.charger]}>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <ThemedText>Charger ID:</ThemedText>
        <ThemedText>{props.id}</ThemedText>
      </View>
      {props.connectors
        .sort((a, b) => {
          if (a.status === "AVAILABLE" && b.status !== "AVAILABLE") return -1;
          if (a.status !== "AVAILABLE" && b.status === "AVAILABLE") return 1;
          return 0;
        })
        .map((connector) => (
          <ConnectorView
            key={connector.id}
            id={connector.id}
            connectorType={connector.connectorType}
            status={connector.status}
            priceInCentsPerKWh={connector.priceInCentsPerKWh}
            maxPowerOutputKW={connector.maxPowerOutputKW}
            isSelected={
              props.selectedChargerId === props.id &&
              props.selectedConnectorId === connector.id
            }
            onSelect={props.onSelectConnector}
          />
        ))}
    </View>
  );
}

export default ChargerView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    gap: 10,
  },
  charger: {
    backgroundColor: "#63937790",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
});
