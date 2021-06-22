import { fireEvent, render } from "@testing-library/react";

import BigHeader from "../components/bigHeader/bigHeader";

describe("Bigheader test", () => {
  it("Bigheader zonder dat er blauwe tekst is gegeven", () => {
    const { getAllByTestId } = render(<BigHeader text={"hallo daar"} />);

    const [normaleTekst] = getAllByTestId("testNormaleTekst");

    expect(normaleTekst).toHaveClass("makeStyles-normal-4");
  });

  it("Bigheader met blauwe tekst", () => {
    const { getAllByTestId } = render(
      <BigHeader text={"hallo daar"} inBlue={["daar"]} />
    );

    const [normaleTekst] = getAllByTestId("testNormaleTekst");
    const [blauweTekst] = getAllByTestId("testBlauweTekst");

    expect(normaleTekst).toHaveClass("makeStyles-normal-9");
    expect(blauweTekst).toHaveClass("makeStyles-blue-8");
  });
});
