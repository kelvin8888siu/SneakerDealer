import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginRegister from "../components/LoginRegister";

let mockIsAuthenticated = false;
const mockLoginWithRedirect = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
      return {
        isLoading: false,
        isAuthenticated: mockIsAuthenticated,
        loginWithRedirect: mockLoginWithRedirect,
      };
    },
  }));
  

test("Test 1: User not authenticated, renders Login and Create Account Button", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <LoginRegister />
        </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
});

test("Test 2: User authenticated, renders Home and Create Account Button", () => {
    mockIsAuthenticated = true;
    render(
        <MemoryRouter initialEntries={["/"]}>
          <LoginRegister />
        </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
});


test("Test 3: Login button calls loginWithRedirect", () => {
    mockIsAuthenticated = false;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginRegister />
      </MemoryRouter>
    );
  
    const loginButton = screen.getByText("Login");
    fireEvent(loginButton, new MouseEvent('click', {bubbles: true, cancelable: true,}));

    expect(mockLoginWithRedirect).toHaveBeenCalled();
});

test("Test 4: Home button calls loginWithRedirect", () => {
  mockIsAuthenticated = true;

  render(
    <MemoryRouter initialEntries={["/"]}>
      <LoginRegister />
    </MemoryRouter>
  );

  const homeButton = screen.getByText("Home");
  fireEvent(homeButton, new MouseEvent('click', {bubbles: true, cancelable: true,}));

  expect(mockLoginWithRedirect).toHaveBeenCalled();
});

test("Test 5: Create account button calls loginWithRedirect", () => {
  mockIsAuthenticated = true;

  render(
    <MemoryRouter initialEntries={["/"]}>
      <LoginRegister />
    </MemoryRouter>
  );

  const createAccountButton = screen.getByText("Create Account");
  fireEvent(createAccountButton, new MouseEvent('click', {bubbles: true, cancelable: true,}));

  expect(mockLoginWithRedirect).toHaveBeenCalled();
});





