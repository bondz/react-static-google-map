import type { ReactElement } from "react";

export type LatLng = { lat: string | number; lng: string | number };

export type LocationType = string | number | LatLng | Array<string | number | LatLng>;

export type CacheType = { [key: string]: string | Promise<string> };

export type RequestStrategyOptions = {
  key: string;
  baseURL: string;
  origin: string | LatLng;
  destination: string | LatLng;
  waypoints?: unknown;
  avoid?: string;
  travelMode: string;
  transitMode?: string;
  transitRoutingPreference?: string;
  [index: string]: unknown;
};

export type RequestStrategy = (data: RequestStrategyOptions) => Promise<string>;

export interface MarkerProps {
  size?: "tiny" | "mid" | "small" | "normal";
  color?: string;
  iconURL?: string;
  label?: string;
  scale?: "1" | "2" | "4" | 1 | 2 | 4;
  anchor?: string;
  location: LocationType;
}

export type MarkerGroupProps = Omit<MarkerProps, "location"> & {
  children?: ReactElement<MarkerProps> | ReactElement<MarkerProps>[];
};

export interface PathProps {
  weight?: string | number;
  color?: string;
  fillcolor?: string;
  geodesic?: boolean;
  points: LocationType;
}

export type PathGroupProps = Omit<PathProps, "points"> & {
  children?: ReactElement<PathProps> | ReactElement<PathProps>[];
};

export interface DirectionProps {
  baseURL?: string;
  origin: string | LatLng;
  destination: string | LatLng;
  apiKey?: string;
  waypoints?: unknown;
  avoid?: string;
  travelMode?: "driving" | "walking" | "bicycling" | "transit";
  transitMode?: "bus" | "subway" | "train" | "tram" | "rail";
  transitRoutingPreference?: "less_walking" | "fewer_transfers";
  requestStrategy?: "fetch" | "native" | RequestStrategy;
  weight?: string | number;
  color?: string;
  fillcolor?: string;
  geodesic?: boolean;
}

export interface StaticGoogleMapProps {
  as?: React.ElementType;
  onGenerate?: (url: string) => void;
  rootURL?: string;
  size: string;
  scale?: "1" | "2" | "4" | 1 | 2 | 4;
  format?: "png" | "png8" | "png32" | "gif" | "jpg" | "jpg-baseline";
  maptype?: "roadmap" | "satellite" | "terrain" | "hybrid";
  language?: string;
  region?: string;
  visible?: string;
  style?: string;
  mapId?: string;
  center?: string;
  zoom?: string | number;
  client?: string;
  apiKey?: string;
  signature?: string;
  channel?: string;
  cache?: boolean | CacheType;
  onCacheUpdate?: (cache: CacheType) => void;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/** The shape strategies receive: a React element destructured as { props, type } */
export interface StrategyElement<P> {
  props: P;
  type: { defaultProps?: Partial<P> };
}
