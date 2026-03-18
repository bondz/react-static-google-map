import React, { Component } from "react";
import Async from "react-promise";
import invariant from "invariant";

import MarkerStrategy from "../strategies/marker";
import PathStrategy from "../strategies/path";
import MarkerGroupStrategy from "../strategies/markergroup";
import PathGroupStrategy from "../strategies/pathgroup";
import DirectionStrategy, { memoizeDirectionStrategy } from "../strategies/direction/index";
import MapStrategy from "../strategies/map";
import Marker from "./Marker";
import Path from "./Path";
import Direction from "./Direction";
import {
  isStatelessComponent,
  renderStatelessComponent,
  isClassComponent,
  renderClassComponent,
} from "../strategies/utils";
import type { StaticGoogleMapProps, CacheType } from "../types";

class StaticGoogleMap extends Component<StaticGoogleMapProps> {
  static defaultProps = {
    as: "img",
    scale: 1,
    format: "png",
    rootURL: "https://maps.googleapis.com/maps/api/staticmap",
    apiKey: "",
    maptype: "roadmap",
    cache: true,
  };

  MemoizedDirectionStrategy = memoizeDirectionStrategy(DirectionStrategy, {
    ...(this.props.cache as CacheType),
  });

  buildParts(children: React.ReactNode, props: StaticGoogleMapProps): any[] | null | undefined {
    return React.Children.map(children, (child): any => {
      if (!React.isValidElement(child)) {
        return null;
      }

      switch (child.type) {
        case Marker:
          return MarkerStrategy(child as any);
        case Marker.Group:
          return MarkerGroupStrategy(child as any);
        case Path:
          return PathStrategy(child as any);
        case Path.Group:
          return PathGroupStrategy(child as any);
        case Direction:
          if (props.cache) {
            return this.MemoizedDirectionStrategy(child as any, props);
          }
          return DirectionStrategy(child as any, props);
        default: {
          const componentType = child.type;

          if (isStatelessComponent(componentType)) {
            return this.buildParts(
              renderStatelessComponent(componentType as any, { ...(child.props as any) }),
              props,
            );
          }

          if (isClassComponent(componentType)) {
            return this.buildParts(
              renderClassComponent(componentType, { ...(child.props as any) }),
              props,
            );
          }

          return null;
        }
      }
    });
  }

  render() {
    const { children, onGenerate, as: Component = "img", ...props } = this.props;
    const {
      rootURL: _rootURL,
      size,
      zoom: _zoom,
      scale: _scale,
      style: _style,
      mapId: _mapId,
      center: _center,
      format: _format,
      client: _client,
      region: _region,
      visible: _visible,
      channel: _channel,
      maptype: _maptype,
      language: _language,
      signature: _signature,
      apiKey: _apiKey,
      cache: _cache,
      onCacheUpdate: _onCacheUpdate,
      ...componentProps
    } = props;

    invariant(size, "size property is not set");
    invariant(children, "Component must have `Marker`, `Path` or `Direction` child");

    const childrenUrlParts = this.buildParts(children, props) || [];
    const mainUrlParts = MapStrategy(props);

    /**
     * All the parts should return a string if a component that does not return a promise isn't used
     * The Directions's component returns a promise and would instead use the Async component to render
     * This allows us render sync otherwise and partially support server side rendering.
     */
    if (!childrenUrlParts.some((part) => typeof part === "object")) {
      const childURL = childrenUrlParts.filter((part) => part).join("&");
      const url = `${mainUrlParts}&${childURL}`;

      if (onGenerate) {
        onGenerate(url);
      }

      return <Component {...componentProps} src={url} />;
    }

    const urlParts = Promise.all(childrenUrlParts).then(
      (parts) => `${mainUrlParts}&${parts.filter((part) => part).join("&")}`,
    );

    return (
      <Async
        promise={urlParts}
        then={(URL: string) => {
          if (onGenerate) {
            onGenerate(URL);
          }

          return <Component {...componentProps} src={URL} />;
        }}
        catch={(err: unknown) => (console.error(err), (<span>Image generation failed.</span>))}
      />
    );
  }
}

export default StaticGoogleMap;
