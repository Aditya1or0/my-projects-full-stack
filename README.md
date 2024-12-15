
# My Projects

**A Full-Stack Next.js Project for Project Management and Display**

## Overview

This project is a full-stack web application built with **Next.js**, **Firebase**, and **NextAuth.js**. It allows users to display, add, and delete personal project details in a user-friendly portfolio. The app features a secure login system, dynamic project management functionality, and integrates Firebase for data storage and authentication. Users can manage their portfolio with ease while showcasing projects along with their titles, descriptions, technologies used, and project images.

## Key Features

- **User Authentication**:  
  Integrated **NextAuth.js** for secure authentication, allowing users to log in using Google, email, or other providers.
  
- **Project Management (CRUD)**:  
  Users can **create**, **read**, **update**, and **delete** project details such as title, description, tech stack, and images. Projects are stored securely in Firebase.
  
- **Firebase Integration**:  
  Used **Firebase Firestore** for storing project data and **Firebase Storage** to manage project images.
  
- **Dynamic Project Display**:  
  The project data is dynamically fetched and displayed on the frontend using **Next.js** with server-side rendering for optimal performance.
  
- **Responsive UI**:  
  Developed a responsive and accessible user interface with **TailwindCSS**, ensuring an excellent experience on both desktop and mobile devices.

## Technologies Used

- **Frontend**:  
  - Next.js
  - TailwindCSS
  - React Hooks
  
- **Backend**:  
  - Firebase (Firestore for database, Firebase Storage for images)
  
- **Authentication**:  
  - NextAuth.js
  
- **State Management**:  
  - React hooks
  
## Setup & Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Aditya1or0/my-projects-full-stack.git
    cd my-projects-full-stack
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your Firebase project and create a `.env.local` file with your Firebase credentials:

    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
    NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## How It Works

- **Authentication**:  
  Users can sign in using **Google** or **Email** via **NextAuth.js**. After successful login, users can view and manage their project portfolio.

- **Project Management**:  
  Users can add new projects by entering project details such as the title, description, technologies used, and uploading images. Projects are stored in **Firebase Firestore** and images are uploaded to **Firebase Storage**.

- **Displaying Projects**:  
  The user’s project portfolio is dynamically rendered using **Next.js server-side rendering**, providing fast and optimized load times for a seamless experience.

## Impact

- **Enhanced User Experience**:  
  Simplified project management with an intuitive UI and secure environment to store and display personal projects.
  
- **Quick Development Setup**:  
  Integrated **Firebase** to speed up the backend development and **NextAuth.js** for simplified and secure user authentication.

## License

This project is open-source and available under the MIT License.

---
