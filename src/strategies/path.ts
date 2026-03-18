import { urlBuilder, locationBuilder } from "./utils";
import invariant from "invariant";
import type { PathProps, StrategyElement } from "../types";

const pathStrategy = ({ props }: StrategyElement<PathProps>): string => {
  const { weight, color, fillcolor, geodesic, points } = props;

  invariant(points, "Path expects a valid points prop");

  const urlParts: (string | null)[] = [];
  // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder("color", color, ":"));
  urlParts.push(urlBuilder("weight", weight, ":"));
  urlParts.push(urlBuilder("fillcolor", fillcolor, ":"));
  urlParts.push(urlBuilder("geodesic", geodesic, ":"));
  urlParts.push(urlBuilder("", locationBuilder(points), ""));

  const url = urlParts.filter((x) => x).join("%7C"); //|

  return `path=${url}`;
};

export default pathStrategy;
