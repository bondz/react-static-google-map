import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-promise';
import invariant from 'invariant';

import MarkerStrategy from '../strategies/marker';
import PathStrategy from '../strategies/path';
import MarkerGroupStrategy from '../strategies/markergroup';
import PathGroupStrategy from '../strategies/pathgroup';
import DirectionStrategy from '../strategies/direction/index';
import MapStrategy from '../strategies/map';

class StaticGoogleMap extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onGenerate: PropTypes.func,
    rootURL: PropTypes.string,

    size: PropTypes.string.isRequired,
    scale: PropTypes.oneOf([1, 2, 4, '1', '2', '4']),
    format: PropTypes.oneOf([
      'png',
      'png8',
      'png32',
      'gif',
      'jpg',
      'jpg-baseline',
    ]),
    maptype: PropTypes.oneOf(['roadmap', 'satellite', 'terrain', 'hybrid']),

    language: PropTypes.string,
    region: PropTypes.string,
    visible: PropTypes.string,
    style: PropTypes.string,

    center: PropTypes.string,
    zoom: PropTypes.string,

    client: PropTypes.string,
    apiKey: PropTypes.string,
    signature: PropTypes.string,
    channel: PropTypes.string,
  };

  static defaultProps = {
    as: 'img',
    scale: 1,
    format: 'png',
    rootURL: 'https://maps.googleapis.com/maps/api/staticmap',
    apiKey: '',
    maptype: 'roadmap',
  };

  buildParts(children, props) {
    return React.Children.map(children, Child => {
      switch (Child.type.name) {
        case 'Marker':
          return MarkerStrategy(Child, props);
        case 'MarkerGroup':
          return MarkerGroupStrategy(Child, props);
        case 'Path':
          return PathStrategy(Child, props);
        case 'PathGroup':
          return PathGroupStrategy(child, props);
        case 'Direction':
          return DirectionStrategy(Child, props);
        default:
          return null;
      }
    });
  }

  render() {
    const { children, onGenerate, as: Component, ...props } = this.props;
    const {
      rootURL,
      size,
      zoom,
      scale,
      style,
      center,
      format,
      client,
      region,
      visible,
      channel,
      maptype,
      language,
      signature,
      apiKey,
      ...componentProps
    } = props;

    invariant(size, 'size property is not set');
    invariant(
      children,
      'Component must have `Marker`, `Path` or `Direction` child'
    );

    const childrenUrlParts = this.buildParts(children, props) || [];
    const mainUrlParts = MapStrategy(props);

    const urlParts = Promise.all(childrenUrlParts).then(
      parts => `${mainUrlParts}&${parts.filter(part => part).join('&')}`
    );

    return (
      <Async
        promise={urlParts}
        then={URL => {
          if (onGenerate) {
            onGenerate(URL);
          }

          return <Component {...componentProps} src={URL} />;
        }}
        catch={err => (
          console.error(err), <span>Image generation failed.</span>
        )}
      />
    );
  }
}

export default StaticGoogleMap;
