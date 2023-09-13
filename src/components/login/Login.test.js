import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "john" },
    }),
  },
}));

it("username input should be rendered", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput).toBeInTheDocument();
});
it("password input should be rendered", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
it("login button should be rendered", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});
it("username input should be empty", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput.value).toBe("");
});
it("password input should be empty", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});
it("login button should be disabled", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeDisabled();
});
it("loading should not be rendered ", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).not.toHaveTextContent(/please wait/i);
});
it("error message should not be visible", () => {
  render(<Login />);
  const buttonElement = screen.getByTestId("error");
  expect(buttonElement).not.toBeVisible();
});
it("username input should be change", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});
it("password input should be change", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});
it("button should not be disabled when input exist", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });

  expect(buttonElement).not.toBeDisabled();
});

it("loading should be rendered when clicked", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/please wait/i);
});

it("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonElement);
  await waitFor(() =>
    expect(buttonElement).not.toHaveTextContent(/please wait/i)
  );
});
it("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonElement);
  const userItem = await screen.findByText("john");
  expect(userItem).toBeInTheDocument();
});
