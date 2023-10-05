import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import MentionInput from "../components/MentionInput";

jest.mock("../data/data.json", () => [
  { id: 1, name: "User1" },
  { id: 2, name: "User2" },
]);

describe("MentionInput component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText("Type @ to mention someone");
    expect(inputElement).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    const { getByPlaceholderText, getByText } = render(<MentionInput />);
    const inputElement = getByPlaceholderText("Type @ to mention someone");

    fireEvent.change(inputElement, { target: { value: "@User" } });

    const dropdownItem = getByText("User1");
    expect(dropdownItem).toBeInTheDocument();
  });

});
