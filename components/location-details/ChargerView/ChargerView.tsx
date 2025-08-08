import { StyleSheet, Text, View } from "react-native";
import ConnectorView from "../ConnectorView/ConnectorView";
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
      <View style={[styles.textContainer]}>
        <Text style={styles.defaultSemiBold}>Charger ID</Text>
        <Text style={styles.defaultSemiBold}>{props.id}</Text>
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
  textContainer: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: 600,
    color: "white",
  },
  gap: {
    gap: 10,
  },
  charger: {
    backgroundColor: "#639377",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
});
