# React Native Chat Application

This repository contains a simple chat application built with **React Native** and **Expo**. It demonstrates basic navigation, real time messaging with **Firebase Firestore**, offline support and media sharing.

![demo](Gif-5-3-Section.gif)

## Features

- Anonymous sign in with Firebase authentication
- Real time chat powered by Firestore
- Send images from the camera or photo library
- Share current location on a map
- Offline message caching with `AsyncStorage`
- Customizable chat bubble styles
- Works on Android and iOS via Expo

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the App

Start the Expo development server:

```bash
npm start
```

Use the Expo Go app on your device or an emulator to view the application.

## Project Structure

```
assets/              # Images and icons
components/          # React components (Chat, Start, CustomActions)
App.js               # Entry component with navigation
firebaseConfig.js    # Firebase initialization
index.js             # Expo entry point
```

## Firebase Setup

Update `firebaseConfig.js` with your own Firebase project credentials if you wish to deploy your own instance of the chat service.

## Scripts

- `npm start` – run the project with Expo
- `npm run android` – build/run on Android
- `npm run ios` – build/run on iOS
- `npm run web` – run in a web browser

## Contributing

Feel free to open issues or submit pull requests if you have improvements or fixes.

## License

This project is provided under the MIT License.
