// Constants
import { ROUTES } from '@constants';
import WrapperHeader from '../WrapperHeader';
import * as reactRouter from 'react-router-dom';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
const mockLocation = {
  pathname: '/123123',
  state: null,
  key: '',
  search: '',
  hash: '',
};

describe('Test WrapperHeader', () => {
  it('Should render WrapperHeader', () => {
    const { container } = renderWithThemeProvider(<WrapperHeader />);

    expect(container).toBeInTheDocument();
  });

  it('Should render a tag with href is home ', () => {
    jest.spyOn(reactRouter, 'useLocation').mockReturnValue(mockLocation);
    const { getByText } = renderWithThemeProvider(<WrapperHeader />);

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });
});
