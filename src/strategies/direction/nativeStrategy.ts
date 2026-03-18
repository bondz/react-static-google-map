import type { RequestStrategyOptions, LatLng } from "../../types";

declare const google: any;

function nativeStrategy(data: RequestStrategyOptions): Promise<string> {
  const { origin, destination, travelMode } = data;

  let originLocation: unknown;
  let destinationLocation: unknown;

  if (typeof origin === "object" && (origin as LatLng).lat && (origin as LatLng).lng) {
    originLocation = new google.maps.LatLng(origin);
  } else {
    originLocation = origin;
  }

  if (
    typeof destination === "object" &&
    (destination as LatLng).lat &&
    (destination as LatLng).lng
  ) {
    destinationLocation = new google.maps.LatLng(destination);
  } else {
    destinationLocation = destination;
  }

  const DirectionsService = new google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    DirectionsService.route(
      {
        origin: originLocation,
        destination: destinationLocation,
        travelMode: travelMode.toUpperCase(),
      },
      (result: any, status: string) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result.routes[0].overview_polyline);
        }

        reject(status);
      },
    );
  });
}

export default nativeStrategy;
