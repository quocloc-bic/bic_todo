import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesStackParams } from './types';
import EditCategoryScreen from '../screens/edit-category-screen';
import CategoryTaskScreen from '../screens/category-tasks';
import CategoriesScreen from '../screens/categories-screen';

const Stack = createNativeStackNavigator<CategoriesStackParams>();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryTasks" component={CategoryTaskScreen} />
      <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
