import { urlBuilder } from './utils';

const MapStrategy = props => {
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
  } = props;

  const urlParts = [];

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

  const parts = urlParts.filter(x => x).join('&');

  return `${rootURL}?${parts}`;
};

export default MapStrategy;
