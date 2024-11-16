import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Navbar from "./Navbar";
import TableComponent from "./TableComponent";
import NewContact from "./NewContact";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const [openNewContact, setOpenNewContact] = useState(false);
  const [sortBy, setSortBy] = useState(""); // State to handle sorting

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/contacts");
      setContactsList(res.data.contacts);
      setSearchContacts(res.data.contacts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenNewContact = () => setOpenNewContact(true);
  const handleCloseNewContact = () => setOpenNewContact(false);

  const handleSaveNewContact = async (newContact) => {
    try {
      const res = await axios.post("http://localhost:5000/contacts", {
        ...newContact,
      });
      console.log(res.data);
      fetchContacts();
      toast.success("Contact Added successfully!");
    } catch (err) {
      toast.error("Failed to Add Contact!");
      console.log(err);
    }
  };

  const handleEdit = async (id, details) => {
    try {
      const res = await axios.put(`http://localhost:5000/contacts/${id}`, {
        ...details,
      });
      fetchContacts();
      toast.success("Contact Edited successfully");
      console.log(res);
    } catch (err) {
      toast.error("Failed to Edit Contact");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/contacts/${id}`);
      console.log(res);
      toast.success("Contact Deleted successfully");
      if (res.status === 200) {
        fetchContacts();
      }
    } catch (err) {
      toast.error("Failed to Delete Contact");
      console.log(err);
    }
  };

  const handleSearchContacts = (searchInput) => {
    const updatedContacts = contactsList.filter((contact) => {
      return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });

    setSearchContacts(updatedContacts);
  };

  const handleSortChange = (event) => {
    const criterion = event.target.value;
    setSortBy(criterion);

    const sortedContacts = [...searchContacts].sort((a, b) => {
      if (criterion === "name") {
        return a.firstName.localeCompare(b.firstName);
      } else if (criterion === "mobileNumber") {
        return a.mobileNumber.localeCompare(b.mobileNumber);
      }
      return 0;
    });

    setSearchContacts(sortedContacts);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: "97%", overflow: "hidden", padding: 2 }}>
      <Navbar />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          marginTop: "30px",
          paddingLeft: "40px",
          boxSizing: "border-box",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenNewContact}
        >
          New Contact
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ width: "200px" }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="mobileNumber">Mobile Number</MenuItem>
            </Select>
          </FormControl>
          <SearchBar onSearch={handleSearchContacts} />
        </Box>
      </Box>
      <NewContact
        open={openNewContact}
        handleClose={handleCloseNewContact}
        handleSave={handleSaveNewContact}
      />
      <TableComponent
        contactsList={searchContacts}
        fetchContacts={fetchContacts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
