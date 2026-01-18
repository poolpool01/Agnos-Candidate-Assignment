# Agnos Candidate Assignment  
**Real-Time Patient Input & Staff Monitoring System**

---

## 📌 Overview
This project is a real-time web application that allows patients to enter their personal information through a responsive form, while staff members can monitor the input live as it is being entered.

The system demonstrates real-time synchronization using WebSockets, form validation, and responsive UI design suitable for both desktop and mobile devices.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Hook Form
- Zod (form validation)
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- CORS

### Deployment
- Frontend: **Vercel**
- Backend: **Render**

---

## 📂 Project Structure

Agnos-Candidate-Assignment
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── pages/
│ │ │ ├── PatientForm.jsx
│ │ │ └── StaffView.jsx
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── schema/
│ │ └── App.jsx
│ └── vercel.json
│
├── server/ # Backend (Express + Socket.IO)
│ ├── index.js
│ └── package.json
│
└── README.md


---

## 🧑‍⚕️ Patient Form Features

The patient form allows users to input the following information:

- First Name (required)
- Middle Name (optional)
- Last Name (required)
- Date of Birth (required)
- Gender (required)
- Phone Number (required, validated format)
- Email (required, validated format)
- Address (required)
- Preferred Language (required)
- Nationality (required)
- Emergency Contact (optional: name & relationship)
- Religion (optional)

### Validation
- Implemented using **React Hook Form + Zod**
- Required fields and formats are validated
- Validation errors are displayed immediately for better UX

### UX Behavior
- Inputs are disabled after submission
- A "New Patient" button allows starting a new entry
- Fully responsive design using Tailwind CSS

---

## 🧑‍💻 Staff View Features

- Displays all patient fields in real-time
- Updates instantly as the patient types
- Shows submission status:
  - **Typing**
  - **Submitted**
- Responsive layout optimized for different screen sizes

---

## 🔁 Real-Time Synchronization Flow

1. Patient enters data into the form
2. Form values are streamed via `Socket.IO` using `patient:update`
3. Server broadcasts updates to all staff clients
4. Staff view updates instantly without refresh
5. On form submission, a `patient:submit` event is emitted and status is updated

Patient → Socket.IO → Express Server → Broadcast → Staff View


---

## 🚀 Live Demo

- **Patient Form:**  
  https://agnos-candidate-assignment-28h1.vercel.app/

- **Staff View:**  
  https://agnos-candidate-assignment-28h1.vercel.app/staff

- **Backend (Socket Server):**  
  https://agnos-candidate-assignment.onrender.com/

---

## ▶️ Run Locally

### Backend 
``bash
cd server
npm install
npm start

Server will run on: http://localhost:3001

### Frontend
``bash
cd client
npm install
npm run dev

Frontend will run on: http://localhost:5173

⚙️ Environment Variables
Frontend (client)
VITE_SOCKET_URL=http://localhost:3001

Production (Vercel)
VITE_SOCKET_URL=https://agnos-candidate-assignment.onrender.com

🎨 Design Decisions

- Mobile-first responsive layout using Tailwind CSS
  
- Clear separation between patient and staff interfaces
  
- Real-time updates prioritized over manual refresh
  
- Simple and readable UI for clinical environments

⭐ Bonus Features

- Real-time status indicator (Typing / Submitted)

- Automatic disabling of form after submission

- Clean socket lifecycle handling

- Deployed production-ready setup (Vercel + Render)

Author
Suprakon Tantrakul

