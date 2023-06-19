import React from "react";
import { Link } from "react-router-dom";

import Noop from "components/utils/Noop";

import styles from "./table.module.scss";

const Table = ({ columns, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className={styles.th} key={index}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => {
              const isTitle = column === "title";
              return (
                <td
                  className={`${styles.td} ${isTitle ? styles.title : ""}`}
                  key={index}
                >
                  <Noop
                    condition={isTitle}
                    component={Link}
                    props={{ to: row.href }}
                  >
                    {row[column]}
                  </Noop>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
