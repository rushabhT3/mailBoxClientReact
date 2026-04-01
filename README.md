# MailBox App: Premium Minimalist Brutalist Edition

This project is a high-end, production-ready MailBox client and server. It features a complete visual redesign inspired by the architectural and minimalist brutalist aesthetic of **Baseborn Studio**, combined with a scalable, feature-based modular React architecture.

---

## 📸 Screenshots

### 🔑 Authentication Flow
![Login Page Layout](file:///c:/rough/mailBoxClientReact/docs/screenshots/login_page.png)
*Placeholder: Premium split-screen login architecture.*

![Sign Up Page Layout](file:///c:/rough/mailBoxClientReact/docs/screenshots/signup_page.png)
*Placeholder: Minimalist sign-up with bold typography.*

### 📬 Mail Dashboard
![Main Inbox](file:///c:/rough/mailBoxClientReact/docs/screenshots/main_inbox.png)
*Placeholder: Sticky sidebar navigation with monochromatic message list.*

![Email Composition](file:///c:/rough/mailBoxClientReact/docs/screenshots/compose_view.png)
*Placeholder: Immersive dark-mode editor.*

![Sent Messages](file:///c:/rough/mailBoxClientReact/docs/screenshots/sent_messages.png)
*Placeholder: Scalable outbox for sent transmissions.*

---

## 🏛️ Visual & UX Philosophy

The application has been transformed from a generic UI into a premium digital experience:
- **Aesthetic**: Deep monochromatic dark mode (`#050505`) with high-contrast white typography.
- **Typography**: Utilizing the geometric **Outfit** font family with massive, bold, all-caps headings for a "studio" feel.
- **Interactions**: A dynamic circular custom cursor that responds to interactive elements, revealing "VIEW" text on hover.
- **Accents**: Subtle purple (`#a855f7`) indicators and hover effects for a modern, high-contrast touch.

---

## 🚀 Technical Architecture

### Frontend (React + Tailwind CSS)
The frontend has been completely refactored into a **Feature-Based Modular Structure**:
- **`src/features/auth`**: Encapsulates all authentication logic (SignUp, Login, JWT parsing, and API calls).
- **`src/features/mail`**: Manages the core email experience (List view, Composer, and Detail view).
- **`src/components`**: Shared UI elements like the `Layout` and `CustomCursor`.
- **`src/pages`**: Serves as the composition layer, assembling features into full-screen pages.
- **API Isolation**: All `axios` requests are isolated within feature-specific `api/` modules for better maintainability.
- **Absolute Imports**: Configured via `jsconfig.json` for cleaner code (e.g., `import { login } from "features/auth/api/authApi"`).

### Backend (Node.js + Express + Sequelize)
A robust REST API providing:
- **Authentication**: JWT-based login and signup.
- **Mail Management**: Endpoints for composing, fetching (Inbox/Sent), marking as read, and deleting emails.
- **Database**: Integrated with Sequelize for ORM-based data handling.

---

## 🛠️ How to Run

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
*Port: `http://localhost:3001`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*Port: `http://localhost:3000`*

---

## 📂 Project Structure Overview

```text
root/
├── backend/                # Node.js Express Server
│   ├── controllers/        # Business logic for routes
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoint definitions
│   └── util/               # DB connections and helpers
└── frontend/               # React Application
    ├── src/
    │   ├── features/       # Feature-based modular logic (Auth, Mail)
    │   │   ├── auth/       # Login, Signup, JWT parsing
    │   │   └── mail/       # Inbox, Outbox, Composer
    │   ├── components/     # Shared UI (Cursor, Layout)
    │   ├── pages/          # Full-page compositions
    │   └── index.css       # Global design system
    └── jsconfig.json       # Absolute import configuration
```

---

## 📜 License
EST. 2026 / MAILBOX CLIENT v1.0
