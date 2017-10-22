function nativeStrategy(data) {
  const { origin, destination, mode } = data;

  let originLocation;
  let destinationLocation;

  if (typeof origin === 'object' && origin.lat && origin.lng) {
    originLocation = new google.maps.LatLng(origin);
  } else {
    originLocation = origin;
  }

  if (typeof destination === 'object' && destination.lat && destination.lng) {
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
        travelMode: mode.toUpperCase(),
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result.routes[0].overview_polyline);
        }

        reject(status);
      }
    );
  });
}

export default nativeStrategy;
