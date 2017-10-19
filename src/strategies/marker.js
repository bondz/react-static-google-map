import { urlBuilder, locationBuilder } from './utils';

const markerStrategy = ({ props, type: { defaultProps } }, parentProps) => {
  const { size, color, label, anchor, iconURL, location } = props;

  if (!location) {
    throw Error('Specify a valid location');
  }

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
