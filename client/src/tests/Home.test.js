import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: "foo" },
    };
  },
}));

jest.mock("../AuthTokenContext", () => ({
  useAuthToken: () => {
    return { accessToken: "123" };
  },
}));


test("Test: Renders home", async () => {
    fetch.resetMocks();
    fetch.mockResponse(
    JSON.stringify([{id: 1, image:"www.test1.com", name : "Jordan 1s", condition: "New", price: "USD 123"},
                    {id: 2, image:"www.test2.com", name : "Jordan 2s", condition: "Pre-Owned/Used", price: "CAD 123"},])
                    );
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Home />
        </MemoryRouter>
    );

    const sneaker1name = await screen.findByText("Jordan 1s");
    const sneaker2name = await screen.findByText("Jordan 2s");

    const sneaker1condition = await screen.findByText("New");
    const sneaker2condition = await screen.findByText("Pre-Owned/Used");

    const sneaker1price = await screen.findByText("USD 123");
    const sneaker2price = await screen.findByText("CAD 123");

    expect(sneaker1name).toBeInTheDocument();
    expect(sneaker2name).toBeInTheDocument();

    expect(sneaker1condition).toBeInTheDocument();
    expect(sneaker2condition).toBeInTheDocument();

    expect(sneaker1price).toBeInTheDocument();
    expect(sneaker2price).toBeInTheDocument();
});
