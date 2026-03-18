import type { DirectionProps } from "../types";

type DirectionComponent = ((props: DirectionProps) => null) & {
  defaultProps: Partial<DirectionProps>;
};

const Direction: DirectionComponent = (() => null) as unknown as DirectionComponent;

Direction.defaultProps = {
  baseURL: "https://maps.googleapis.com/maps/api/directions/json",
  travelMode: "driving",
  requestStrategy: "native",
  weight: 5,
  geodesic: false,
};

export default Direction;
