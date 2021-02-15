import React from 'react';
import { render, screen } from '@testing-library/react';
import { StaticGoogleMap, Marker, Path, Direction } from '../src/index';

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
    render(
      <StaticGoogleMap size="test" alt="static-map">
        <Marker location="location" />
      </StaticGoogleMap>
    );

    const element = screen.getByAltText('static-map');

    expect(element).not.toBeNull();
    expect(element.localName).toBe('img');
    expect(element).toMatchSnapshot();
  });

  test('It renders composite child elements', () => {
    const RedMarker = ({ color, ...props }) => (
      <Marker color="red" {...props} />
    );

    render(
      <StaticGoogleMap size="test" alt="static-map">
        <RedMarker location="test" />
      </StaticGoogleMap>
    );

    const node = screen.getByAltText('static-map');

    expect(node.getAttribute('src').includes('marker')).toBe(true);
    expect(node.getAttribute('src')).toContain('color:red');
  });

  test('It calls onGenerate method when a URL is successfully generated', () => {
    const onGenerate = jest.fn();

    render(
      <StaticGoogleMap size="test" onGenerate={onGenerate} alt="static-map">
        <Marker location="test" />
        <Path points="test" />
      </StaticGoogleMap>
    );

    const node = screen.getByAltText('static-map');
    const url = node.getAttribute('src');

    expect(url).toBeTruthy();
    expect(onGenerate).toHaveBeenCalledTimes(1);
    expect(onGenerate).toHaveBeenCalledWith(url);
  });

  test('It passes unknown props to the rendered component', () => {
    const title = 'A test title';
    const alt = 'An alternate property';

    render(
      <StaticGoogleMap size="test" title={title} alt={alt}>
        <Marker location="test" />
      </StaticGoogleMap>
    );

    const node = screen.getByRole('img');

    expect(node.getAttribute('title')).toBe(title);
    expect(node.getAttribute('alt')).toBe(alt);
  });

  test('Direction renders path', async () => {
    const testStrategy = jest.fn(() => Promise.resolve('test'));

    render(
      <StaticGoogleMap size="testSize" alt="static-map">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    const node = await screen.findByAltText('static-map');
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
    expect.assertions(4);
    const testStrategy = jest.fn(() => Promise.reject('test'));
    console.error = jest.fn();

    render(
      <StaticGoogleMap size="testSize" alt="static-map">
        <Direction
          origin="testOrigin"
          destination="testDestination"
          requestStrategy={testStrategy}
        />
      </StaticGoogleMap>
    );

    expect(testStrategy).toHaveBeenCalledTimes(1);

    const node = await screen.findByText('Image generation failed.');
    expect(node.localName).toBe('span');
    expect(console.error).toHaveBeenCalledTimes(1);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('ULR should have signature as last part', async () => {
    const title = 'A test title';
    const signature = 'A test signature';
    const alt = 'An alternate property';
    const hasSignAtEnd = str => new RegExp(`.*&signature=${signature}$`).test(str);
    render(
      <StaticGoogleMap size="test" title={title} alt={alt} signature={signature}>
        <Marker location="test" />
      </StaticGoogleMap>
    );

    const node = screen.getByRole('img');
    const src = node.getAttribute('src');

    expect(hasSignAtEnd(src)).toBe(true);
  });
});
