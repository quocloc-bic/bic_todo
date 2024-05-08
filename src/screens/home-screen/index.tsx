import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import TaskActions from '@bic_todo/components/tasks/task-actions';
import { Box } from '@bic_todo/utils/theme';
import TaskTile from '@bic_todo/components/tasks/task-tile';
import { useAppSelector } from '@bic_todo/redux/hooks';

const HomeScreen = () => {
  const { tasks } = useAppSelector(state => state.task);

  return (
    <Box bg="white" flex={1} p="4">
      <TaskActions />
      <Box height={26} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskTile task={item} />}
        ItemSeparatorComponent={() => <Box height={14} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
