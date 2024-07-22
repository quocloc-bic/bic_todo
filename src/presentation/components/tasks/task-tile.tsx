import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '@bic_todo/presentation/navigation/types';
import { Box, Text } from '@bic_todo/utils/theme';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { ITask } from '@bic_todo/domain/entities/task';
import { useTaskTile } from '@bic_todo/adapters/task-title';

interface TaskTileProps {
  task: ITask;
}

const TaskTile = (props: TaskTileProps) => {
  const navigation = useNavigation<HomeNavigationType>();
  const adapter = useTaskTile();

  const navigateToUpdateTask = () => {
    navigation.navigate('UpdateTask', {
      task: props.task,
    });
  };

  const toggleTaskCompletion = () => {
    adapter.toggleTaskCompletion(props.task);
  };

  return (
    <Pressable onPress={toggleTaskCompletion} style={{ flex: 1 }}>
      <Box p="4" bg="lightGray" borderRadius="rounded32" flexDirection="row">
        <Box flexDirection="row" alignItems="center" flex={1}>
          <Box
            height={26}
            width={26}
            bg={props.task.isCompleted ? 'purple900' : 'purple50'}
            borderRadius="rounded20"
            alignItems="center"
            justifyContent="center">
            {!!props.task.isCompleted && (
              <Ionicons name="checkmark" size={20} color="white" />
            )}
          </Box>
          <Box flex={1}>
            <Text ml="3" variant="title">
              {props.task.name}
            </Text>
          </Box>

          <Pressable onPress={navigateToUpdateTask}>
            <Entypo name="dots-three-vertical" size={16} />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};

export default TaskTile;
