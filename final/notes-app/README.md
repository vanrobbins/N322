# Notes App

A modern, feature-rich notes application built with React Native, Expo Router, and Firebase. Features a beautiful dark purple theme with full CRUD functionality and real-time synchronization.

## Features

✨ **Full CRUD Operations**

- Create, read, update, and delete notes
- Real-time synchronization across devices
- Auto-save on edit

🎨 **Modern UI/UX**

- Dark purple gradient theme
- Smooth animations and transitions
- Custom styled modals and confirmations
- Responsive design

🔐 **Authentication**

- Firebase Authentication
- Email/password sign-up and sign-in
- User-specific data storage
- Secure sign-out

📱 **Cross-Platform**

- iOS support
- Android support
- Web support

## Live Demo

Try the app at: https://notes-app-nu-opal.vercel.app/sign-in

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - Real-time database
- **React Hooks** - State management

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A Firebase project (see setup below)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vanrobbins/N322
cd final/notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" and follow the setup wizard
3. Once created, click on the web icon (</>) to add a web app
4. Register your app and copy the configuration

#### Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Click **Save**

#### Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location closest to you
5. Click **Enable**

#### Configure Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() { return request.auth != null; }

    // User-specific data structure: users/{userId}/notes/{noteId}
    match /users/{userId}/{document=**} {
      allow read, write: if signedIn() && request.auth.uid == userId;
    }

    // Fallback: deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

### 4. Environment Configuration

1. Create a `.env` file in the project root:

```bash
cp .example.env .env
```

2. Open `.env` and add your Firebase configuration:

```env
EXPO_PUBLIC_API_KEY=your_api_key_here
EXPO_PUBLIC_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_MSG_SENDER_ID=your_sender_id
EXPO_PUBLIC_APP_ID=your_app_id
```

**Where to find these values:**

- Go to Firebase Console → Project Settings
- Scroll down to "Your apps"
- Copy the values from the Firebase SDK snippet

## Running the App

### Development Mode

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `w` to open in web browser
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan the QR code with Expo Go app on your phone

### Platform-Specific Commands

```bash
# Web
npm run web

# Android
npm run android

# iOS
npm run ios
```

## Project Structure

```
notes-app/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication routes
│   │   ├── _layout.js           # Auth layout
│   │   └── sign-in.js           # Sign-in/Sign-up page
│   ├── (tabs)/                   # Tab navigation routes
│   │   ├── _layout.js           # Tabs layout with icons
│   │   ├── index.js             # Notes list page
│   │   └── settings.js          # Settings page
│   └── _layout.js               # Root layout with auth provider
├── src/
│   ├── auth/
│   │   └── AuthContext.js       # Authentication context
│   ├── components/
│   │   └── NotesList.js         # Main notes component
│   └── firebase/
│       └── firebaseConfig.js    # Firebase configuration
├── assets/                       # Images and static files
├── .env                         # Environment variables (create this)
├── .example.env                 # Example environment file
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Usage

### Creating an Account

1. Launch the app
2. Enter your email and password
3. Click **Create Account**
4. You'll be automatically signed in

### Managing Notes

**Create a Note:**

- Click the **+ New Note** button
- Enter a title and content
- Click **Save**

**Edit a Note:**

- Tap on any note card
- Modify the title or content
- Click **Save**

**Delete a Note:**

- Long-press on a note card, OR
- Open a note and click **Delete Note** at the bottom
- Confirm the deletion in the popup

### Sign Out

1. Go to the **Settings** tab
2. Click **Sign Out**

## Troubleshooting

### "Expo won't open in app"

**Solution:** Start expo in tunnel `npx expo start --tunnel`

### "Missing or insufficient permissions" error

**Solution:** Make sure your Firestore security rules are properly configured (see Firebase Setup above).

### "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**Solution:** This is usually caused by browser ad blockers. Either:

- Disable your ad blocker for localhost
- Whitelist `*.googleapis.com` in your ad blocker settings

### Firebase not connecting

**Solution:**

1. Verify your `.env` file has the correct Firebase credentials
2. Restart the Expo dev server: `npm start -c`
3. Check that Firebase Authentication and Firestore are enabled

### Notes not appearing

**Solution:**

1. Check browser console for errors
2. Verify you're signed in
3. Check Firestore security rules allow read/write for authenticated users

## Color Scheme

The app uses a custom dark purple theme:

```javascript
Primary Background: #0f0f1e
Card Background: #1a1a2e
Accent Color: #6b4ce6
Text Primary: #ffffff
Text Secondary: #b8b8d1
Text Muted: #8b8ba7
Danger/Delete: #e63946
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes.

## Author

Created for N322 Mobile Development Course

---

**Happy note-taking! 📝**
