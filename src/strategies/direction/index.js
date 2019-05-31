import invariant from 'invariant';

import PathStrategy from '../path';
import NativeStrategy from './nativeStrategy';
import FetchStrategy from './fetchStrategy';

let googleCalls = 0;

const memoize = (func) => {
  const cache = {};
  return function(){
    console.log(...arguments)
    const key = JSON.stringify(arguments[0].props);
    console.log({ key })
    if (cache[key]){
      console.log('returned from cache')
      console.log(typeof cache[key])
      console.log(cache[key])
      return cache[key];
    }
    else{
      const val = func.apply(null, arguments).then(path => {
        // When this finally resolves, set the value of the cache to
        // the string path result. Subsequent renders will return a string
        // and use the base compnent instead of the Async component
        cache[key] = path;
        console.log('After Resolve: ', typeof cache[key])
        console.log('After Resolve: ', cache[key])
      });
      // Return the pending promise immedietly and the StaticGoogleMap
      // usage of the Async component will eventually handle it because
      // this funciton returned a Promise. This piece of the code prevents
      // multiple calls to google on each render, but does not solve the
      // "flash" of the Async component.
      cache[key] = val;
      console.log('Before Resolve: ', typeof cache[key])
      console.log('Before Resolve: ', cache[key])
      console.log('cache set')
      return val;
    }
  }
}

const directionStrategy = memoize(({ props, type: { defaultProps } }, parentProps) => {
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
    // cache,
    // onCacheUpdate,

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

  // let cacheKey;

  // if (cache) {
  //   cacheKey = JSON.stringify(data);
  //   const path = cache[cacheKey];
  //   if (path) {
  //     console.log('returned from cache')
  //     return PathStrategy({
  //       props: { weight, color, fillcolor, geodesic, points: `enc:${path}` },
  //       type: { defaultProps },
  //     });
  //   }
  // }

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

  return pathPromise.then(path => {
    googleCalls = googleCalls + 1;
    console.log(googleCalls)
    // if (cache && cacheKey) {
    //   console.log('cache set')
    //   cache[cacheKey] = path;
    //   if (onCacheUpdate) {
    //     onCacheUpdate({ ...cache })
    //   }
    // }
    return PathStrategy({
      props: { weight, color, fillcolor, geodesic, points: `enc:${path}` },
      type: { defaultProps },
    })
  });
});

export default directionStrategy;
