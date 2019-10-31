import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { StaticGoogleMap, Marker, Path, Direction } from '../src/index';

afterEach(cleanup);

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
    expect(() => render(<StaticGoogleMap />)).toThrowError();
    expect(console.error).toHaveBeenCalled();
  });

  test('It throws if no child is present', () => {
    console.error = jest.fn();
    expect(() => render(<StaticGoogleMap size="200x200" />)).toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('It renders an image with default props', () => {
    const { getByAltText } = render(
      <StaticGoogleMap size="test" alt="static-map">
        <Marker location="location" />
      </StaticGoogleMap>
    );

    const element = getByAltText('static-map');

    expect(element).not.toBeNull();
    expect(element.localName).toBe('img');
    expect(element).toMatchSnapshot();
  });

  test('It renders composite child elements', () => {
    const RedMarker = ({ color, ...props }) => (
      <Marker color="red" {...props} />
    );

    const { getByAltText } = render(
      <StaticGoogleMap size="test" alt="static-map">
        <RedMarker location="test" />
      </StaticGoogleMap>
    );

    const node = getByAltText('static-map');

    expect(node.getAttribute('src').includes('marker')).toBe(true);
    expect(node.getAttribute('src')).toContain('color:red');
  });

  test('It calls onGenerate method when a URL is successfully generated', () => {
    const onGenerate = jest.fn();

    const { getByAltText } = render(
      <StaticGoogleMap size="test" onGenerate={onGenerate} alt="static-map">
        <Marker location="test" />
        <Path points="test" />
      </StaticGoogleMap>
    );

    const node = getByAltText('static-map');
    const url = node.getAttribute('src');

    expect(url).toBeTruthy();
    expect(onGenerate).toHaveBeenCalledTimes(1);
    expect(onGenerate).toHaveBeenCalledWith(url);
  });

  test('It passes unknown props to the rendered component', () => {
    const title = 'A test title';
    const alt = 'An alternate property';

    const { getByTestId } = render(
      <StaticGoogleMap
        size="test"
        title={title}
        alt={alt}
        data-testid="static-map"
      >
        <Marker location="test" />
      </StaticGoogleMap>
    );

    const node = getByTestId('static-map');

    expect(node.localName).toBe('img');
    expect(node.getAttribute('title')).toBe(title);
    expect(node.getAttribute('alt')).toBe(alt);
  });

  test('Direction renders path', async () => {
    const testStrategy = jest.fn(() => Promise.resolve('test'));

    const { getByAltText, container, debug } = render(
      <StaticGoogleMap size="testSize" alt="static-map">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    const node = await waitForElement(() => getByAltText('static-map'), {
      container
    });
    const link = node.getAttribute('src');

    expect(link).toContain('enc:test');
    expect(link).toContain('path=');
    expect(node).toMatchSnapshot();
  });

  test('Direction sends parent apiKey', () => {
    const testStrategy = jest.fn(() => Promise.resolve('test'));
    const apiKey = 'parentAPIKey';

    render(
      <StaticGoogleMap size="testSize" apiKey={apiKey} alt="static-map">
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

  test('A span is rendered if image generation failed', async () => {
    expect.assertions(3);
    const testStrategy = jest.fn(() => Promise.reject('test'));

    const { getByText, getByAltText, container } = render(
      <StaticGoogleMap size="testSize" alt="static-map">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    expect(testStrategy).toHaveBeenCalledTimes(1);

    await waitForElement(() => getByAltText('static-map'), {
      container
    }).catch(e => {
      expect(e).toBeDefined();
    });

    const node = await waitForElement(
      () => getByText('Image generation failed.'),
      {
        container
      }
    );

    expect(node.localName).toBe('span');
  });
});
