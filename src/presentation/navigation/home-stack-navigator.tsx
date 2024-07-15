import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeNavigationType, HomeStackParams } from './types';
import HomeScreen from '../screens/home-screen';
import UpdateTaskScreen from '../screens/update-task-screen';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStackNavigator = () => {
  const renderBackButton = (navigation: HomeNavigationType) => {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <Ionicons name="chevron-back" size={24} />
      </Pressable>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="UpdateTask"
        component={UpdateTaskScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
          title: 'Update task',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
