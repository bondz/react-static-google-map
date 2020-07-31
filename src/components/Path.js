import PropTypes from 'prop-types';

const propTypes = {
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool,
  points: PropTypes.any.isRequired,
};

const groupPropTypes = {
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool,
};

const defaultProps = {
  weight: 5,
  geodesic: false,
};

const Path = () => null;
Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

const PathGroup = () => null;
PathGroup.propsTypes = groupPropTypes;
PathGroup.defaultProps = defaultProps;

Path.Group = PathGroup;
export default Path;
