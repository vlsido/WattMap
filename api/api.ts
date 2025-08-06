import { Location, Session } from "@/types/common";

/**
 *
 * This is your computer ip, localhost won't work
 */
export const serverIp = "192.168.0.101";

export const vehicle = {
  name: "Tesla Model 3",
  batteryCapacityKWh: 40,
  consumptionKWhPer100Km: 17,
  maxChargeKW: 50,
  initialSoC: 40,
};

export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await fetch(`http://${serverIp}:4000/api/v1/locations`);

    if (!response.ok) {
      throw new Error("Error fetching locations");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function startCharging(
  vehicleId: string,
  chargerId: string,
  connectorId: number,
  socStart: number,
): Promise<string> {
  try {
    const response = await fetch(
      `http://${serverIp}:4000/api/v1/charging/start`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId,
          chargerId,
          connectorId,
          socStart,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to start charging session");
    }

    const data = await response.json();

    return data.sessionId;
  } catch (error) {
    throw error;
  }
}

export async function stopCharging(sessionId: string | null) {
  try {
    if (sessionId === null) {
      throw new Error("No session");
    }
    const response = await fetch(
      `http://${serverIp}:4000/api/v1/charging/stop`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to stop charging session");
    }
  } catch (error) {
    throw error;
  }
}

export async function getSessionState(
  sessionId: string | null,
): Promise<Session> {
  try {
    if (sessionId === null) {
      throw new Error("No session");
    }

    const response = await fetch(
      `http://${serverIp}:4000/api/v1/charging/session/${sessionId}`,
    );

    if (!response.ok) {
      const data = await response.json();

      throw new Error("Error getting session state:", data.error);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
