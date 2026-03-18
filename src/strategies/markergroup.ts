import { Children } from "react";
import MarkerStrategy from "./marker";
import type { MarkerGroupProps, LocationType, StrategyElement } from "../types";

const markerGroupStrategy = ({ props }: StrategyElement<MarkerGroupProps>): string => {
  const { size, color, label, anchor, iconURL, children, scale } = props;

  const location = Children.map(children, (child) => child!.props.location);

  return MarkerStrategy({
    props: {
      size,
      color,
      label,
      anchor,
      iconURL,
      location: (location ?? []) as LocationType,
      scale,
    },
    type: { defaultProps: {} },
  });
};

export default markerGroupStrategy;
