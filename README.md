# react static google map

<p align="center">
  <a href="https://circleci.com/gh/bondz/react-static-google-map/tree/master">
    <img src="https://circleci.com/gh/bondz/react-static-google-map/tree/master.svg?style=shield" alt="build status" />
  </a>
  <a href="https://www.npmjs.com/package/react-static-google-map">
    <img src="https://img.shields.io/npm/v/react-static-google-map.svg" alt="npm version" />
  </a>
  <a href="https://github.com/bondz/react-static-google-map/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/react-static-google-map.svg" alt="license" />
  </a>
  <a href="https://snyk.io/test/github/bondz/react-static-google-map">
    <img src="https://snyk.io/test/github/bondz/react-static-google-map/badge.svg" alt="Vulnerability status" />
  </a>
</p>

## Overview

Show Google Map static images the React way.

```
yarn add react-static-google-map
```


```jsx
import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';

<StaticGoogleMap size="600x600" className="img-fluid" apiKey="YOUR_API_KEY">
  <Marker location="6.4488387,3.5496361" color="blue" label="P" />
</StaticGoogleMap>

<StaticGoogleMap size="600x600" apiKey="YOUR_API_KEY">
  <Marker.Group label="T" color="brown">
    <Marker location="40.737102,-73.990318" />
    <Marker location="40.749825,-73.987963" />
  </Marker.Group>
</StaticGoogleMap>

<StaticGoogleMap size="600x600" apiKey="YOUR_API_KEY">
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

```html
<img class="img-fluid" src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C6.4488387,3.5496361&key=YOUR_API_KEY">

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:brown%7Clabel:T%7C40.737102,-73.990318%7C40.749825,-73.987963&key=YOUR_API_KEY">

<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C40.737102,-73.990318&path=weight:5%7C40.737102,-73.990318%7C40.749825,-73.987963%7C40.752946,-73.987384%7C40.755823,-73.986397&key=YOUR_API_KEY">
```

## Documentation
 - [Marker Component](#marker-component)
 - [Path Component](#path-component)
 - [Direction Component](#direction-component)

All components must be rendered in the StaticGoogleMap container as children.

## Marker Component
```js
import { Marker } from 'react-static-google-map';
```

The `Marker` component allows you render [markers](https://developers.google.com/maps/documentation/static-maps/intro#Markers) on the image.

It takes the following props

- `size` - (optional) specifies the size of marker from the set `{tiny, mid, small}`. If no size parameter is set, the marker will appear in its default (normal) size.
- `color` - (optional) specifies a 24-bit color (example: color=0xFFFFCC) or a predefined color from the set `{black, brown, green, purple, yellow, blue, gray, orange, red, white}`
- `label` - (optional) specifies a single uppercase alphanumeric character from the set `{A-Z, 0-9}`. Note that default and mid sized markers are the only markers capable of displaying an alphanumeric-character parameter. `tiny` and `small` sized markers are not capable of displaying an alphanumeric-character.

- `iconURL` - (optional) specifies the icon for the Marker - rather than use Google's marker icons - using a URL (which should be [URL-encoded](https://en.wikipedia.org/wiki/URL-encoding)). You can use URLs created by URL-shortening services such as https://goo.gl. Most URL-shortening services have the advantage of automatically encoding URLs.
- `anchor` - (optional) sets how the icon is placed in relation to the specified markers locations. By default, the anchor point of a custom icon is the `bottom center` of the icon image. You can specify a different anchor point using the anchor descriptor in conjunction with your icon. Set the anchor as an `x,y` point of the icon (such as `10,5`), or as a predefined alignment using one of the following values: `top, bottom, left, right, center, topleft, topright, bottomleft, or bottomright`
- `scale`: (optional) useful when using a custom marker iconURL.  The scale value is multiplied with the marker image size to produce the actual output size of the marker in pixels. Default scale value is 1; accepted values are 1, 2, and 4. Use marker scaling in conjunction with map scaling when displaying higher-resolution maps.
- `location` - (required) defines the marker's location on the map. If the location is off the map, that marker will not appear in the constructed image provided that `center` and `zoom` props on the parent are supplied. However, if these props are not supplied, the Google Static Maps API server will automatically construct an image which contains the supplied markers ala [Implicit Positioning](https://developers.google.com/maps/documentation/static-maps/intro#ImplicitPositioning).

### Examples
```jsx
<StaticGoogleMap
  center="Williamsburg,Brooklyn,NY"
  zoom="13"
  size="400x400"
>
  <Marker color="blue" label="S" location={[11211, 11206, 11222]} />
</StaticGoogleMap>
```

Would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=YOUR_API_KEY">
```

```jsx
<StaticGoogleMap size="600x600">
  <Marker iconURL="https://goo.gl/1oTJ9Y" location="Canberra+ACT" />
  <Marker
    anchor="topleft"
    iconURL="http://tinyurl.com/jrhlvu6"
    location="Melbourne+VIC"
  />
  <Marker
    anchor="32,10"
    iconURL="https://goo.gl/5y3S82"
    location="Melbourne+VIC"
  />
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Cicon:https://goo.gl/1oTJ9Y%7CCanberra+ACT&markers=size:normal%7Canchor:topleft%7Cicon:http://tinyurl.com/jrhlvu6%7CMelbourne+VIC&markers=size:normal%7Canchor:32,10%7Cicon:https://goo.gl/5y3S82%7CMelbourne+VIC&key=YOUR_API_KEY">
```

### Marker.Group

There is also a `Marker.Group` component that renders markers with the same style in different locations

This component removes all other props expect `location` from its children.

```jsx
<StaticGoogleMap size="600x600">
  <Marker.Group iconURL="https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=cafe%257C996600">
    <Marker location="224+West+20th+Street+NY" />
    <Marker location="75+9th+Ave+NY" />
    <Marker location="700+E+9th+St+NY" />
  </Marker.Group>
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Cicon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=cafe%257C996600%7C224+West+20th+Street+NY%7C75+9th+Ave+NY%7C700+E+9th+St+NY&key=YOUR_API_KEY">
```

## Path Component
```js
import { Path } from 'react-static-google-map'
```

The path component allows you render [paths](https://developers.google.com/maps/documentation/static-maps/intro#Paths) on the image

It takes the following props

- `weight` - (optional) specifies the thickness of the path in pixels. If no weight parameter is set, the path will appear in its default thickness (5 pixels).
- `color` - (optional) specifies a color either as a 24-bit (example: color=0xFFFFCC) or 32-bit hexadecimal value (example: color=0xFFFFCCFF), or from the set `{black, brown, green, purple, yellow, blue, gray, orange, red, white}`.
- `fillcolor` - (optional) indicates both that the path marks off a polygonal area and specifies the fill color to use as an overlay within that area.
- `geodesic` - (optional) indicates that the requested path should be interpreted as a geodesic line that follows the curvature of the earth. When false, the path is rendered as a straight line in screen space. Defaults to false.
- `points` - (required) In order to draw a path, the path prop must be passed two or more points. The Google Static Maps API will then connect the path along those points, in the specified order.


### Examples
```jsx
<StaticGoogleMap size="600x600">
  <Path
    color="0xff0000ff"
    weight="5"
    points={[
      { lat: 40.737102, lng: -73.990318 },
      '40.749825,-73.987963',
      { lat: 40.752946, lng: -73.987384 },
      { lat: 40.755823, lng: -73.986397 },
    ]}
  />
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&path=color:0xff0000ff%7Cweight:5%7C40.737102,-73.990318%7C40.749825,-73.987963%7C40.752946,-73.987384%7C40.755823,-73.986397&key=YOUR_API_KEY">
```

You can also render encoded polyline paths
```jsx
<StaticGoogleMap scale="2" zoom="4" size="600x600">
  <Path
    weight="6"
    points="enc:_fisIp~u%7CU}%7Ca@pytA_~b@hhCyhS~hResU%7C%7Cx@oig@rwg@amUfbjA}f[roaAynd@%7CvXxiAt{ZwdUfbjAewYrqGchH~vXkqnAria@c_o@inc@k{g@i`]o%7CF}vXaj\h`]ovs@?yi_@rcAgtO%7Cj_AyaJren@nzQrst@zuYh`]v%7CGbldEuzd@%7C%7Cx@spD%7CtrAzwP%7Cd_@yiB~vXmlWhdPez\_{Km_`@~re@ew^rcAeu_@zhyByjPrst@ttGren@aeNhoFemKrvdAuvVidPwbVr~j@or@f_z@ftHr{ZlwBrvdAmtHrmT{rOt{Zz}E%7Cc%7C@o%7CLpn~AgfRpxqBfoVz_iAocAhrVjr@rh~@jzKhjp@``NrfQpcHrb^k%7CDh_z@nwB%7Ckb@a{R%7Cyh@uyZ%7CllByuZpzw@wbd@rh~@%7C%7CFhqs@teTztrAupHhyY}t]huf@e%7CFria@o}GfezAkdW%7C}[ocMt_Neq@ren@e~Ika@pgE%7Ci%7CAfiQ%7C`l@uoJrvdAgq@fppAsjGhg`@%7ChQpg{Ai_V%7C%7Cx@mkHhyYsdP%7CxeA~gF%7C}[mv`@t_NitSfjp@c}Mhg`@sbChyYq}e@rwg@atFff}@ghN~zKybk@fl}A}cPftcAite@tmT__Lha@u~DrfQi}MhkSqyWivIumCria@ciO_tHifm@fl}A{rc@fbjAqvg@rrqAcjCf%7Ci@mqJtb^s%7C@fbjA{wDfs`BmvEfqs@umWt_Nwn^pen@qiBr`xAcvMr{Zidg@dtjDkbM%7Cd_@"
  />
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&zoom=4&scale=2&format=png&maptype=roadmap&path=weight:6%7Cenc:_fisIp~u%7CU}%7Ca@pytA_~b@hhCyhS~hResU%7C%7Cx@oig@rwg@amUfbjA}f[roaAynd@%7CvXxiAt{ZwdUfbjAewYrqGchH~vXkqnAria@c_o@inc@k{g@i`]o%7CF}vXaj\h`]ovs@?yi_@rcAgtO%7Cj_AyaJren@nzQrst@zuYh`]v%7CGbldEuzd@%7C%7Cx@spD%7CtrAzwP%7Cd_@yiB~vXmlWhdPez\_{Km_`@~re@ew^rcAeu_@zhyByjPrst@ttGren@aeNhoFemKrvdAuvVidPwbVr~j@or@f_z@ftHr{ZlwBrvdAmtHrmT{rOt{Zz}E%7Cc%7C@o%7CLpn~AgfRpxqBfoVz_iAocAhrVjr@rh~@jzKhjp@``NrfQpcHrb^k%7CDh_z@nwB%7Ckb@a{R%7Cyh@uyZ%7CllByuZpzw@wbd@rh~@%7C%7CFhqs@teTztrAupHhyY}t]huf@e%7CFria@o}GfezAkdW%7C}[ocMt_Neq@ren@e~Ika@pgE%7Ci%7CAfiQ%7C`l@uoJrvdAgq@fppAsjGhg`@%7ChQpg{Ai_V%7C%7Cx@mkHhyYsdP%7CxeA~gF%7C}[mv`@t_NitSfjp@c}Mhg`@sbChyYq}e@rwg@atFff}@ghN~zKybk@fl}A}cPftcAite@tmT__Lha@u~DrfQi}MhkSqyWivIumCria@ciO_tHifm@fl}A{rc@fbjAqvg@rrqAcjCf%7Ci@mqJtb^s%7C@fbjA{wDfs`BmvEfqs@umWt_Nwn^pen@qiBr`xAcvMr{Zidg@dtjDkbM%7Cd_@&key=YOUR_API_KEY">
```

### Path.Group
There is also a `Path.Group` component that renders different paths with the same style

This component removes all other props expect `points` from its children.

```jsx
<StaticGoogleMap size="600x600">
  <Path.Group color="0x00000000" weight="5" fillcolor="0xFFFF0033">
    <Path points="8th+Avenue+%26+34th+St,New+York,NY" />
    <Path points="8th+Avenue+%26+42nd+St,New+York,NY" />
    <Path points="Park+Ave+%26+42nd+St,New+York,NY,NY" />
    <Path points="Park+Ave+%26+34th+St,New+York,NY,NY" />
  </Path.Group>
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&path=color:0x00000000%7Cweight:5%7Cfillcolor:0xFFFF0033%7C8th+Avenue+%26+34th+St,New+York,NY%7C8th+Avenue+%26+42nd+St,New+York,NY%7CPark+Ave+%26+42nd+St,New+York,NY,NY%7CPark+Ave+%26+34th+St,New+York,NY,NY&key=YOUR_API_KEY">
```


## Direction Component
```js
import { Direction } from 'react-static-google-map';
```

This is a syntatic sugar around the [Path Component](#path-component) that uses the [Google Directions API](https://developers.google.com/maps/documentation/directions/intro) to render a Path on the map.

This component by default requires that the [Google Maps JavaScript Client Side API](https://developers.google.com/maps/documentation/javascript/directions) be loaded.

Add `<script src="https://maps.googleapis.com/maps/api/js?key="></script>` to your `index.html`

It takes the following props as well as props from [Path Component](#path-component)

- `origin` -  (required) specifies the start location from which to calculate directions. This value may be specified as a String (for example, "Chicago, IL"), as a LatLng value
- `destination` - (required) specifies the end location to which to calculate directions. The options are the same as for the origin field described above.
- `travelMode` - (optional) specifies what mode of transport to use when calculating directions. Valid values are `driving (Default), bicycling, transit, and WALKING`
- `requestStrategy` - (optional) A function that takes origin, destination, and travelMode as parameters and returns a string promise of the encoded polyline path to draw on the map.

Also see the `cache` and `onCacheUpdate` props on the `StaticGoogleMap` component.

### Examples

```jsx
<StaticGoogleMap size="600x400">
  <Direction
    origin="6.503296599999999,3.3589658"
    destination="6.6142085,3.3580775000000003"
  />
</StaticGoogleMap>
```

would render

```html
<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&scale=1&format=png&maptype=roadmap&path=weight:5%7Cenc:eduf@i`oSa@pAoAzEc@~A[v@k@j@sA`A]`@{@k@e@OkASkDk@cEs@eG_AoAIk@@qBNw@@WCsEaAmBe@D]RiAhAgFRg@Zm@Z_@r@k@`@_@V_@Rc@|@uFh@eEHm@Fi@BKQAoAUoD}@kCm@iBYK?MBG@{GsAmHcBsDu@aCm@}@Y_Ac@w@e@aBuAwBqBkA}@YMs@[SGu@GwB?kGFoH@eIByOHmKLuPDsH@ui@^_NH}PL{QFqVJ{NLsGDqDFiIAcOJwKFuGD_E?}DI{E]eD_@_Ca@yCo@}C}@yAi@cCcAmDgByCkBkQgLuCmBsNgJwE}CmD}B{ViPsH}EeG_EkHwE{GqEeDuBc@YIi@{AcAYy@AWF[La@RQXMRE`@?d@LZVFNJ^@^Qv@UPe@\e@\iAz@eExCcD|BmCnB_@N]`@Ub@g@`@uA`AsOxKmFvD{EjDeJtGyAfAmBtAV^jCcBnByApBwA|EqDv@i@^Kb@Yh@Yx@URARBNHbArAzAnBj@v@J\GNUTqChBeFvDqCnBmEdCyBlAq@^{JrGeG`EuHpE]RaCtAwExC}OdJaJpFiC|An@nANb@@ZHLZWZOLG\CJBRDRLTVpCjE\l@fAfBbAfBx@pAbBpC|BnD_EhDcG~Ee@[UWi@i@XSKMQa@l@g@QW&key=YOUR_API_KEY">
```


## Static Google Map
```js
  import { StaticGoogleMap } from 'react-static-google-map'
```

This is the container component all other components should be rendered in.

It takes the following props

- `rootUrl`: (optional) The root url in which all params will be serialized and appended to. Defaults to `https://maps.googleapis.com/maps/api/staticmap`.
- `as`: (optional) The element for the URL to be rendered in. Defaults to `img`
- `onGenerate`: (optional) function called with the generated image URL
- `size`: (required) defines the rectangular dimensions of the map image. This parameter takes a string of the form `{horizontal_value}x{vertical_value}`. For example, `500x400` defines a map `500 pixels` wide by `400 pixels` high. Maps smaller than 180 pixels in width will display a reduced-size Google logo. This parameter is affected by the `scale` parameter; the final output size is the product of the size and scale values.
- `scale`: (optional) affects the number of pixels that are returned. `scale=2` returns twice as many pixels as `scale=1` while retaining the same coverage area and level of detail (i.e. the contents of the map don't change). This is useful when developing for high-resolution displays, or when generating a map for printing. The default value is `1`. Accepted values are `2` and `4` (`4` is only available to Google Maps APIs Premium Plan customers.)
- `format`: (optional) defines the format of the resulting image. By default, the Google Static Maps API creates `PNG` images. There are several possible formats including `GIF`, `JPEG` and `PNG` types. Which format you use depends on how you intend to present the image. `JPEG` typically provides greater compression, while `GIF` and `PNG` provide greater detail.
- `maptype`: (optional) defines the type of map to construct. There are several possible maptype values, including `roadmap`, `satellite`, `hybrid`, and `terrain`.
- `language`: (optional) defines the language to use for display of labels on map tiles. Note that this parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
- `region`: (optional) defines the appropriate borders to display, based on geo-political sensitivities. Accepts a region code specified as a two-character ccTLD ('top-level domain') value.
- `visible`: (optional) specifies one or more locations that should remain visible on the map, though no markers or other indicators will be displayed. Use this parameter to ensure that certain features or map locations are shown on the Google Static Maps API.
- `style`: (optional) defines a custom style to alter the presentation of a specific feature (roads, parks, and other features) of the map. This parameter takes feature and element arguments identifying the features to style, and a set of style operations to apply to the selected features.
- `center`: (required if markers not present) defines the center of the map, equidistant from all edges of the map. This parameter takes a location as either a comma-separated {latitude,longitude} pair (e.g. "40.714728,-73.998672") or a string address (e.g. "city hall, new york, ny") identifying a unique location on the face of the earth.
- `zoom`: (optional if markers not present) defines the zoom level of the map, which determines the magnification level of the map. This parameter takes a numerical value corresponding to the zoom level of the region desired.
- `apiKey`: (optional) allows you to monitor your application's API usage in the [Google API Console](https://support.google.com/googleapi/#topic=7013279)
- `signature`: (recommended) is a digital signature used to verify that any site generating requests using your API key is authorized to do so.
- `client`: (optional) By using your client ID (instead of an API key) to authenticate requests, you can: Add the channel parameter to requests so you can view more detailed usage reports.
- `channel`: (optional) used to provide additional reporting detail, by grouping different channels separately in your reports. Refer to the [Premium Plan Reporting Overview](https://developers.google.com/maps/premium/reports/) for more information.
- `cache`: (optional, default: true) Only used when rendering a `Direction` component. Because the `Direction` component is async and will attempt to fetch directions on each render, setting this prop to `true` will keep an internal cache of requests. This saves calls to the directions service as well as prevents the component from flashing as it fetches new directions. You can also initialize the cache by passing it an object.
- `onCacheUpate`: (optional) Only used when rendering a `Direction` component. This function will be called everytime a new entry is added to the internal cache. It can be used to save the cache to localStorage, for example. This is helpful to intilialize the `cache` prop from storage.

### URL Size Restriction

Google Static Maps API URLs are restricted to `8192` characters in size. In practice, you will probably not have need for URLs longer than this, unless you produce complicated maps with a high number of markers and paths.

## License

[MIT](LICENSE).
