import invariant from 'invariant';

import PathStrategy from '../path';
import NativeStrategy from './nativeStrategy';
import FetchStrategy from './fetchStrategy';

export const memoizeDirectionStrategy = (directionStrategy, cache = {}) => {
  return function() {
    const componentProps = arguments[0].props;
    const parentProps = arguments[1];
    const key = JSON.stringify(componentProps);
    if (cache[key]){
      return cache[key];
    } else {
      const promise = directionStrategy.apply(null, arguments).then(strat => {
        // When this finally resolves, set the value of the cache to
        // the string path result. Subsequent renders will return a string
        // and use the base component instead of the Async component and
        // not cause the flash
        cache[key] = strat;
        if (parentProps.onCacheUpdate) {
          parentProps.onCacheUpdate({ ...cache });
        }
        return strat;
      });
      // Return the pending promise immedietly and the StaticGoogleMap
      // usage of the Async component will eventually handle it because
      // this funciton returned a Promise. This piece of the code prevents
      // multiple calls to google on each render, but does not solve the
      // "flash" of the Async component.
      cache[key] = promise;
      return promise;
    }
  }
}

const directionStrategy = ({ props, type: { defaultProps } }, parentProps) => {
  const {
    baseURL,
    requestStrategy,
    origin,
    destination,
    apiKey,
    waypoints,
    avoid,
    travelMode,
    transitMode,
    transitRoutingPreference,

    weight,
    color,
    fillcolor,
    geodesic,

    ...rest
  } = props;

  invariant(origin, 'Origin prop is required');
  invariant(destination, 'Destination prop is required');

  // Use the parent's API key if one isn't set here.
  const key = apiKey ? apiKey : parentProps ? parentProps.apiKey : '';

  const data = {
    key,
    baseURL,
    origin,
    destination,
    waypoints,
    avoid,
    travelMode,
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
