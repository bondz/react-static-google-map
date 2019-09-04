import { Children } from 'react';
import MarkerStrategy from './marker';

const markerGroupStrategy = (
  { props, type: { defaultProps } },
  parentProps
) => {
  const { size, color, label, anchor, iconURL, children, scale } = props;

  const location = Children.map(children, child => child.props.location);

  return MarkerStrategy({
    props: { size, color, label, anchor, iconURL, location, scale },
    type: { defaultProps },
  });
};

export default markerGroupStrategy;
