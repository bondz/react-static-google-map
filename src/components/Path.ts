import type { PathProps, PathGroupProps } from "../types";

type PathComponent = ((props: PathProps) => null) & {
  defaultProps: Partial<PathProps>;
  Group: ((props: PathGroupProps) => null) & { defaultProps: Partial<PathGroupProps> };
};

const Path: PathComponent = (() => null) as unknown as PathComponent;
Path.defaultProps = {
  weight: 5,
  geodesic: false,
};

const PathGroup = (() => null) as unknown as PathComponent["Group"];
PathGroup.defaultProps = {
  weight: 5,
  geodesic: false,
};

Path.Group = PathGroup;
export default Path;
