// libs
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { Button } from '../Button';

describe('Testing button compoennt', () => {
  test('renders a button element', () => {
    render(
      <Button label='Click me' primary={false} size='medium' backgroundColor='a' state={'a'} />,
    );
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the label correctly', () => {
    render(
      <Button label='Click me' primary={false} size='medium' backgroundColor='a' state={'a'} />,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Click me');
  });

  test('renders the correct class name and style', () => {
    render(
      <Button label='Click me' primary={true} size='large' backgroundColor='red' state={'a'} />,
    );
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass(
      'storybook-button storybook-button--large storybook-button--primary',
    );
  });

  test('renders with the correct props', () => {
    render(
      <Button label='Click me' primary={true} size='large' backgroundColor='red' state={'a'} />,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement).toHaveAttribute(
      'class',
      'storybook-button storybook-button--large storybook-button--primary',
    );
  });
});
