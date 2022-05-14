import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound";

test("Test 1: Renders Not Found copy", () => {
  render(<NotFound />);
  expect(screen.getByText("404 Not Found")).toBeInTheDocument();
});