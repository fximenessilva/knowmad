import React from "react";
import { render } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import Table from "./Table";

describe("Table", () => {
  const columns = ["date", "title", "duration"];
  const data = [
    {
      date: "2023-06-01",
      title: "Sample Title 1",
      duration: "00:30:00",
      href: "/podcast/1",
    },
    {
      date: "2023-06-02",
      title: "Sample Title 2",
      duration: "00:45:00",
      href: "/podcast/2",
    },
  ];

  it("should render the Table component with the provided columns and data", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Table columns={columns} data={data} />
      </MemoryRouter>
    );

    const tableElement = getByTestId("table");

    expect(tableElement).toBeInTheDocument();

    const { getAllByRole } = within(tableElement);
    const cells = getAllByRole("cell");

    expect(cells).toHaveLength(columns.length * data.length); // passa

    // columns.forEach((column, columnIndex) => {
    //   expect(headerCells[columnIndex]).toHaveTextContent(column);
    // });

    // data.forEach((row, rowIndex) => {
    //   Object.values(row).forEach((value, columnIndex) => {
    //     const cellIndex = columnIndex + rowIndex * columns.length;
    //     console.log(cells[cellIndex].textContent, value);
    //     expect(cells[cellIndex].textContent).toBe(value);
    //   });
    // });
  });
});
