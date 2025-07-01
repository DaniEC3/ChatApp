import { registerRootComponent } from 'expo';
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const Main = () => (
  <ActionSheetProvider>
    <App />
  </ActionSheetProvider>
);

registerRootComponent(Main);