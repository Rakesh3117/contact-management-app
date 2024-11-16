import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import EditFormPopover from "../components/EditDetailsPopUp";
import "../CSS/TableRowComponent.css";

const TableRowComponent = ({ row, columns, handleEdit, handleDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickEdit = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = (updatedData) => {
    // console.log(row._id, updatedData);
    handleEdit(row._id, updatedData);
    handleCloseDialog();
  };

  return (
    <>
      <TableRow
        className="table-row-container"
        hover
        role="checkbox"
        tabIndex={-1}
        key={row._id}
      >
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell
              className="table-cell-container"
              key={column.id}
              align={column.align}
            >
              {column.id === "actions" ? (
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleClickEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(row._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </div>
              ) : column.format && typeof value === "number" ? (
                column.format(value)
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>

      <EditFormPopover
        open={openDialog}
        handleClose={handleCloseDialog}
        row={row}
        handleSave={handleSave}
      />
    </>
  );
};

export default TableRowComponent;
