# Chat App

A simple chat application built with React Native and Expo. The start screen allows anonymous sign in, lets the user choose a background color, and then navigates to a chat screen powered by Firebase.

## Features
- Background image on the start screen
- Anonymous authentication with Firebase
- Selectable overlay background color
- Chat interface using **react-native-gifted-chat**
- Works on Android, iOS and web
- Send images from your library or camera
- Share your location with an embedded map
- Offline message caching using **AsyncStorage**
- Real-time updates powered by **Firebase Firestore**

## Tools Used
- **React Native** with **Expo** for cross-platform development
- **React Navigation** for routing
- **Firebase Authentication**, **Firestore**, and **Storage**
- **Expo ImagePicker**, **MediaLibrary**, and **Location**
- **React Native Maps** for displaying shared locations

## Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [React Native](https://reactnative.dev/docs/environment-setup) environment set up (Expo or Bare Workflow)
- A physical device or emulator/simulator to run the app

## Installation
1. Clone this repository
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install the dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npx expo start
   ```
   Scan the QR code with the Expo Go app or press **a** to open an Android emulator and **i** for iOS.

## Project Structure
```
assets/                Image and media files
components/
  Start.js             Start screen where users sign in
  Chat.js              Chat screen implementation
  CustomActions.js     Additional chat actions
firebaseConfig.js      Firebase configuration
App.js                 Entry point of the application
```

## Running on devices
Use the built-in scripts for convenience:
```bash
npm run android   # Build and run on Android
npm run ios       # Build and run on iOS
npm run web       # Run the project in the browser
```

## Project Images

![WhatsApp Image 2025-09-03 at 16 43 38_95fbf8ce](https://github.com/user-attachments/assets/c26ca213-2db1-423c-9f54-5a77645054f4)
![WhatsApp Image 2025-09-03 at 16 44 12_7a90030f](https://github.com/user-attachments/assets/0998f401-4e14-482f-ba01-d0d6563515a9)



## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
MIT
