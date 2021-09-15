import {Text, View} from 'react-native';

import Home from './src/screens/Home';
import MainNavigation from './src/components/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
