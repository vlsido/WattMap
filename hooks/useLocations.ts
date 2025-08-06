import { fetchLocations } from "@/api/api";
import { Location } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });
}
