import React, { useEffect } from 'react';
import TaskActions from '@bic_todo/presentation/components/tasks/task-actions';
import { Box } from '@bic_todo/utils/theme';
import { useHomeScreen } from '@bic_todo/adapters/home';
import TaskList from '@bic_todo/presentation/components/shared/task-list';

const HomeScreen: React.FC = () => {
  const adapter = useHomeScreen();

  useEffect(() => {
    adapter.refresh();
  }, []);

  return (
    <Box bg="white" flex={1} p="4">
      <TaskActions />
      <Box height={26} />
      <TaskList tasks={adapter.tasks} onFetchMore={adapter.fetchMore} />
    </Box>
  );
};

export default HomeScreen;
