import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TaskActions from '@bic_todo/components/tasks/task-actions';
import { Box } from '@bic_todo/utils/theme';
import TaskTile from '@bic_todo/components/tasks/task-tile';
import { useAppDispatch, useAppSelector } from '@bic_todo/redux/hooks';
import { fetchAllTasks } from './actions';

const HomeScreen = () => {
  const { tasks } = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();
  const page = useRef(1);
  const hasMoreData = useRef(true);

  useEffect(() => {
    dispatch(fetchAllTasks(page.current));
  }, []);

  const fetchMore = () => {
    page.current = page.current + 1;
    dispatch(fetchAllTasks(page.current)).then(_hasMoreData => {
      hasMoreData.current = _hasMoreData.payload as boolean;
    });
  };

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
        onEndReached={hasMoreData ? fetchMore : null}
        onEndReachedThreshold={0.5}
      />
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
