'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var Async = _interopDefault(require('react-promise'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function urlBuilder(property, value, separator) {
  if (value) {
    return '' + property + separator + value;
  }

  return null;
}

function locationBuilder(location) {
  var urlParts = [];

  if (Array.isArray(location)) {
    var arrParts = location.map(function (val) {
      return locationBuilder(val);
    });
    urlParts.push.apply(urlParts, toConsumableArray(arrParts));
  }

  if (typeof location === 'string' || typeof location === 'number') {
    urlParts.push(location);
  }

  if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) === 'object' && location.lat && location.lng) {
    urlParts.push(location.lat + ',' + location.lng);
  }

  return urlParts.join('%7C'); // |
}

var markerStrategy = function markerStrategy(_ref, parentProps) {
  var props = _ref.props;
  var size = props.size,
      color = props.color,
      label = props.label,
      anchor = props.anchor,
      iconURL = props.iconURL,
      location = props.location;


  if (!location) {
    throw Error('Specify a valid location');
  }

  var urlParts = [];

  // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('size', size, ':'));
  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('label', label, ':'));
  urlParts.push(urlBuilder('anchor', anchor, ':'));
  urlParts.push(urlBuilder('icon', iconURL, ':'));
  urlParts.push(urlBuilder('', locationBuilder(location), ''));

  var url = urlParts.filter(function (x) {
    return x;
  }).join('%7C'); // |

  return 'markers=' + url;
};

var pathStrategy = function pathStrategy(_ref, parentProps) {
  var props = _ref.props;
  var weight = props.weight,
      color = props.color,
      fillcolor = props.fillcolor,
      geodesic = props.geodesic,
      points = props.points;


  if (!points) {
    throw new Error('Specify a point prop');
  }

  var urlParts = [];
  // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('weight', weight, ':'));
  urlParts.push(urlBuilder('fillcolor', fillcolor, ':'));
  urlParts.push(urlBuilder('geodesic', geodesic, ':'));
  urlParts.push(urlBuilder('', locationBuilder(points), ''));

  var url = urlParts.filter(function (x) {
    return x;
  }).join('%7C'); //|

  return 'path=' + url;
};

var markerGroupStrategy = function markerGroupStrategy(_ref, parentProps) {
  var props = _ref.props,
      defaultProps = _ref.type.defaultProps;
  var size = props.size,
      color = props.color,
      label = props.label,
      anchor = props.anchor,
      iconURL = props.iconURL,
      children = props.children;


  var location = React.Children.map(children, function (child) {
    return child.props.location;
  });

  return markerStrategy({
    props: { size: size, color: color, label: label, anchor: anchor, iconURL: iconURL, location: location },
    type: { defaultProps: defaultProps }
  });
};

var pathGroupStrategy = function pathGroupStrategy(_ref, parentProps) {
  var props = _ref.props,
      defaultProps = _ref.type.defaultProps;
  var weight = props.weight,
      color = props.color,
      fillcolor = props.fillcolor,
      geodesic = props.geodesic,
      children = props.children;


  var points = React.Children.map(children, function (child) {
    return child.props.points;
  });

  return pathStrategy({
    props: { weight: weight, color: color, fillcolor: fillcolor, geodesic: geodesic, points: points },
    type: { defaultProps: defaultProps }
  });
};

function nativeStrategy(data) {
  var origin = data.origin,
      destination = data.destination,
      mode = data.mode;


  var originLocation = void 0;
  var destinationLocation = void 0;

  if ((typeof origin === 'undefined' ? 'undefined' : _typeof(origin)) === 'object' && origin.lat && origin.lng) {
    originLocation = new google.maps.LatLng(origin);
  } else {
    originLocation = origin;
  }

  if ((typeof destination === 'undefined' ? 'undefined' : _typeof(destination)) === 'object' && destination.lat && destination.lng) {
    destinationLocation = new google.maps.LatLng(destination);
  } else {
    destinationLocation = destination;
  }

  var DirectionsService = new google.maps.DirectionsService();
  return new Promise(function (resolve, reject) {
    DirectionsService.route({
      origin: originLocation,
      destination: destinationLocation,
      travelMode: mode
    }, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result.routes[0].overview_polyline.points);
      }

      reject(status);
    });
  });
}

var directionStrategy = function directionStrategy(_ref, parentProps) {
  var props = _ref.props,
      defaultProps = _ref.type.defaultProps;
  var baseURL = props.baseURL,
      requestStrategy = props.requestStrategy,
      origin = props.origin,
      destination = props.destination,
      apiKey = props.apiKey,
      waypoints = props.waypoints,
      avoid = props.avoid,
      mode = props.mode,
      transitMode = props.transitMode,
      transitRoutingPreference = props.transitRoutingPreference,
      weight = props.weight,
      color = props.color,
      fillcolor = props.fillcolor,
      geodesic = props.geodesic,
      rest = objectWithoutProperties(props, ['baseURL', 'requestStrategy', 'origin', 'destination', 'apiKey', 'waypoints', 'avoid', 'mode', 'transitMode', 'transitRoutingPreference', 'weight', 'color', 'fillcolor', 'geodesic']);

  // Use the parent's API key if one isn't set here.

  var key = apiKey ? apiKey : parentProps.apiKey;

  var data = _extends({
    key: key,
    baseURL: baseURL,
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    avoid: avoid,
    mode: mode,
    transitMode: transitMode,
    transitRoutingPreference: transitRoutingPreference
  }, rest);

  var pathPromise = void 0;

  if (typeof requestStrategy !== 'string') {
    pathPromise = requestStrategy(data);
  } else {
    switch (requestStrategy) {
      case 'native':
        pathPromise = nativeStrategy(data);
        break;
      case 'fetch':
        pathPromise = FetchStrategy(data);
        break;
      case 'test':
        pathPromise = Promise.resolve('test');
        break;
      default:
        throw new Error('Specify a Request strategy to get directions from');
    }
  }

  return pathPromise.then(function (path) {
    return pathStrategy({
      props: { weight: weight, color: color, fillcolor: fillcolor, geodesic: geodesic, points: 'enc:' + path },
      type: { defaultProps: defaultProps }
    });
  });
};

var MapStrategy = function MapStrategy(props) {
  var rootURL = props.rootURL,
      size = props.size,
      zoom = props.zoom,
      scale = props.scale,
      style = props.style,
      center = props.center,
      format = props.format,
      client = props.client,
      region = props.region,
      visible = props.visible,
      channel = props.channel,
      maptype = props.maptype,
      language = props.language,
      signature = props.signature,
      apiKey = props.apiKey;


  var urlParts = [];

  urlParts.push(urlBuilder('size', size, '='));
  urlParts.push(urlBuilder('zoom', zoom, '='));
  urlParts.push(urlBuilder('scale', scale, '='));
  urlParts.push(urlBuilder('style', style, '='));
  urlParts.push(urlBuilder('center', center, '=')); // Todo: Allow Objects.
  urlParts.push(urlBuilder('format', format, '='));
  urlParts.push(urlBuilder('client', client, '='));
  urlParts.push(urlBuilder('region', region, '='));
  urlParts.push(urlBuilder('visible', visible, '='));
  urlParts.push(urlBuilder('channel', channel, '='));
  urlParts.push(urlBuilder('maptype', maptype, '='));
  urlParts.push(urlBuilder('language', language, '='));
  urlParts.push(urlBuilder('signature', signature, '='));
  urlParts.push(urlBuilder('key', apiKey, '='));

  var parts = urlParts.filter(function (x) {
    return x;
  }).join('&');

  return rootURL + '?' + parts;
};

var StaticGoogleMap = function (_Component) {
  inherits(StaticGoogleMap, _Component);

  function StaticGoogleMap() {
    classCallCheck(this, StaticGoogleMap);
    return possibleConstructorReturn(this, (StaticGoogleMap.__proto__ || Object.getPrototypeOf(StaticGoogleMap)).apply(this, arguments));
  }

  createClass(StaticGoogleMap, [{
    key: 'buildParts',
    value: function buildParts(children, props) {
      return React__default.Children.map(children, function (Child) {
        switch (Child.type.name) {
          case 'Marker':
            return markerStrategy(Child, props);
          case 'MarkerGroup':
            return markerGroupStrategy(Child, props);
          case 'Path':
            return pathStrategy(Child, props);
          case 'PathGroup':
            return pathGroupStrategy(child, props);
          case 'Direction':
            return directionStrategy(Child, props);
          default:
            return null;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onGenerate = _props.onGenerate,
          Component$$1 = _props.as,
          props = objectWithoutProperties(_props, ['children', 'onGenerate', 'as']);
      var rootURL = props.rootURL,
          size = props.size,
          zoom = props.zoom,
          scale = props.scale,
          style = props.style,
          center = props.center,
          format = props.format,
          client = props.client,
          region = props.region,
          visible = props.visible,
          channel = props.channel,
          maptype = props.maptype,
          language = props.language,
          signature = props.signature,
          apiKey = props.apiKey,
          componentProps = objectWithoutProperties(props, ['rootURL', 'size', 'zoom', 'scale', 'style', 'center', 'format', 'client', 'region', 'visible', 'channel', 'maptype', 'language', 'signature', 'apiKey']);


      var componentUrlParts = this.buildParts(children, props);

      var mapParts = MapStrategy(props);

      var urlParts = Promise.all(componentUrlParts).then(function (parts) {
        return mapParts + '&' + parts.join('&');
      });

      return React__default.createElement(Async, {
        promise: urlParts,
        then: function then(URL) {
          return React__default.createElement(Component$$1, _extends({}, componentProps, { src: URL }));
        },
        'catch': function _catch(err) {
          return React__default.createElement(
            'span',
            null,
            'Image generation failed with err ',
            err
          );
        }
      });
    }
  }]);
  return StaticGoogleMap;
}(React.Component);

StaticGoogleMap.defaultProps = {
  as: 'img',
  scale: 1,
  format: 'png',
  rootURL: 'https://maps.googleapis.com/maps/api/staticmap',
  apiKey: '',
  maptype: 'roadmap'
};

var propTypes = {
  size: PropTypes.oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes.string,
  iconURL: PropTypes.string,
  label: PropTypes.string,
  anchor: PropTypes.string,
  location: PropTypes.any.isRequired
};

var defaultProps = {
  size: 'normal'
};

var groupPropTypes = {
  size: PropTypes.oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes.string,
  iconURL: PropTypes.string,
  label: PropTypes.string,
  anchor: PropTypes.string
};

var Marker = function Marker(props) {
  return null;
};
Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

var MarkerGroup = function MarkerGroup(props) {
  return null;
};
MarkerGroup.propTypes = groupPropTypes;
MarkerGroup.defaultProps = defaultProps;

Marker.Group = MarkerGroup;

var propTypes$1 = {
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool,
  points: PropTypes.any
};

var groupPropTypes$1 = {
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool
};

var defaultProps$1 = {
  weight: 5,
  geodesic: false
};

var Path = function Path(props) {
  return null;
};
Path.propTypes = propTypes$1;
Path.defaultProps = defaultProps$1;

var PathGroup = function PathGroup(props) {
  return null;
};
PathGroup.propsTypes = groupPropTypes$1;
PathGroup.defaultProps = defaultProps$1;

Path.Group = PathGroup;

var propTypes$2 = {
  baseURL: PropTypes.string,
  origin: PropTypes.string,
  destination: PropTypes.string,
  apiKey: PropTypes.string,
  waypoints: PropTypes.any,

  avoid: PropTypes.string,
  mode: PropTypes.oneOf(['driving', 'walking', 'bicycling', 'transit']),
  transitMode: PropTypes.oneOf(['bus', 'subway', 'train', 'tram', 'rail']),
  transitRoutingPreference: PropTypes.oneOf(['less_walking', 'fewer_transfers']),
  requestStrategy: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['fetch', 'native', 'test'])]).isRequired,

  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fillcolor: PropTypes.string,
  geodesic: PropTypes.bool
};

var defaultProps$2 = {
  baseURL: 'https://maps.googleapis.com/maps/api/directions/json',
  mode: 'driving',
  requestStrategy: 'native',

  weight: 5,
  geodesic: false
};

var Direction = function Direction(props) {
  return null;
};

Direction.propTypes = propTypes$2;
Direction.defaultProps = defaultProps$2;

exports.StaticGoogleMap = StaticGoogleMap;
exports.Marker = Marker;
exports.Path = Path;
exports.Direction = Direction;
