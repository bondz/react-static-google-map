import PathStrategy from '../path';
import NativeStrategy from './nativeStrategy';
import FetchStrategy from './fetchStrategy';

const directionStrategy = ({ props, type: { defaultProps } }, parentProps) => {
  const {
    baseURL,
    requestStrategy,
    origin,
    destination,
    apiKey,
    waypoints,
    avoid,
    mode,
    transitMode,
    transitRoutingPreference,

    weight,
    color,
    fillcolor,
    geodesic,

    ...rest
  } = props;

  // Use the parent's API key if one isn't set here.
  const key = apiKey ? apiKey : parentProps.apiKey;

  const data = {
    key,
    baseURL,
    origin,
    destination,
    waypoints,
    avoid,
    mode,
    transitMode,
    transitRoutingPreference,
    ...rest,
  };

  let pathPromise;

  if (typeof requestStrategy !== 'string') {
    pathPromise = requestStrategy(data);
  } else {
    switch (requestStrategy) {
      case 'native':
        pathPromise = NativeStrategy(data);
        break;
      case 'fetch':
        pathPromise = FetchStrategy(data);
        break;
      default:
        throw new Error('Specify a Request strategy to get directions from');
    }
  }

  return pathPromise.then(path =>
    PathStrategy({
      props: { weight, color, fillcolor, geodesic, points: `enc:${path}` },
      type: { defaultProps },
    })
  );
};

export default directionStrategy;
