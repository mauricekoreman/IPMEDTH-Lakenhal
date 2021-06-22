import {
  fireEvent,
  getByTitle,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";

import InschrijvenActiviteit from "../components/activiteit/inschrijvenActiviteit";

describe("inschrijven activiteit", () => {
  it("Voordat er op de 'doe mee' knop is gedrukt", () => {
    const mockUser = { user_ID: 1 };
    const mockActiviteit = 1;

    const { getByTestId } = render(
      <InschrijvenActiviteit user={mockUser} activiteit={mockActiviteit} />
    );

    const button = getByTestId("buttonTestInput");
    expect(button).toBeVisible();
  });

  it("Tekstvak verschijnt nadat er op de doe mee knop is gedrukt", () => {
    const mockUser = { user_ID: 1 };
    const mockActiviteit = 1;

    const { getByTestId } = render(
      <InschrijvenActiviteit user={mockUser} activiteit={mockActiviteit} />
    );

    const button = getByTestId("buttonTestInput");

    fireEvent.click(button);

    expect(getByTestId("testMotivatieInput")).toBeTruthy();
  });

  it("Testvak wordt ingevuld en state value klopt", () => {
    const mockUser = { user_ID: 1 };
    const mockActiviteit = 1;

    const { getByTestId } = render(
      <InschrijvenActiviteit user={mockUser} activiteit={mockActiviteit} />
    );

    const button = getByTestId("buttonTestInput");
    fireEvent.click(button);

    const input = getByTestId("testMotivatieInput");
    fireEvent.change(input, { target: { value: "testvalue" } });
    expect(input.value).toBe("testvalue");
  });
});
