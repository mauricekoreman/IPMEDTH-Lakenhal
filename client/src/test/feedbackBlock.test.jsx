import { render } from '@testing-library/react';

import FeedbackBlock from '../components/feedbackBlock/feedbackBlock';

describe("Feedbackblock test", () => {
  it("Weergeeft groen als de feedback succesvol is", () => {
    const { queryByTestId} = render(<FeedbackBlock success={true} text={"Sucess!"} />);

    const block = queryByTestId("feedbackTest");
    expect(block).toHaveStyle('background-color: #DAF9DA')

  });

  it("Weergeeft rood als de feedback negatief is", () => {
    const { queryByTestId} = render(<FeedbackBlock success={false} text={"Sucess!"} />);

    const block = queryByTestId("feedbackTest");
    expect(block).toHaveStyle('background-color: #EE9090')

  })
})