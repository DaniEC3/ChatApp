import { registerRootComponent } from 'expo';
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import App from './App';

const Main = () => (
  <ActionSheetProvider>
    <App />
  </ActionSheetProvider>
);

registerRootComponent(Main);
