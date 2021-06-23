import { fireEvent, queryByTestId, render } from "@testing-library/react";

import CategorieCard from "../components/categorie/categorieCard";

describe("CategorieCard test", () => {
  it("CategorieCard zonder lakenhal logo", () => {
    const mockCategorie = "testCategorie";
    const mockDeleteCategorie = () => {
      console.log("deleted categorie");
    };
    const mockLakenhal = false;
    const mockCategorie_ID = 1;

    const { queryByTestId } = render(
      <CategorieCard
        categorie={mockCategorie}
        deleteCategorie={mockDeleteCategorie}
        lakenhal={mockLakenhal}
        categorie_ID={mockCategorie_ID}
      />
    );

    const itemZonderLakenhal = queryByTestId("testLakenhalCategorie");

    expect(itemZonderLakenhal).not.toBeTruthy();
  });

  it("CategorieCard met lakenhal logo", () => {
    const mockCategorie = "testCategorie";
    const mockDeleteCategorie = () => {
      console.log("deleted categorie");
    };
    const mockLakenhal = true;
    const mockCategorie_ID = 1;

    const { queryByTestId } = render(
      <CategorieCard
        categorie={mockCategorie}
        deleteCategorie={mockDeleteCategorie}
        lakenhal={mockLakenhal}
        categorie_ID={mockCategorie_ID}
      />
    );

    const itemZonderLakenhal = queryByTestId("testLakenhalCategorie");

    expect(itemZonderLakenhal).toBeTruthy();
  });
});
