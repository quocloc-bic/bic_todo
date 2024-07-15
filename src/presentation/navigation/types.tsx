import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Base screen props for navigation
type BaseStackProps = NativeStackScreenProps<ParamListBase>;

// Params for bottom tab navigation
export type BottomTabParams = {
  HomeStack: NativeStackScreenProps<HomeStackParams>;
  Today: BaseStackProps;
  Completed: BaseStackProps;
  CategoriesStack: NativeStackScreenProps<CategoriesStackParams>;
};

// Params for home stack navigation
export type HomeStackParams = {
  Home: BaseStackProps;
  UpdateTask: {
    task: ITask;
  };
};

// Params for categories stack navigation
export type CategoriesStackParams = {
  Categories: BaseStackProps;
  CategoryTasks: {
    category: ICategory;
  };
  CreateOrUpdateCategory: {
    category?: ICategory;
  };
};

// Params for app stack navigation
export type AppStackParams = {
  Splash: BaseStackProps;
  BottomTab: NativeStackScreenProps<BottomTabParams>;
};

// Categories navigation type
export type CategoriesNavigationType = NativeStackNavigationProp<
  CategoriesStackParams | ParamListBase
>;

// Home navigation type
export type HomeNavigationType = NativeStackNavigationProp<
  HomeStackParams | ParamListBase
>;

// App navigation type
export type AppNavigationType = NativeStackNavigationProp<
  AppStackParams | ParamListBase
>;
