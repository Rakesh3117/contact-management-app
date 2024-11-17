# Contact Management Application

This project is a full-stack Contact Management application designed to manage contacts efficiently. It features a React frontend styled with Material UI and a Node.js backend with MongoDB for data persistence.

---

## **Features**
- **Frontend**: Built using React, Material UI for design, and Axios for API requests.
- **Backend**: Developed with Node.js and Express, with MongoDB as the database.
- **Authentication**: Secured using JSON Web Tokens (JWT).
- **CRUD Operations**: Create, read, update, and delete contacts.
- **Toast Notifications**: Visual feedback for user actions.
- **Search Functionality**: Quickly search through the contact list.

---

## **Workflow**

### **Step 1: Prerequisites**
Before starting, ensure you have the following installed:
1. **Node.js** (v14 or higher)
2. **npm** (comes with Node.js)
3. **MongoDB** (local or cloud-based)

---

### **Step 2: Clone the Repository**

 ```bash
git clone https://github.com/Rakesh3117/contact-management-app.git
cd contact-management-app
```
## **Project Setup and Workflow**

### **Step 1: Install Dependencies**

Run the following command at the project root to install dependencies for both frontend and backend:

```bash
npm run install-all
npm start
```


## Features Workflow

### 1. Add New Contact
- Click the **"New Contact"** button.
- Fill in the form fields.
- Click **"Save Contact"**. If fields are empty, validation will highlight them in red.

### 2. Edit Contact
- Click the **Edit** icon next to a contact.
- Modify fields in the dialog.
- Click **"Save Changes"**. Empty fields will display in red, and the form won't submit.

### 3. Delete Contact
- Click the **Delete** icon next to a contact.
- Confirm deletion in the dialog box.
- The contact will be removed from the list.

### 4. Search Contacts
- Use the search bar to filter contacts by name, email, or other fields.

### 5. Toast Notifications
- Success or error messages appear as toasts at the top-right corner of the screen.

---

## Technologies Used

### Frontend
- **React (18+)**
- **Material UI**
- **Axios**
- **React Toastify**
- **React Router DOM**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JSON Web Tokens (JWT)**

