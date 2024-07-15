import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesNavigationType, CategoriesStackParams } from './types';
import CreateOrUpdateCategoryScreen from '../screens/create-or-update-category-screen';
import CategoryTaskScreen from '../screens/category-tasks';
import CategoriesScreen from '../screens/categories-screen';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

const Stack = createNativeStackNavigator<CategoriesStackParams>();

const CategoriesStackNavigator = () => {
  const renderBackButton = (navigation: CategoriesNavigationType) => {
    return (
      <Pressable onPress={() => navigation.pop()}>
        <Ionicons name="chevron-back" size={24} />
      </Pressable>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen
        name="CategoryTasks"
        component={CategoryTaskScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="CreateOrUpdateCategory"
        component={CreateOrUpdateCategoryScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
        })}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
