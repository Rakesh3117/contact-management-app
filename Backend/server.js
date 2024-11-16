const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

MONGO_URI =
  "mongodb+srv://rakeshrakesh6516:rakesh3111@contactsdata.tyiky.mongodb.net/?retryWrites=true&w=majority&appName=contactsData";
const PORT = process.env.PORT || 5000;

const Contacts = require("./Models/Contacts");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(MONGO_URI).then(() => {
  console.log("Mongoose is Connected");
});

app.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, company, jobTitle } =
      req.body;

    const alreadyExist = await Contacts.findOne({ mobileNumber });
    if (alreadyExist) {
      return res.status(400).send("Already Exist");
    }

    const newContact = new Contacts({
      firstName,
      lastName,
      email,
      mobileNumber,
      company,
      jobTitle,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const allContacts = await Contacts.find();
    // console.log(allContacts.length);
    if (allContacts.length <= 0) {
      return res.status(201).json({ message: "No Contacts Available" });
    }
    return res.status(200).json({ contacts: allContacts });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedContact = await Contacts.findByIdAndUpdate(
      { _id: id },
      { ...updatedData, updatedAt: Date.now() }
    );
    if (!updatedContact) {
      return res.status(400).json({ message: "Updated Not SuccessFull" });
    }
    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedContact });
  } catch (err) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contacts.findByIdAndDelete({ _id: id });
    if (!deletedContact) {
      return res.status(400).json({
        message: "Unable to delete the Conatct please Try again later",
      });
    }
    return res.status(200).json({
      message: `${deletedContact.name} conatct is Deleted Successfully`,
      contactDetails: deletedContact,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/bulk-contacts", async (req, res) => {
  try {
    const contacts = req.body;
    const mobileNumbers = contacts.map((contact) => contact.mobileNumber);
    const existingContacts = await Contacts.find({
      mobileNumber: { $in: mobileNumbers },
    });

    if (existingContacts.length > 0) {
      return res.status(400).json({
        message: "Some contacts already exist",
        existingContacts,
      });
    }
    await Contacts.insertMany(contacts);
    res.status(201).json({ message: "Contacts added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is Running at 5000");
});
