import React, { useEffect } from 'react';
import { Box } from '@bic_todo/utils/theme';
import TaskList from '@bic_todo/presentation/components/shared/task-list';
import { useTodayTasksScreen } from '@bic_todo/adapters/today';

const TodayTasksScreen: React.FC = () => {
  const adapter = useTodayTasksScreen();

  useEffect(() => {
    adapter.refresh();
  }, []);

  return (
    <Box bg="white" flex={1} p="4">
      <TaskList tasks={adapter.tasks} onFetchMore={adapter.fetchMore} />
    </Box>
  );
};

export default TodayTasksScreen;
