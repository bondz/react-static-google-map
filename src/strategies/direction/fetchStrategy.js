function fetchStrategy(data) {
  const { baseURL, key, origin, destination } = data;

  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };

  let originLocation;
  let destinationLocation;

  if (typeof origin === 'object' && origin.lat && origin.lng) {
    originLocation = `${origin.lat},${origin.lng}`;
  } else {
    originLocation = origin;
  }

  if (typeof destination === 'object' && destination.lat && destination.lng) {
    destinationLocation = `${destination.lat},${destination.lng}`;
  } else {
    destinationLocation = destination;
  }

  const URL = `${baseURL}?origin=${originLocation}&destination=${destinationLocation}&key=${key}`;

  return fetch(URL, options)
    .then(res => res.json())
    .then(res => res.routes[0].overview_polyline.points);
}

export default fetchStrategy
