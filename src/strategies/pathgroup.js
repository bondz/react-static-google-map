import { Children } from 'react';
import PathStrategy from './path';

const pathGroupStrategy = ({ props, type: { defaultProps } }, parentProps) => {
  const { weight, color, fillcolor, geodesic, children } = props;

  const points = Children.map(children, child => child.props.points);

  return PathStrategy({
    props: { weight, color, fillcolor, geodesic, points },
    type: { defaultProps },
  });
};

export default pathGroupStrategy;
