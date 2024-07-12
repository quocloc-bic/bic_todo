import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParams } from './types';
import HomeStackNavigator from './home-stack-navigator';
import CategoriesStackNavigator from './categories-stack-navigator';
import CompletedScreen from '../screens/completed-screen';
import TodayScreen from '../screens/today-screen';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@bic_todo/utils/theme';

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray400,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          tabBarLabel: 'Today',
          tabBarIcon: ({ color }) => (
            <Ionicons name="today-outline" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          tabBarLabel: 'Completed',
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done-outline" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums-outline" size={24} color={color} />
          ),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
