import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { InputFile } from '@components';

describe('Testing input file component', () => {
  const handleChange = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    url: 'image.jpg',
    name: 'productImage',
    id: 'productImage',
    text: 'Upload Image',
  };

  it('Should render Input File component', () => {
    const { container } = render(<InputFile {...defaultProps} onChange={handleChange} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call onChange when click input file component', () => {
    const file = new File(['image.jpg'], 'image.jpg', { type: 'image/png' });
    const handleChange = jest.fn();
    render(<InputFile {...defaultProps} onChange={handleChange} />);

    const inputFile = screen.getByTestId('input-file-label');
    const input = inputFile.querySelector('input[type="file"]')!;

    act(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(handleChange).toBeCalled();
  });
});
