import PropTypes from 'prop-types';

const propTypes = {
  baseURL: PropTypes.string,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  apiKey: PropTypes.string,
  waypoints: PropTypes.any,

  avoid: PropTypes.string,
  travelMode: PropTypes.oneOf(['driving', 'walking', 'bicycling', 'transit']),
  transitMode: PropTypes.oneOf(['bus', 'subway', 'train', 'tram', 'rail']),
  transitRoutingPreference: PropTypes.oneOf([
    'less_walking',
    'fewer_transfers',
  ]),
  requestStrategy: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['fetch', 'native']),
  ]).isRequired,

  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool,
};

const defaultProps = {
  baseURL: 'https://maps.googleapis.com/maps/api/directions/json',
  travelMode: 'driving',
  requestStrategy: 'native',

  weight: 5,
  geodesic: false,
};

const Direction = () => null;

Direction.propTypes = propTypes;
Direction.defaultProps = defaultProps;

export default Direction;
