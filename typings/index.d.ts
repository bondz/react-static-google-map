import { Component, FunctionComponent } from 'react';

declare namespace ReactStaticGoogleMap {
  interface GoogleMapImageProps
    extends Omit<React.HTMLProps<unknown>, 'size' | 'style' | 'src'> {
    /**
     * Any element that accepts a 'src' attribute
     *
     * @type {*}
     * @memberof GoogleMapImageProps
     * @default img
     */
    as?: any;

    /**
     * A callback function that is called with the generated URL
     *
     * @memberof GoogleMapImageProps
     */
    onGenerate?: (url: string) => void;

    /**
     * The dimensions of the image in pixels
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    size: string;

    /**
     * The scale of the image
     *
     * @type {('1' | '2' | '4' | 1 | 2 | 4)}
     * @memberof GoogleMapImageProps
     * @default 1
     */
    scale?: '1' | '2' | '4' | 1 | 2 | 4;

    /**
     * The format of the image to return
     *
     * @type {('png' | 'png8' | 'png32' | 'gif' | 'jpg' | 'jpg-baseline')}
     * @memberof GoogleMapImageProps
     * @default png
     */
    format?: 'png' | 'png8' | 'png32' | 'gif' | 'jpg' | 'jpg-baseline';

    /**
     * The type of map to return
     *
     * @type {('roadmap' | 'satellite' | 'terrain' | 'hybrid')}
     * @memberof GoogleMapImageProps
     * @default roadmap
     */
    maptype?: 'roadmap' | 'satellite' | 'terrain' | 'hybrid';

    /**
     * The language to use for the text on the map
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     * @default en
     */
    language?: string;

    region?: string;

    /**
     * Specifies the center of the image
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    center?: string;

    /**
     * Specifies the zoom level of the image
     *
     * @type {(string | number)}
     * @memberof GoogleMapImageProps
     * @default 0
     */
    zoom?: string | number;

    visible?: string;

    style?: string;

    mapId?: string;

    /**
     * Paths to show on the map
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    path?: string;

    /**
     * The ClientID for premium users
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    client?: string;

    /**
     * Your API key
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    apiKey?: string;

    /**
     * Digital signature
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    signature?: string;

    /**
     * Channel for premium users
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    channel?: string;

    /**
     * An object where each key is the JSON.stringify(props)
     * of the Direction component and each value is the
     * generated path of those props for the internal cache
     * to be initiated with. Can also be set to boolean if
     * no initial cache is given
     *
     * @type {boolean | object}
     * @memberof GoogleMapImageProps
     * @default true
     */
    cache?: boolean | cacheType;

    /**
     * A callback function that is called when a new entry
     * is added to the internal Direction cache
     *
     * @memberof GoogleMapImageProps
     */
    onCacheUpdate?: (cache: cacheType) => void;

    /**
     * The root url in which all params will be serialized and appended to.
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     * @default https://maps.googleapis.com/maps/api/staticmap
     */
    rootURL?: string;
  }

  type cacheType = boolean | { [stringProps: string]: string };

  type locationType =
    | string
    | number
    | { lat: string | number; lng: string | number }
    | Array<string | number | { lat: string | number; lng: string | number }>;

  interface MarkerProps {
    size?: 'tiny' | 'mid' | 'small' | 'normal';
    color?:
      | 'black'
      | 'brown'
      | 'green'
      | 'purple'
      | 'yellow'
      | 'blue'
      | 'gray'
      | 'orange'
      | 'red'
      | 'white'
      | number;
    iconURL?: string;
    label?: string;
    scale?: '1' | '2' | '4' | 1 | 2 | 4;
    anchor?:
      | 'left'
      | 'right'
      | 'center'
      | 'topleft'
      | 'topright'
      | 'bottomleft'
      | 'bottomright'
      | string;
    location: locationType;
  }

  type MarkerGroup = Omit<MarkerProps, 'location'>;

  interface PathProps {
    weight?: string | number;
    color?:
      | 'black'
      | 'brown'
      | 'green'
      | 'purple'
      | 'yellow'
      | 'blue'
      | 'gray'
      | 'orange'
      | 'red'
      | 'white'
      | string
      | number;
    fillcolor?: string;
    geodesic?: boolean;
    points: locationType;
  }

  type PathGroup = Omit<PathProps, 'points'>;

  interface DirectionProps extends PathGroup {
    origin: string | { lat: string | number; lng: string | number };
    destination: string | { lat: string | number; lng: string | number };
    apiKey?: string;
    waypoints?: any;
    avoid?: 'tolls' | 'highways' | 'ferries' | 'indoor';
    travelMode?: 'driving' | 'walking' | 'bicycling' | 'transit';
    transitMode?: 'bus' | 'subway' | 'train' | 'tram' | 'rail';
    transitRoutingPreference?: 'less_walking' | 'fewer_transfers';
    requestStrategy?: 'fetch' | 'native' | RequestStrategy;
  }

  type RequestStrategy = (data: RequestStrategyOptions) => Promise<string>;

  interface RequestStrategyOptions {
    baseURL: string;
    key: string;
    origin: string | { lat: string | number; lng: string | number };
    destination: string | { lat: string | number; lng: string | number };
    waypoints?: any;
    avoid?: 'tolls' | 'highways' | 'ferries' | 'indoor';
    mode: 'driving' | 'walking' | 'bicycling' | 'transit';
    transitMode?: 'bus' | 'subway' | 'train' | 'tram' | 'rail';
    transitRoutingPreference?: 'less_walking' | 'fewer_transfers';
    [index: string]: any;
  }

  class StaticGoogleMap extends Component<GoogleMapImageProps> {}

  const Marker: FunctionComponent<MarkerProps> & {
    Group: FunctionComponent<MarkerGroup>;
  };

  const Path: FunctionComponent<PathProps> & {
    Group: FunctionComponent<PathGroup>;
  };

  const Direction: FunctionComponent<DirectionProps>;
}

export = ReactStaticGoogleMap;
