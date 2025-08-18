<div align="center">

# Jigyasa: Empowering Rural Education, Together

**Jigyasa is a comprehensive web platform designed to bridge the educational gap in rural areas. It connects dedicated volunteers with underserved schools, providing a streamlined system for coordination, resource sharing, and impact tracking. Our mission is to empower rural communities and make quality education accessible to every child.**

<p>
  <a href="https://jigyasa-dhadpad.netlify.app/" target="_blank"><strong>Live Demo</strong></a> •
  <a href="https://github.com/adarshdhakar/jigyasa" target="_blank"><strong>GitHub Repository</strong></a> •
  <a href="https://drive.google.com/drive/folders/1vHkihWCgtLYx28RkCIONgxRNhwB21k_h?usp=drive_link " target="_blank"><strong>Project Resources</strong></a>
</p>

<p>
  <img src="https://img.shields.io/github/stars/adarshdhakar/jigyasa?style=for-the-badge&logo=github" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/adarshdhakar/jigyasa?style=for-the-badge&logo=github" alt="GitHub forks"/>
  <img src="https://img.shields.io/github/last-commit/adarshdhakar/jigyasa?style=for-the-badge&logo=git" alt="Last commit"/>
</p>

</div>

---

## Project Resources
* **Project Presentation:** <a href="https://drive.google.com/file/d/1vBvCdWkXvNg2BgtiKSavjRGJim3-jAdR/view?usp=sharing" target="_blank"><strong>Link</strong></a> 
* **Prompt Handbook:** <a href="https://drive.google.com/file/d/1W6V--GSeMNJ2MI_3ejfPdf-n6LPs-eSb/view?usp=sharing" target="_blank"><strong>Link</strong></a> 
* **Demo Video:** <a href="https://drive.google.com/file/d/1le48j3RKonGDoi7Fcg_R0WBnZskmQsZf/view?usp=sharing" target="_blank"><strong>Link</strong></a>
---

## Tech Stack
This project is built using the MERN stack and other modern web technologies to deliver a robust and scalable solution.

| Category           | Technologies                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                             |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)                                                                                                                                               |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                                                                                                                                                                                                                                                               |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                                                                                                                                                                                                                                                                 |
| **File Storage** | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)                                                                                                                                                                                                                                                    |
| **Other Tools** | ![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white) ![Spline](https://img.shields.io/badge/Spline-D855E1?style=for-the-badge)                                                                                                                                                                                      |

---

## Key Features
Jigyasa is packed with features designed to facilitate a seamless experience for administrators, volunteers, and schools.

| ![screenshot1](./images/1.png) | ![screenshot2](./images/3.png) |
|--------------------------------|--------------------------------|

### 🎨 Enhanced User Experience
A customizable **light/dark mode** interface coupled with **multilingual support** (English, हिंदी, मराठी) ensures the platform is accessible and user-friendly for everyone.
| ![screenshot1](./images/9.png) | ![screenshot2](./images/17.png) |
|--------------------------------|--------------------------------|

<p align="center">
  <img src="./images/16.png" alt="screenshot" width="50%"/>
</p>
<br/>

### 👨‍🏫 Volunteer Management
Features a streamlined volunteer **application and onboarding process**. A comprehensive dashboard allows for tracking personnel statistics and performance.
<br/>
| ![screenshot1](./images/2.png) | ![screenshot2](./images/5.png) |
|--------------------------------|--------------------------------|
| ![screenshot1](./images/4.png) | ![screenshot2](./images/6.png) |

<br/>

### 📚 Centralized Educational Resources
Access **chapter-wise organized quizzes and educational videos** for various grade levels, allowing volunteers to deliver structured and effective lessons.
<br/>
| ![screenshot1](./images/7.png) | ![screenshot2](./images/8.png) |
|--------------------------------|--------------------------------|

### 🏫 Smart School Assignment System
An intelligent allocation system assigns volunteers to schools, with a policy of a **maximum of five schools per volunteer** and one volunteer per school to ensure focused attention.
<br/>


### ⚙️ Robust Admin Controls
A centralized admin dashboard provides powerful tools for **managing volunteers, uploading resources, and viewing detailed analytics**.
<br/>
| ![screenshot1](./images/9.png) | ![screenshot2](./images/13.png) |
|--------------------------------|--------------------------------|
| ![screenshot1](./images/11.png) | ![screenshot2](./images/12.png) |
<p align="center">
  <img src="./images/10.png" alt="screenshot" width="50%"/>
</p>

---

## Project Structure
The project is organized as a monorepo with two main directories:

-   `/api`: Contains the entire backend Node.js and Express application.
-   `/client`: Contains the entire frontend React application.

```
    ├── api/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── index.js
    │   └── package.json
    └── client/
        ├── public/
        ├── src/
        ├── index.html
        └── package.json
```

---

## Getting Started
Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites
Make sure you have the following software installed on your system:
* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) (or yarn)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/) (You can use a local instance or a cloud service like MongoDB Atlas)

### Local Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/adarshdhakar/jigyasa.git
    cd jigyasa
    ```

2.  **Set Up the Backend (`/api`)**
    * Navigate to the backend directory:
        ```sh
        cd api
        ```
    * Install the required dependencies:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `/api` directory and add the following environment variables. Replace the placeholder values with your actual credentials.
        ```env
        PORT=5000
        ATLASDB_URL=<Your_MongoDB_Connection_String>
        SECRET=<Your_Super_Secret_Key>
        CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
        CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
        CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
        EMAIL_USER=<Your_Email_Address_for_Nodemailer>
        EMAIL_PASS=<Your_Email_Password_or_App_Password>
        JWT_SECRET=<Your_JWT_Secret_Key>
        ```
    * Start the backend server:
        ```sh
        nodemon index.js
        ```
    * The server should now be running on `http://localhost:5000`.

3.  **Set Up the Frontend (`/client`)**
    * Open a new terminal and navigate to the frontend directory from the root folder:
        ```sh
        cd client
        ```
    * Install the required dependencies:
        ```sh
        npm install
        ```
    * Start the frontend development server:
        ```sh
        npm run dev
        ```
    * The React application will open and run on `http://localhost:5173`.

You can now access the application in your browser and start exploring!

---

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
