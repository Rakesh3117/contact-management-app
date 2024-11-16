import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const EditDetailsPopUp = ({ open, handleClose, row, handleSave }) => {
  const [formData, setFormData] = useState({
    firstName: row.firstName || "",
    lastName: row.lastName || "",
    email: row.email || "",
    mobileNumber: row.mobileNumber || "",
    company: row.company || "",
    jobTitle: row.jobTitle || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? "This field is required" : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSave(formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputLabelProps={{
              style: { color: errors.firstName ? "red" : undefined },
            }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputLabelProps={{
              style: { color: errors.lastName ? "red" : undefined },
            }}
          />
          <TextField
            label="Phone Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
            InputLabelProps={{
              style: { color: errors.mobileNumber ? "red" : undefined },
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{
              style: { color: errors.email ? "red" : undefined },
            }}
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.company}
            helperText={errors.company}
            InputLabelProps={{
              style: { color: errors.company ? "red" : undefined },
            }}
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
            InputLabelProps={{
              style: { color: errors.jobTitle ? "red" : undefined },
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDetailsPopUp;
