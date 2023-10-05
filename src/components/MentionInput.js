import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MentionInput from './MentionInput';
import "@testing-library/jest-dom/extend-expect"

// Mock the data.json file
jest.mock('../data/data.json', () => [
  { id: 1, name: 'User1' },
  { id: 2, name: 'User2' },
  { id: 3, name: 'User3' },
]);

describe('MentionInput', () => {
  it('renders without errors', () => {
    const { getByPlaceholderText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');
    expect(inputElement).toBeInTheDocument();
  });

  it('detects a mention trigger when typing "@"', () => {
    const { getByPlaceholderText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: '@' } });

    expect(inputElement.value).toBe('@');
  });

  it('shows the dropdown when a mention trigger is detected', () => {
    const { getByPlaceholderText, getByText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: '@' } });

    const dropdownItem = getByText('User1'); // Assuming User1 is in the mocked data
    expect(dropdownItem).toBeInTheDocument();
  });

  it('selects a mention from the dropdown', () => {
    const { getByPlaceholderText, getByText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: '@' } });

    const dropdownItem = getByText('User1'); // Assuming User1 is in the mocked data

    fireEvent.click(dropdownItem);

    expect(inputElement.value).toBe('@User1 ');
  });

  it('navigates through dropdown items using arrow keys', () => {
    const { getByPlaceholderText, getByText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: '@' } });

    const firstDropdownItem = getByText('User1'); // Assuming User1 is in the mocked data
    const secondDropdownItem = getByText('User2'); // Assuming User2 is in the mocked data

    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    expect(secondDropdownItem).toHaveStyle('background-color: #007BFF');

    fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
    expect(firstDropdownItem).toHaveStyle('background-color: #007BFF');
  });

  it('handles the Enter key to select a mention', () => {
    const { getByPlaceholderText, getByText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: '@' } });

    const firstDropdownItem = getByText('User1'); // Assuming User1 is in the mocked data

    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(inputElement.value).toBe('@User1 ');
  });

  it('handles input change', () => {
    const { getByPlaceholderText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText('Type @ to mention someone');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(inputElement.value).toBe('Hello');
  });
});
