import { urlBuilder, locationBuilder } from './utils';
import invariant from 'invariant';

const markerStrategy = ({ props, type: { defaultProps } }, parentProps) => {
  const { size, color, label, anchor, iconURL, location } = props;

  invariant(location, 'Marker expects a valid location prop');

  let urlParts = [];

  // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('size', size, ':'));
  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('label', label, ':'));
  urlParts.push(urlBuilder('anchor', anchor, ':'));
  urlParts.push(urlBuilder('icon', iconURL, ':'));
  urlParts.push(urlBuilder('', locationBuilder(location), ''));

  const url = urlParts.filter(x => x).join('%7C'); // |

  return `markers=${url}`;
};

export default markerStrategy;
