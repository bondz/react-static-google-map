import type { LocationType } from "../types";

export function urlBuilder(
  property: string,
  value: string | number | boolean | undefined | null,
  separator: string,
): string | null {
  if (value) {
    return `${property}${separator}${value}`;
  }

  return null;
}

export function locationBuilder(location: LocationType): string {
  const urlParts: (string | number)[] = [];

  if (Array.isArray(location)) {
    const arrParts = location.map((val) => locationBuilder(val as LocationType));
    urlParts.push(...arrParts);
  }

  if (typeof location === "string" || typeof location === "number") {
    urlParts.push(location);
  }

  if (typeof location === "object" && !Array.isArray(location) && location.lat && location.lng) {
    urlParts.push(`${location.lat},${location.lng}`);
  }

  return urlParts.join("%7C"); // |
}

export function isStatelessComponent(component: unknown): component is CallableFunction {
  const c = component as { render?: unknown; prototype?: { render?: unknown } };
  return !c.render && !(c.prototype && c.prototype.render);
}

export function isClassComponent(
  component: unknown,
): component is new (props: Record<string, unknown>) => { render(): React.ReactNode } {
  const c = component as { prototype?: { isReactComponent?: boolean; render?: unknown } };
  return Boolean(c && c.prototype?.isReactComponent && c.prototype?.render);
}

export function renderStatelessComponent(
  component: (props: Record<string, unknown>) => React.ReactNode,
  props: Record<string, unknown>,
): React.ReactNode {
  return component(props);
}

export function renderClassComponent(
  component: new (props: Record<string, unknown>) => { render(): React.ReactNode },
  props: Record<string, unknown>,
): React.ReactNode {
  return new component(props).render();
}
