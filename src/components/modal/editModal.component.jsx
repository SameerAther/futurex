import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const EditEmployeeModal = ({ currentRow, onEdit, index }) => {
  const [open, setOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(currentRow[index]);

  const handleOpen = () => {
    setOpen(true);
    setEditedRow(currentRow[index]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (
      !editedRow.firstName ||
      !editedRow.lastName ||
      !editedRow.email ||
      !editedRow.salary ||
      !editedRow.date
    ) {
      alert("Please fill in all the required fields correctly.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedRow.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    onEdit(index, editedRow);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={editedRow.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editedRow.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editedRow.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            value={editedRow.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            value={editedRow.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditEmployeeModal;
