import { fireEvent, render } from "@testing-library/react";

import CategorieForm from "../components/categorie/categorieForm";

describe("CategorieForm test", () => {
  it("Categorie toevoegen die leeg is", () => {
    function mockAddCategorie(categorie, lakenhal_activiteit) {
      console.log({
        categorieToegevoegd: categorie,
        lakenhal_activiteit: lakenhal_activiteit,
      });
    };

    const { queryByTestId } = render(<CategorieForm addCategorie={mockAddCategorie} categorieError={true} />)
    
    const categorieInput = queryByTestId("testCategorieInput");
    const submitBtn = queryByTestId("buttonTestSubmit")
    const helperText = queryByTestId("testHelperText");

    fireEvent.change(categorieInput, { taget: {value: ""}});
    fireEvent.click(submitBtn);

    expect(helperText).toHaveTextContent("Categorie bestaat al of categorie is leeg!");
    
  });

  it("Categorie toevoegen die al bestaat", () => {
    function mockAddCategorie(categorie, lakenhal_activiteit) {
      console.log({
        categorieToegevoegd: categorie,
        lakenhal_activiteit: lakenhal_activiteit,
      });
    };

    const { queryByTestId } = render(<CategorieForm addCategorie={mockAddCategorie} categorieError={true} />)
    
    const categorieInput = queryByTestId("testCategorieInput");
    const submitBtn = queryByTestId("buttonTestSubmit")
    const helperText = queryByTestId("testHelperText");

    fireEvent.change(categorieInput, { taget: { value: "testCategorie"}});
    fireEvent.click(submitBtn);

    expect(helperText).toHaveTextContent("Categorie bestaat al of categorie is leeg!");
    
  });

  it("Categorie toevoegen", () => {
    function mockAddCategorie(categorie, lakenhal_activiteit) {
      console.log({
        categorieToegevoegd: categorie,
        lakenhal_activiteit: lakenhal_activiteit,
      });
    };

    const { queryByTestId } = render(<CategorieForm addCategorie={mockAddCategorie} categorieError={false} />)
    
    const categorieInput = queryByTestId("testCategorieInput");
    const submitBtn = queryByTestId("buttonTestSubmit")
    const helperText = queryByTestId("testHelperText");

    fireEvent.change(categorieInput, { taget: { value: "testCategorie"}});
    fireEvent.click(submitBtn);

    expect(helperText).not.toBeTruthy();
    
  });

});
