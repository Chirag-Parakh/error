// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ToastProvider } from './src/components/ui/Toast';
import RootNavigator from './src/navigation/rootNavigator';

import { AuthProvider } from './src/context/AuthContext';

import { RecoilRoot } from 'recoil';

enableScreens();

const App: React.FC = () => {
  return (
    <RecoilRoot>

      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <ToastProvider>
              <RootNavigator />
            </ToastProvider>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
