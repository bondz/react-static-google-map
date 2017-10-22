import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticGoogleMap, Marker, Path, Direction } from '../src/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Components', () => {
  test('It exports Components', () => {
    expect(StaticGoogleMap).toBeDefined();
    expect(Marker).toBeDefined();
    expect(Path).toBeDefined();
    expect(Direction).toBeDefined();
  });

  test('Marker and Path component have Group property', () => {
    expect(Marker.Group).toBeDefined();
    expect(Path.Group).toBeDefined();
  });

  test('It throws if size property is not set', () => {
    console.error = jest.fn();
    expect(() => mount(<StaticGoogleMap />)).toThrowError();
    expect(console.error).toHaveBeenCalled();
  });

  test('It throws if no child is present', () => {
    console.error = jest.fn();
    expect(() => mount(<StaticGoogleMap size="200x200" />)).toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('It renders an image with default props', done => {
    const wrapper = mount(
      <StaticGoogleMap size="test">
        <Marker location="location" />
      </StaticGoogleMap>
    );

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      expect(node.localName).toBe('img');
      expect(node).toMatchSnapshot();
      done();
    });
  });

  test.skip('It renders composite child elements', done => {
    const RedMarker = ({ color, ...props }) => (
      <Marker color="red" {...props} />
    );

    const wrapper = mount(
      <StaticGoogleMap size="test">
        <RedMarker location="test" />
      </StaticGoogleMap>
    );

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      expect(node.getAttribute('src').includes('marker')).toBe(true);
      done();
    }, 15);
  });

  test('It calls onGenerate method when a URL is successfully generated', done => {
    const onGenerate = jest.fn();
    const wrapper = mount(
      <StaticGoogleMap size="test" onGenerate={onGenerate}>
        <Marker location="test" />
        <Path points="test" />
      </StaticGoogleMap>
    );

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      const url = node.getAttribute('src');
      expect(url).toBeTruthy();
      expect(onGenerate).toHaveBeenCalledTimes(1);
      expect(onGenerate).toHaveBeenCalledWith(url);
      done();
    });
  });

  test('It passes unknown props to the rendered component', done => {
    const title = 'A test title';
    const alt = 'An alternate property';
    const wrapper = mount(
      <StaticGoogleMap size="test" title={title} alt={alt}>
        <Marker location="test" />
      </StaticGoogleMap>
    );

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      expect(node.localName).toBe('img');
      expect(node.getAttribute('title')).toBe(title);
      expect(node.getAttribute('alt')).toBe(alt);
      done();
    });
  });

  test('Direction renders path', done => {
    const testStrategy = jest.fn(data => Promise.resolve('test'));

    const wrapper = mount(
      <StaticGoogleMap size="testSize">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      const link = node.getAttribute('src');
      expect(link).toContain('enc:test');
      expect(link).toContain('path=');
      expect(node).toMatchSnapshot();
      done();
    });
  });

  test('Direction sends parent apiKey', () => {
    const testStrategy = jest.fn(data => Promise.resolve('test'));
    const apiKey = 'parentAPIKey';

    const wrapper = mount(
      <StaticGoogleMap size="testSize" apiKey={apiKey}>
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    expect(testStrategy).toHaveBeenCalledTimes(1);
    expect(testStrategy.mock.calls[0][0].key).toBe(apiKey);
  });

  test('A span is rendered if image geneation failed', done => {
    const testStrategy = jest.fn(data => Promise.reject('test'));

    const wrapper = mount(
      <StaticGoogleMap size="testSize">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    expect(testStrategy).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      wrapper.update();
      const node = wrapper.getDOMNode();
      expect(node.localName).toBe('span');
      expect(node.textContent).toBe('Image generation failed.');
      done();
    });
  });
});
