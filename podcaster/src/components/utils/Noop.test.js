import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Noop from "./Noop";

it("should render the component with props when the condition is true", () => {
  const MockComponent = ({ text }) => <div>{text}</div>;

  const { getByText, queryByText } = render(
    <Noop component={MockComponent} condition={true} props={{ text: "Hello" }}>
      World!
    </Noop>
  );

  const componentElement = getByText("Hello");
  const contentElement = queryByText("World!");

  expect(componentElement).toBeInTheDocument();
  expect(contentElement).toBeNull();
});
