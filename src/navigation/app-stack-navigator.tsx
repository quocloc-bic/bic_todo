import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParams } from './types';
import SplashScreen from '../screens/splash-screen';
import BottomTabNavigator from './bottom-tab-navigator';

const Stack = createNativeStackNavigator<AppStackParams>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
