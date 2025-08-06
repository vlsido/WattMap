export type ConnectorType = "CHAdeMO" | "Type 2" | "Combo CCS";

export type ConnectorStatus = "AVAILABLE" | "UNAVAILABLE" | "IN USE";

export interface Connector {
  id: number;
  connectorType: ConnectorType;
  status: ConnectorStatus;
  maxPowerOutputKW: number;
  priceInCentsPerKWh: number;
}

export interface Charger {
  id: string;
  connectors: Connector[];
}

export interface Location {
  name: string;
  address: string;
  point: { latitude: number; longitude: number };
  chargers: Charger[];
}

export interface Session {
  sessionId: string;
  vehicleId: string;
  chargerId: string;
  connectorId: number;
  startTime: number;
  socStart: number;
  socCurrent: number;
  energyDelivered: number;
  price: number;
  charging: boolean;
}
