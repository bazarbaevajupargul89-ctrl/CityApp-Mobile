# ReelFlow - Complete Mobile App

Short-form video app UI inspired by TikTok / Instagram Reels.

## Features

✅ **Authentication**
- Email/Password login and registration
- Firebase Auth

✅ **Home Screen**
- Vertical scrollable Reels feed
- Like/Comment/Share actions
- User profiles on each reel

✅ **Discover**
- Trending categories
- Trend cards with gradients

✅ **Create**
- Video recording UI
- Effects/Audio selection

✅ **Profile**
- User profile with stats
- Edit profile modal
- Logout
- My videos section

✅ **Multilingual**
- Russian (Русский)
- Kazakh (Қазақша)
- English

## Setup Instructions

### 1. Prerequisites
```bash
node -v  # Should be v16+
npm -v   # Should be v8+
```

### 2. Clone and Install
```bash
git clone https://github.com/bazarbaevajupargul89-ctrl/CityApp-Mobile.git
cd CityApp-Mobile
npm install
```

### 3. Firebase Setup

1. Go to https://firebase.google.com
2. Create a new project (name: `reelflow`)
3. Create a Web app in the project
4. Copy your Firebase config
5. Replace placeholders in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

### 4. Firebase Database Setup

#### Enable Authentication
- Go to Firebase Console
- Build → Authentication
- Sign-in method → Email/Password → Enable

#### Create Firestore Database
- Go to Firebase Console
- Build → Firestore Database
- Create database (Start in test mode)
- Select your region (Europe or Asia)

#### Create Storage
- Go to Firebase Console
- Build → Storage
- Create storage (Start in test mode)

### 5. Run the App

```bash
npm start
# or
npx expo start
```

Then:
- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Physical Phone**: Download Expo Go, scan QR code

## Project Structure

```
reelflow/
├── App.js                  # Main app component
├── app.json                # Expo config
├── package.json
├── src/
│   ├── firebase.js         # Firebase config
│   └── locales.js          # i18n translations
└── screens/
    ├── AuthScreen.js       # Login/Sign up
    ├── HomeScreen.js       # Reels feed
    ├── DiscoverScreen.js   # Trends
    ├── CreateScreen.js     # Video creation
    └── ProfileScreen.js    # User profile
```

## Firebase Database Schema

### `users` collection
```json
{
  "uid": "abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "bio": "I create amazing content ✨",
  "photoURL": "https://...",
  "followers": 0,
  "likes": 0,
  "createdAt": "timestamp"
}
```

### `reels` collection
```json
{
  "title": "Sunset city vibes",
  "user": "John Doe",
  "handle": "@johndoe",
  "music": "Night Drive",
  "videoURL": "https://...",
  "userId": "abc123",
  "likes": ["uid1", "uid2"],
  "comments": [
    {
      "userId": "uid1",
      "userName": "User1",
      "text": "Amazing!",
      "createdAt": "timestamp"
    }
  ],
  "createdAt": "timestamp"
}
```

## Next Steps

- [ ] Add real video upload functionality
- [ ] Implement like/comment features
- [ ] Add user follow system
- [ ] Build trending algorithm
- [ ] Deploy to App Store / Play Market

## Support

For issues or questions, create an issue on GitHub.
