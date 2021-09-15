import Detail from '../screens/Detail';
import Home from '../screens/Home';
import React from 'react';
import Search from '../screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import Navbar from './Navbar';

const Stack = createNativeStackNavigator();

export class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator
        headerMode="Screen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
