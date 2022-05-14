import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      logout: jest.fn(),
    };
  },
}));

test("Test 1: Renders navigation bar", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <NavigationBar />
        </MemoryRouter>
    );

    const websiteName = screen.getByText("SneakerDealer");
    const home = screen.getByText("Home");
    const login = screen.getByText("Login");
    const logout = screen.getByText("Logout");    
    const account = screen.getByText("Account");

    fireEvent(account, new MouseEvent('click', {bubbles: true, cancelable: true,}));
    const profile = screen.getByText("Profile");
    const sell = screen.getByText("Sell");

    expect(websiteName).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(account).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(sell).toBeInTheDocument();
});

//expect(screen.getByText('Click Me').closest('a')).toHaveAttribute('href', 'https://www.test.com/')

test("Test 2: Testing all href", () => {
  render(
      <MemoryRouter initialEntries={["/"]}>
          <NavigationBar />
      </MemoryRouter>
  );

  const websiteName = screen.getByText("SneakerDealer");
  expect(websiteName.closest('a')).toHaveAttribute('href', '/app');

  const login = screen.getByText("Login");
  expect(login.closest('a')).toHaveAttribute('href', '/loginregister');

  const logout = screen.getByText("Logout");
  expect(logout.closest('a')).toHaveAttribute('href', '/app/logout');

  // Click Account in order to access Profile and Sell
  const account = screen.getByText("Account");
  fireEvent(account, new MouseEvent('click', {bubbles: true, cancelable: true,}));

  const profile = screen.getByText("Profile");
  expect(profile.closest('a')).toHaveAttribute('href', '/app/profile');

  const sell = screen.getByText("Sell");
  expect(sell.closest('a')).toHaveAttribute('href', '/app/sell');
});