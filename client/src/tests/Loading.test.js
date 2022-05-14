import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

test("Test 1: Renders loading copy", () => {
  render(<Loading />);
  expect(screen.getByText("LOADING")).toBeInTheDocument();
});