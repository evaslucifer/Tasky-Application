# Tasky Application

A modern and responsive task management application that helps users organize, prioritize, and manage their daily tasks efficiently.

The project follows a full-stack architecture with a separate frontend and backend, making it scalable and easy to maintain.

---

## Features

### Frontend

- Responsive and modern UI
- Create new tasks
- Edit existing tasks
- Delete tasks
- Task categories
- Image support for tasks
- Interactive cards
- Bootstrap-based responsive design

### Backend _(Under Development)_

- RESTful API
- User Authentication
- JWT Authorization
- Password Encryption
- CRUD Operations for Tasks
- Database Integration
- Input Validation
- Error Handling Middleware
- File Upload Support
- Environment Variable Configuration

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose _(planned)_

### Authentication

- JWT
- bcrypt

### Other Tools

- dotenv
- Nodemon
- Git
- GitHub

---

## 📂 Project Structure

```
Tasky-Application/
│
├── frontend/
│
├── backend/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
|   |   └── constants.js
│   ├── .env
│   ├── package.json
│
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/evaslucifer/Tasky-Application.git
```

Move into the project directory

```bash
cd Tasky-Application
```

Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=8000
MONGODB_URI=your_database_connection
JWT_SECRET=your_secret_key
```

Start the development server

```bash
npm run dev
```

---

## 📖 API

The backend exposes REST APIs for managing users and tasks.

Example endpoints:

- POST `/api/v1/users/register`
- POST `/api/v1/users/login`
- GET `/api/v1/tasks`
- POST `/api/v1/tasks`
- PATCH `/api/v1/tasks/:id`
- DELETE `/api/v1/tasks/:id`

---

## 🎯 Future Enhancements

- Email Verification
- Password Reset
- Task Reminders
- Due Dates
- Priority Levels
- Drag-and-Drop Task Board
- Search and Filters
- Notifications
- Team Collaboration
- Dark Mode
- Unit Testing
- Docker Support
- CI/CD Pipeline

---

## 📸 Screenshots

Screenshots and GIFs of the application will be added here.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome. Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is developed for learning and portfolio purposes.

---

## 👨‍💻 Author

**Himanish Rao**

GitHub: https://github.com/evaslucifer
