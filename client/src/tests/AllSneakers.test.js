import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllSneakers from "../components/AllSneakers"


test("Test 1: renders a single sneaker", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AllSneakers 
        id = {1}
        image = {"www.test1.com"}
        name = {"Jordan 1s"}
        condition = {"New"}
        price = {"USD 123"}/>
    </MemoryRouter>
  );

  const sneaker1name = await screen.findByText("Jordan 1s");
  const sneaker1condition = await screen.findByText("New");
  const sneaker1price = await screen.findByText("USD 123");

  expect(sneaker1name).toBeInTheDocument();
  expect(sneaker1condition).toBeInTheDocument();
  expect(sneaker1price).toBeInTheDocument();

});