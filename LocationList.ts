import { LatLng } from "react-native-maps";

type Country = "Estonia" | "Latvia" | "Lithuania";

export type ConnectorType = "CHAdeMO" | "Type 2" | "Combo CCS";

export type ConnectorStatus = "AVAILABLE" | "UNAVAILABLE" | "IN USE";

interface Connector {
  connectorType: ConnectorType;
  status: ConnectorStatus;
  maxPowerOutputKW: number;
}

export interface Location {
  id: number;
  name: string;
  country: Country;
  address: string;
  point: LatLng;
  connectors: Connector[];
}

export const locationList: Location[] = [
  {
    id: 1,
    name: "Väike Rannavärav 6",
    country: "Estonia",
    address: "Väike Rannavärav 6, Tallinn, Estonia",
    point: { latitude: 59.441466, longitude: 24.751405 },
    connectors: [
      {
        connectorType: "CHAdeMO",
        status: "AVAILABLE",
        maxPowerOutputKW: 50,
      },
      {
        connectorType: "CHAdeMO",
        status: "AVAILABLE",
        maxPowerOutputKW: 50,
      },
    ],
  },
  {
    id: 2,
    name: "Tallinn Vabaduse väljak P-1",
    country: "Estonia",
    address: "Vabaduse väljak 9, Tallinn, Estonia",
    point: { latitude: 59.433014, longitude: 24.744803 },
    connectors: [
      {
        connectorType: "CHAdeMO",
        status: "UNAVAILABLE",
        maxPowerOutputKW: 50,
      },
      {
        connectorType: "CHAdeMO",
        status: "IN USE",
        maxPowerOutputKW: 50,
      },
      {
        connectorType: "Type 2",
        status: "AVAILABLE",
        maxPowerOutputKW: 47,
      },
    ],
  },
];
