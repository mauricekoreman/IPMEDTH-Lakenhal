import { fireEvent, queryByTestId, render } from "@testing-library/react";

import AanmeldingenCard from "../components/detailPost/aanmeldingenCard";

describe("AanmeldingenCard test", () => {
  it("renders profiel kaartje", () => {
    const mockAangemeldeUser = { user_ID: 1, activiteit_ID: 1, naam: "TestUser", bericht: "Een testmotivatie"}  
    
    const { queryByTestId } = render(<AanmeldingenCard aangemeldeUser={mockAangemeldeUser} />);

    const naam = queryByTestId("testNaam");
    const bericht = queryByTestId("testBericht");

    expect(naam).toHaveTextContent("TestUser");
    expect(bericht).toHaveTextContent("Een testmotivatie")
  })
  
  it("Er wordt een profiel getoond als op profiel bekijken is geklikt ", () => {
    const mockAangemeldeUser = { user_ID: 1, activiteit_ID: 1, naam: "TestUser", bericht: "Een testmotivatie"}

    const { queryByTestId, getByTestId } = render(<AanmeldingenCard aangemeldeUser={mockAangemeldeUser} />);

    const btn = queryByTestId("testButton");
    
    fireEvent.click(btn);

    const testProfielTab = getByTestId("testProfielTab");
    
    expect(testProfielTab).toBeVisible();
  });
})