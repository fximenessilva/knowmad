import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Noop from "../../utils/Noop";
import styles from "./table.module.scss";

const Table = ({ columns, data }) => {
  return (
    <table className={styles.table} data-testid="table">
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

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
      duration: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default Table;
