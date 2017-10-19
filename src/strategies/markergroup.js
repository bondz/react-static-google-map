import { Children } from 'react';
import MarkerStrategy from './marker';

const markerGroupStrategy = (
  { props, type: { defaultProps } },
  parentProps
) => {
  const { size, color, label, anchor, iconURL, children } = props;

  const location = Children.map(children, child => child.props.location);

  return MarkerStrategy({
    props: { size, color, label, anchor, iconURL, location },
    type: { defaultProps },
  });
};

export default markerGroupStrategy;
