import type { MarkerProps, MarkerGroupProps } from "../types";

type MarkerComponent = ((props: MarkerProps) => null) & {
  defaultProps: Partial<MarkerProps>;
  Group: ((props: MarkerGroupProps) => null) & { defaultProps: Partial<MarkerGroupProps> };
};

const Marker: MarkerComponent = (() => null) as unknown as MarkerComponent;
Marker.defaultProps = {
  size: "normal",
};

const MarkerGroup = (() => null) as unknown as MarkerComponent["Group"];
MarkerGroup.defaultProps = {
  size: "normal",
};

Marker.Group = MarkerGroup;
export default Marker;
