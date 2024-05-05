import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Base screen props for navigation
type BaseStackProps = NativeStackScreenProps<ParamListBase>;

// Params for bottom tab navigation
export type BottomTabParams =
  | {
      HomeStack: NativeStackScreenProps<HomeStackParams>;
      Today: BaseStackProps;
      Completed: BaseStackProps;
      CategoriesStack: NativeStackScreenProps<CategoriesStackParams>;
    }
  | ParamListBase;

// Params for home stack navigation
export type HomeStackParams =
  | {
      Home: BaseStackProps;
      EditTask: BaseStackProps;
    }
  | ParamListBase;

// Params for categories stack navigation
export type CategoriesStackParams =
  | {
      Categories: BaseStackProps;
      CategoryTasks: {
        id: string;
      };
      EditCategory: {
        id?: string;
      };
    }
  | ParamListBase;

// Params for app stack navigation
export type AppStackParams =
  | {
      Splash: BaseStackProps;
      BottomTab: NativeStackScreenProps<BottomTabParams>;
    }
  | ParamListBase;
