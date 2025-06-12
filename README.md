# AI-Driven Learning Platform (Mini MVP)

A platform that allows users to select what they want to learn (by category and sub category), send prompts to an AI to receive generated lessons, and view their learning history.

---

# Technologies Used:

### Backend:
* **Languages:** ASP.NET, C#
* **Architecture:** 3-Layer Architecture (API, BL, DAL)
* **Database:** SQL Server (with Entity Framework Core)
* **AI Communication:** OpenAI API

### Frontend:
* **Framework:** React 19 (with Vite)
* **State Management:** Redux Toolkit
* **UI Library:** Material-UI (MUI)

---

## Assumptions Made

1.  **Database:** The project uses a local SQL Server .mdf file, and the connection string is stored in the appsettings.json file. In a production environment, it is recommended to use a secure configuration management system or environment variable for sensitive information.
2.  **API Keys:** The OpenAI API key is stored in the `appsettings.Development.json` file and is included in the `.gitignore` to prevent it from being committed to Git. For security, ensure that this variable is added to `appsettings.json` before running the project.
3.  **User Authentication:** User login is based on a unique ID without a password, and access to the admin dashboard is based on the admin's unique ID defined in the appsettings.json file.

---

## Setup Instructions

These are the one-time steps required to prepare your environment before running the project for the first time.

### 1. Prerequisites
Ensure you have the following software installed on your machine:
* .NET 8 SDK
* Node.js (version 18 or higher)
* SQL Server LocalDB (usually installed with Visual Studio)

### 2. Install Dependencies

**For the Backend:**
* Open the Solution file (`Backend/Backend.sln`) in Visual Studio.
* Visual Studio should automatically restore the NuGet packages upon opening the project.

**For the Frontend:**
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install the npm packages:
   ```bash
   npm install
   ```

### 3. Database Setup
* Before running the Backend for the first time, ensure the path in the connection string inside `appsettings.json` is correct and points to the location of the `.mdf` file on your machine.

---

## How to Run Locally

After completing the initial setup, use the following commands to run the application's servers.

### Running the Backend Server
1.  Open the Solution in Visual Studio.
2.  Press F5 or click the "Play" button to run the `Backend` project.   
   The server will start running at `http://localhost:5065`.

### Running the Frontend Application
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd Frontend
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open a browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

---

## Sample .env Example File

The project currently uses `appsettings.json` for backend configuration and does not use a `.env` file for the frontend.

To meet best practices for handling secrets, a `.env` file should be used for the backend. Create a file named `.env` in the `Backend/Server` directory. **This file must be added to `.gitignore` to prevent committing secrets.**

Here is an example of its content:

```env
# Example .env file for backend

# OpenAI API Key
OPENAI_API_KEY="your-openAi-api-key"

# Admin Password for the dashboard
ADMIN_ID="123456789"

# Database Connection String
# Example for SQL Server LocalDB
DB_CONNECTION_STRING="Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"C:\\Users\\user1\\Documents\\ApiSoulProject\\MiniLearningPlatform\\Backend\\Dal\\Data\\LearningPlatform.mdf\";Integrated Security=True;Connect Timeout=30"
```
**Note:** After creating this file, the C# code must be updated to read these values from environment variables instead of from `appsettings.json`


