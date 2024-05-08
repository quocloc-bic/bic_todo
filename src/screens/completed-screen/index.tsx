import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Box } from '@bic_todo/utils/theme';
import TaskTile from '@bic_todo/components/tasks/task-tile';
import { useAppDispatch, useAppSelector } from '@bic_todo/redux/hooks';
import { fetchAllCompletedTasks } from './actions';

const CompletedScreen = () => {
  const { completedTasks } = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCompletedTasks());
  }, []);

  return (
    <Box bg="white" flex={1} p="4">
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => <TaskTile task={item} />}
        ItemSeparatorComponent={() => <Box height={14} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
};

export default CompletedScreen;
