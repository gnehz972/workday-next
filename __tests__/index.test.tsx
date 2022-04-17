import { render, screen } from "@testing-library/react";
import Home from "../pages";
import { SnackbarProvider } from "notistack";

jest.spyOn(global, "fetch").mockImplementation(
  jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ) as jest.Mock
);

describe("Home", () => {
  it("should render title", async () => {
    render(
      <SnackbarProvider maxSnack={3}>
        <Home employees={[{ name: "Tom", group: "A" }]} />
      </SnackbarProvider>
    );
    const appBar = await screen.findByText("Work day");
    expect(appBar).toBeInTheDocument();
  });
});
