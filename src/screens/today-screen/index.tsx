import { FlatList } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Box } from '@bic_todo/utils/theme';
import TaskTile from '@bic_todo/components/tasks/task-tile';
import { useAppDispatch, useAppSelector } from '@bic_todo/redux/hooks';
import { fetchAllTodayTasks } from './actions';

const TodayScreen = () => {
  const { todayTasks } = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();
  const page = useRef(1);
  const hasMoreData = useRef(true);

  useEffect(() => {
    dispatch(fetchAllTodayTasks(page.current));
  }, []);

  const fetchMore = () => {
    page.current = page.current + 1;

    dispatch(fetchAllTodayTasks(page.current)).then(_hasMoreData => {
      hasMoreData.current = _hasMoreData.payload as boolean;
    });
  };

  return (
    <Box bg="white" flex={1} p="4">
      <FlatList
        data={todayTasks}
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

export default TodayScreen;
