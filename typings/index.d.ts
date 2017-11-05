import { Component, ReactElement, ReactNode, ReactType } from 'react';

declare class StaticGoogleMap extends Component<
  StaticGoogleMap.GoogleMapImageProps
> {}
declare class Marker extends Component<StaticGoogleMap.Marker> {}
declare class Path extends Component<StaticGoogleMap.Path> {}
declare class Direction extends Component<StaticGoogleMap.Direction> {}

declare namespace StaticGoogleMap {
  interface GoogleMapImageProps {
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
     * Specified the center of the image
     *
     * @type {string}
     * @memberof GoogleMapImageProps
     */
    center?: string;

    /**
     * DSPecifies the zoom level of the image
     *
     * @type {(string | number)}
     * @memberof GoogleMapImageProps
     * @default 0
     */
    zoom?: string | number;

    visible?: string;

    style?: string;

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
  }

  type locationType =
    | string
    | number
    | { lat: string | number; lng: string | number }
    | Array<string | number | { lat: string | number; lng: string | number }>;

  interface MarkerGroup {
    size: 'tiny' | 'mid' | 'small' | 'normal';
    color:
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
    iconURL: string;
    label: string;
    anchor:
      | 'left'
      | 'right'
      | 'center'
      | 'topleft'
      | 'topright'
      | 'bottomleft'
      | 'bottomright'
      | string;
  }

  interface Marker extends MarkerGroup {
    location: locationType;
  }

  interface PathGroup {
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
  }

  interface Path extends PathGroup {
    points: locationType;
  }

  interface Direction extends PathGroup {
    origin: string | { lat: string | number; lng: string | number };
    destination: string | { lat: string | number; lng: string | number };
    apiKey: string;
    waypoints: any;
    avoid: 'tolls' | 'highways' | 'ferries' | 'indoor';
    travelMode: 'driving' | 'walking' | 'bicycling' | 'transit';
    transitMode: 'bus' | 'subway' | 'train' | 'tram' | 'rail';
    transitRoutingPreference: 'less_walking' | 'fewer_transfers';
    requestStrategy: 'fetch' | 'native' | RequestStrategy;
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
}
export { StaticGoogleMap, Marker, Path, Direction };
