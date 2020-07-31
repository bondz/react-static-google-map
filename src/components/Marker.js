import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes.string,
  iconURL: PropTypes.string,
  label: PropTypes.string,
  anchor: PropTypes.string,
  location: PropTypes.any.isRequired,
};

const defaultProps = {
  size: 'normal',
};

const groupPropTypes = {
  size: PropTypes.oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes.string,
  iconURL: PropTypes.string,
  label: PropTypes.string,
  anchor: PropTypes.string,
};

const Marker = () => null;
Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

const MarkerGroup = () => null;
MarkerGroup.propTypes = groupPropTypes;
MarkerGroup.defaultProps = defaultProps;

Marker.Group = MarkerGroup;
export default Marker;
