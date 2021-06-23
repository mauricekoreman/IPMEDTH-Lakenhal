import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  queryByAttribute,
  queryByTestId,
} from "@testing-library/react";
import { rest } from "msw";

import RegistreerForm from "../components/authentication/registerForm";

describe("Register form", () => {
  it("Renders the default state", () => {
    const { queryByTestId } = render(<RegistreerForm />);
  });
});

test("Renders form", () => {
  render(<RegistreerForm />);
  expect(screen.getByTestId("testForm")).toBeTruthy();
});

test("handles server error", async () => {
  server.use(
    rest.get("/register", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { queryByTestId } = render(<RegistreerForm />);

  const naam = queryByTestId("testNaamInput");
  const email = queryByTestId("testEmailInput");
  const wachtwoord = queryByTestId("testWachtwoordInput");
  const confirm_wachtwoord = queryByTestId("testBevestigWachtwoordInput");

  fireEvent.change(naam, { target: { value: "Maurice" } });
  fireEvent.change(email, { target: { value: "testEmail@gmail.com" } });
  fireEvent.change(wachtwoord, { target: { value: "testWachtwoord" } });
  fireEvent.change(confirm_wachtwoord, {
    target: { value: "testWachtwoord" },
  });
});
