import { Children } from "react";
import PathStrategy from "./path";
import type { PathGroupProps, LocationType, StrategyElement } from "../types";

const pathGroupStrategy = ({ props }: StrategyElement<PathGroupProps>): string => {
  const { weight, color, fillcolor, geodesic, children } = props;

  const points = Children.map(children, (child) => child!.props.points);

  return PathStrategy({
    props: { weight, color, fillcolor, geodesic, points: (points ?? []) as LocationType },
    type: { defaultProps: {} },
  });
};

export default pathGroupStrategy;
