# LearnDev - Interactive Learning Platform

A modern, full-stack web application built with **React**, **Firebase**, and **Firestore** for learning web development through interactive tutorials, exercises, and progress tracking.

## 🎯 Features

- **Authentication**
  - Email/Password registration and login
  - Google OAuth authentication
  - Persistent user sessions with Firestore

- **Learning Content**
  - Interactive tutorials (HTML, CSS, JavaScript, PHP, Bootstrap, Tailwind)
  - Progressive exercises with difficulty levels
  - Video lessons
  - Documentation viewer

- **Progress Tracking**
  - Achievements system
  - Badges and rewards
  - Points and leaderboards
  - User profiles with stats

- **Real-time Synchronization**
  - All data synced with Firestore
  - Automatic user data updates
  - Cross-device consistency

## 🏗️ Architecture

```
LearnDev
├── Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── AuthContext.jsx # Firebase auth management
│   │   ├── firebase.js     # Firebase configuration
│   │   └── App.jsx         # Main app component
│   └── public/             # Static assets
│
└── Backend (Firebase)
    ├── Authentication      # Firebase Auth
    ├── Database            # Firestore
    ├── Storage             # File storage
    └── Hosting             # App deployment
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Auth + Firestore + Hosting)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Code Quality:** ESLint
- **CSS Processing:** PostCSS

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Capstone2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Firebase config is already in `src/firebase.js`
   - Ensure Firebase project is active

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

### Firebase Setup

All user data is stored in Firestore collections:

```
firestore/
├── users/           # User profiles and settings
│   ├── uid
│   ├── email
│   ├── displayName
│   ├── points
│   └── createdAt
│
├── achievements/    # Achievement definitions
├── badges/          # Badge definitions
├── userProgress/    # Lesson completion tracking
└── notifications/   # User notifications
```

## 🔐 Authentication Flow

1. **Email/Password Registration**
   - User submits email and password
   - Firebase Auth creates account
   - User data saved to Firestore
   - Auto-login after registration

2. **Email/Password Login**
   - Firebase Auth validates credentials
   - User data fetched from Firestore
   - Session persisted locally

3. **Google OAuth**
   - User clicks "Continue with Google"
   - Firebase handles OAuth flow
   - User profile created in Firestore if new
   - Auto-login with persistent session

## 📊 Data Models

### User
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  username: string,
  photoURL: string,
  points: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Achievement
```javascript
{
  id: string,
  name: string,
  description: string,
  icon: string,
  points: number,
  category: string
}
```

### User Progress
```javascript
{
  userId: string,
  lessonId: string,
  progress: number (0-100),
  completedAt: timestamp
}
```

## 🎨 Project Structure

```
src/
├── components/
│   ├── AuthModal.jsx
│   ├── Button.jsx
│   ├── DocumentationEditor.jsx
│   ├── LevelModal.jsx
│   └── LiveHtmlEditor.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── Docs.jsx
│   ├── Exercises.jsx
│   ├── VideoLessons.jsx
│   ├── SignIn.jsx
│   ├── docs/
│   ├── exercises/
│   └── lessons/
│
├── AuthContext.jsx      # Global auth state
├── firebase.js          # Firebase config
├── Nav.jsx              # Navigation component
├── App.jsx              # Main app
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🔄 Development Workflow

1. Make changes to React components
2. Changes auto-reload via Vite HMR
3. Firebase data syncs automatically
4. Test in development browser
5. Build and deploy to Firebase Hosting

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify Firebase config in `src/firebase.js`
- Check Firebase project is active
- Ensure Firestore rules allow read/write

### Authentication Not Working
- Check Firebase Auth settings
- Verify Google OAuth credentials
- Check browser console for errors

### Build Issues
- Clear `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version (14+)

## 📝 License

Private project - All rights reserved

## 👥 Contributors

- Sam Cleofe

---

**Last Updated:** November 2025
**Status:** Active Development
