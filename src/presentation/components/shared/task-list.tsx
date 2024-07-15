import { FlatList } from 'react-native';
import React from 'react';
import { ITask } from '@bic_todo/domain/entities/task';
import { Box } from '@bic_todo/utils/theme';
import TaskTile from '../tasks/task-tile';

interface TaskListProps {
  tasks: ITask[];
  onFetchMore: (() => void) | null;
}

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <FlatList
      data={props.tasks}
      renderItem={({ item }) => <TaskTile task={item} />}
      ItemSeparatorComponent={() => <Box height={14} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      onEndReached={props.onFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default TaskList;
