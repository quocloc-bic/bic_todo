import React, { useEffect } from 'react';
import {
  CategoriesNavigationType,
  CategoriesStackParams,
} from '@bic_todo/presentation/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box } from '@bic_todo/utils/theme';
import { useCategoryTasksScreen } from '@bic_todo/adapters/category-tasks';
import TaskList from '@bic_todo/presentation/components/shared/task-list';

type CategoryTaskScreenProp = RouteProp<CategoriesStackParams, 'CategoryTasks'>;

const CategoryTaskScreen = () => {
  const route = useRoute<CategoryTaskScreenProp>();
  const navigation = useNavigation<CategoriesNavigationType>();

  const { category } = route.params;
  const adapter = useCategoryTasksScreen(category.id);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      navigation.setOptions({
        title: category?.name,
      });
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  useEffect(() => {
    adapter.refresh();
  }, []);

  return (
    <Box bg="white" flex={1} p="4">
      <TaskList tasks={adapter.tasks} onFetchMore={adapter.fetchMore} />
    </Box>
  );
};

export default CategoryTaskScreen;
