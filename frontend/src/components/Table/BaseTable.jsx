import React from "react";
import MUIDataTable from "mui-datatables";

import isSubSequence from "../../utils/isSubSequence";

const baseOptions = {
  download: false,
  print: false,
  viewColumns: false,
  selectableRows: "none",
  responsive: "standard",
  rowsPerPage: 50,
  rowsPerPageOptions: [10, 20, 50, 100],
  customSearch: (query, curr) => isSubSequence(query, curr[0]),
};
const BaseTable = ({ columns, data, options = {} }) => {
  options = { ...options, ...baseOptions };
  return <MUIDataTable columns={columns} options={options} data={data} />;
};

export default BaseTable;
