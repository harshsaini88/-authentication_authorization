# Node.js Authentication and Authorization Project

Welcome to the Node.js Authentication and Authorization project! This application is designed to be a robust system with user authentication, role-based access control, and secure API endpoints.

## Table of Contents

1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Starting the Application](#starting-the-application)

2. [User Management](#user-management)
    - [Signup](#signup)
    - [Login](#login)
    - [Modify User Details](#modify-user-details)
    - [Delete User](#delete-user)

3. [Roles and Access Control](#roles-and-access-control)
    - [Roles](#roles)
    - [Admin Access](#admin-access)
    - [User Access](#user-access)

4. [Admin Management](#admin-management)
    - [Create Admin](#create-admin)

5. [Authentication and Security](#authentication-and-security)
    - [Authentication](#authentication)
    - [Password Encryption](#password-encryption)

6. [Image Storage](#image-storage)
    - [Profile Image](#profile-image)

7. [Database and Framework](#database-and-framework)
    - [Framework](#framework)
    - [Database](#database)

8. [Data Validation](#data-validation)

9. [File Structure](#file-structure)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Initialize the project:**

   ```bash
   npm init -y

   ```

2. **Install the required dependencies:**

   ```bash
   npm install express ejs mongoose body-parser express-validator bcrypt jsonwebtoken multer cors
   ```

3. **Starting the Application:**

   ```bash
   npm start
   ```

4. **Access your application:**

   Once the application is running, you can access it by navigating to the specified port in your browser (default is usually `http://localhost:3000`).

## User Management

### Signup

- During the signup process, users are required to provide basic details, including email, phone number, name, profile image, and password.
- Passwords are encrypted using a secure encryption algorithm.

### Login

- Users can log in using either email or phone and their corresponding password.

### Modify User Details

- Users can modify their own name and profile image.
- Phone number and email, once entered, cannot be changed.

### Delete User

- Users have the ability to delete their accounts.

## Roles and Access Control

### Roles

- Two roles are defined: Admin and User.

### Admin Access

- Admins can view, modify, and delete all user details.

### User Access

- Users can only view, modify, and delete their own details.

## Admin Management

### Create Admin

- APIs are provided to allow the creation of admin accounts.

## Authentication and Security

### Authentication

- JSON Web Tokens (JWT) are implemented for secure authentication.

### Password Encryption

- User passwords are securely encrypted using bcrypt.

## Image Storage

### Profile Image

- Profile images can be saved either in the local system or integrated with a third-party service (multer).
- Image URLs are designed to work, at least in the local environment.

## Database and Framework

### Framework

- Express.js is utilized for API development.

### Database

- MongoDB Atlas is used as the database. Make sure your internet connection is active for database connectivity.

## Data Validation

- Thorough data validation is implemented to ensure the correctness and integrity of input data.



# File Structure

Here's a breakdown of the project's file structure:

`server.js`: The main entry point of the application..

- **`config/`**:
  - `config.js`: Stores database URL and JWT secret key.

- **`controllers/`**:
  - `adminController.js`: Implements functionality for admin-related operations.
  - `userController.js`: Implements functionality for user-related operations.

- **`middleware/`**:
  - `authMiddleware.js`: Implements JWT authorization middleware.

- **`models/`**:
  - `userModels.js`: Defines the User and Admin data models.

- **`routes/`**:
  - `adminRoutes.js`: Manages routes related to admin functionality (e.g., create admin account).
  - `userRoutes.js`: Manages routes related to user functionality (e.g., get user data, signup, login, modify, delete).

- **`uploads/`**:
  - Contains storage for multer.

- **`utils/`**:
  - `validation.js`: Contains utility functions for data validation.

- **`views/`**:
  - `index.ejs`: Frontend view for the main page.
  - `login.ejs`: Frontend view for the login page.
  - `signup.ejs`: Frontend view for the signup page.
  - `home.ejs`: Frontend view for the home page after login or signup.

```

Make sure your internet connection is active, as the database utilized in this project is MongoDB Atlas (cloud-based)

This README.md provides users with a comprehensive guide on setting up, running, and understanding the features of your Node.js application.

