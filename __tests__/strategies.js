import React from 'react';

import { Marker, Path, Direction } from '../src/index';
import MarkerStrategy from '../src/strategies/marker';
import MarkerGroupStrategy from '../src/strategies/markergroup';
import PathStrategy from '../src/strategies/path';
import PathGroupStrategy from '../src/strategies/pathgroup';
import DirectionStrategy from '../src/strategies/direction/index';

describe('Marker Strategy', () => {
  test('MarkerStrategy is defined', () => {
    expect(MarkerStrategy).toBeDefined();

    expect(MarkerStrategy(<Marker location="test" />)).toBe(
      'markers=size:normal%7Ctest'
    );
  });

  test('location prop is required', () => {
    console.error = jest.fn();
    expect(() => MarkerStrategy(<Marker />)).toThrow(
      'Marker expects a valid location'
    );
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test('it parses valid marker props', () => {
    const wrapper = MarkerStrategy(
      <Marker
        color="red"
        size="tiny"
        label="P"
        iconURL="testIcon"
        anchor="topleft"
        location="testLocation"
      />
    );

    expect(wrapper).toContain('color:red');
    expect(wrapper).toContain('size:tiny');
    expect(wrapper).toContain('label:P');
    expect(wrapper).toContain('anchor:topleft');
    expect(wrapper).toContain('testLocation');
    expect(wrapper).not.toContain('location:testLocation');
    expect(wrapper).toMatchSnapshot();
  });

  test('Marker group passes on all props from children except location', () => {
    const { Group } = Marker;
    const wrapper = MarkerGroupStrategy(
      <Group
        size="tiny"
        color="blue"
        label="G"
        iconURL="testIcon"
        anchor="topleft"
      >
        <Marker color="green" location="marker1" />
        <Marker color="red" location="marker2" />
        <Marker
          size="small"
          color="brown"
          label="T"
          iconURL="testIcon2"
          anchor="topright"
          location="marker3"
        />
      </Group>
    );

    expect(wrapper).toContain('color:blue');
    expect(wrapper).toContain('size:tiny');
    expect(wrapper).toContain('label:G');
    expect(wrapper).toContain('icon:testIcon');
    expect(wrapper).toContain('anchor:topleft');
    expect(wrapper).not.toContain('color:green');
    expect(wrapper).not.toContain('color:red');
    expect(wrapper).not.toContain('color:brown');
    expect(wrapper).not.toContain('size:small');
    expect(wrapper).not.toContain('label:T');
    expect(wrapper).not.toContain('icon:testIcon2');
    expect(wrapper).not.toContain('anchor:topright');
    expect(wrapper).toContain('marker1');
    expect(wrapper).toContain('marker2');
    expect(wrapper).toContain('marker3');
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Path Strategy', () => {
  test('it is defined', () => {
    expect(PathStrategy).toBeDefined();
    expect(PathStrategy(<Path points="test" />)).toBe('path=weight:5%7Ctest');
  });

  test('points prop is required', () => {
    console.error = jest.fn();
    expect(() => PathStrategy(<Path />)).toThrow(
      'Path expects a valid points prop'
    );
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test('it parses valid point props', () => {
    const wrapper = PathStrategy(
      <Path weight={3} color="blue" fillcolor="red" geodesic points="test1" />
    );

    expect(wrapper).toContain('weight:3');
    expect(wrapper).toContain('color:blue');
    expect(wrapper).toContain('fillcolor:red');
    expect(wrapper).toContain('geodesic:true');
    expect(wrapper).toContain('test1');
    expect(wrapper).not.toContain('points:test1');
    expect(wrapper).toMatchSnapshot();
  });

  test('Path group passes on all props except points', () => {
    const { Group } = Path;

    const wrapper = PathGroupStrategy(
      <Group weight="2" color="red" fillcolor="blue">
        <Path points="test1" />
        <Path geodesic points="test2" />
        <Path points="test3" />
      </Group>
    );

    expect(wrapper).toContain('weight:2');
    expect(wrapper).toContain('color:red');
    expect(wrapper).toContain('fillcolor:blue');
    expect(wrapper).not.toContain('geodesic');
    expect(wrapper).toContain('test1');
    expect(wrapper).toContain('test2');
    expect(wrapper).toContain('test3');
  });
});

describe('Directions Strategy', () => {
  test('it is defined', () => {
    expect(DirectionStrategy).toBeDefined();
  });

  test('origin prop is required', () => {
    expect(() => DirectionStrategy(<Direction />)).toThrow(
      'Origin prop is required'
    );
  });

  test('destination prop is required', () => {
    expect(() => DirectionStrategy(<Direction origin="testOrigin" />)).toThrow(
      'Destination prop is required'
    );
  });
});
