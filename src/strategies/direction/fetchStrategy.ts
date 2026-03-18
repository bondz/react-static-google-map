import type { RequestStrategyOptions, LatLng } from "../../types";

function fetchStrategy(data: RequestStrategyOptions): Promise<string> {
  const { baseURL, key, origin, destination } = data;

  const options: RequestInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  let originLocation: string;
  let destinationLocation: string;

  if (typeof origin === "object" && (origin as LatLng).lat && (origin as LatLng).lng) {
    const o = origin as LatLng;
    originLocation = `${o.lat},${o.lng}`;
  } else {
    originLocation = origin as string;
  }

  if (
    typeof destination === "object" &&
    (destination as LatLng).lat &&
    (destination as LatLng).lng
  ) {
    const d = destination as LatLng;
    destinationLocation = `${d.lat},${d.lng}`;
  } else {
    destinationLocation = destination as string;
  }

  const URL = `${baseURL}?origin=${originLocation}&destination=${destinationLocation}&key=${key}`;

  return fetch(URL, options)
    .then((res) => res.json())
    .then((res) => res.routes[0].overview_polyline.points);
}

export default fetchStrategy;
