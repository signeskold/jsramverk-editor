import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('There is a button named "Save" in the document', () => {
    const { container } = render(<App />);
    const button = screen.getByRole("button", {name: 'Save'})
    expect(button).toBeInTheDocument();
});

test('The text "File name" is found in the document', () => {
    const { container } = render(<App />);
    const linkElement = screen.getByText(/File name/i);
    expect(linkElement).toBeInTheDocument();
});

test('Form should appear when button New is pressed', () => {
    const { container } =render(<App />);
    const button = screen.getByRole("button", {name: 'New'});
    fireEvent.click(button);
    const pholder = screen.getByPlaceholderText("Enter file name");
    expect(pholder).toBeInTheDocument();
});
