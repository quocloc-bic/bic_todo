import React, { useEffect } from 'react';
import { Box } from '@bic_todo/utils/theme';
import TaskList from '@bic_todo/presentation/components/shared/task-list';
import { useCompletedTasksScreen } from '@bic_todo/adapters/completed';

const CompletedTasksScreen: React.FC = () => {
  const adapter = useCompletedTasksScreen();

  useEffect(() => {
    adapter.refresh();
  }, []);

  return (
    <Box bg="white" flex={1} p="4">
      <TaskList tasks={adapter.tasks} onFetchMore={adapter.fetchMore} />
    </Box>
  );
};

export default CompletedTasksScreen;
