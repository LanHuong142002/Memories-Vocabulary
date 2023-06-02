import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import App from '../App';

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('App', () => {
  test('Should render homepage', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  test('Should render details page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/details/123']}>
        <App />
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
