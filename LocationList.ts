interface Point {
  latitude: number;
  longitude: number;
}

type Country = "Estonia" | "Latvia" | "Lithuania";

type Connector = "CHAdeMO" | "Type 2" | "Combo CCS";

type StationStatus = "AVAILABLE" | "UNAVAILABLE" | "IN USE";

interface Station {
  connectorType: Connector;
  status: StationStatus;
}

interface Location {
  id: number;
  name: string;
  country: Country;
  address: string;
  point: Point;
  stations: Station[];
}

export const locationList: Location[] = [
  {
    id: 1,
    name: "Väike Rannavärav 6",
    country: "Estonia",
    address: "Väike Rannavärav 6, Tallinn, Estonia",
    point: { latitude: 59.441466, longitude: 24.751405 },
    stations: [
      {
        connectorType: "CHAdeMO",
        status: "AVAILABLE",
      },
    ],
  },
  {
    id: 2,
    name: "Tallinn Vabaduse väljak P-1",
    country: "Estonia",
    address: "Vabaduse väljak 9, Tallinn, Estonia",
    point: { latitude: 59.433014, longitude: 24.744803 },
    stations: [
      {
        connectorType: "CHAdeMO",
        status: "UNAVAILABLE",
      },
    ],
  },
];
