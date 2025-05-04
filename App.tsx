// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RecoilRoot } from 'recoil';
import RootNavigator from './src/navigation/rootNavigator';

const App: React.FC = () => (
  <RecoilRoot>
    <NavigationContainer>
      <RootNavigator />  {/* handles onboarding/auth/main screens */}
    </NavigationContainer>
  </RecoilRoot>
);

export default App;
