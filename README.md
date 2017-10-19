# react-static-google-map

Show Google Map static images the React way.

## Install

```
yarn add react-static-google-map
```


```jsx
import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';

<StaticGoogleMap size="600x600">
  <Marker.Group label="T" color="brown">
    <Marker location="40.737102,-73.990318" />
    <Marker location="40.749825,-73.987963" />
  </Marker.Group>
</StaticGoogleMap>

<StaticGoogleMap size="600x600">
  <Marker location="6.4488387,3.5496361" color="blue" label="P" />
</StaticGoogleMap>

<StaticGoogleMap size="600x600">
  <Marker
    location={{ lat: 40.737102, lng: -73.990318 }}
    color="blue"
    label="P"
  />
  <Path
    points={[
      '40.737102,-73.990318',
      '40.749825,-73.987963',
      '40.752946,-73.987384',
      '40.755823,-73.986397',
    ]}
  />
</StaticGoogleMap>
```
Should render

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:brown%7Clabel:T%7C40.737102,-73.990318%7C40.749825,-73.987963">

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:brown%7Clabel:T%7C40.737102,-73.990318%7C40.749825,-73.987963">

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C40.737102,-73.990318&path=weight:5%7C40.737102,-73.990318%7C40.749825,-73.987963%7C40.752946,-73.987384%7C40.755823,-73.986397">

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&scale=1&format=png&maptype=roadmap&markers=size:normal%7C6.43551,3.5083213%7C6.430699700000001,3.4957468000000005">

## License

[MIT](LICENSE).
