import { TableContainer, Table as MUITable, TableProps } from "@mui/material";
import classes from "./Table.module.scss";

const Table = (props: TableProps) => {
  return (
    <TableContainer className={classes.tableContainer}>
      <MUITable {...props} />
    </TableContainer>
  );
};

export default Table;
