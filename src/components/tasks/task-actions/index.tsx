import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@bic_todo/redux/hooks';
import { Text, Box } from '@bic_todo/utils/theme';
import { format, isToday } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import { createNewTask, updateTask } from './actions';

interface TaskActionsProps {
  task?: ITask;
  onSubmitted?: () => void;
}

const today = new Date();

const TaskActions = (props: TaskActionsProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const firstCategory = categories.at(0);

  const initialTask: ITask = {
    id: props.task?.id ?? 0,
    categoryId: props.task?.categoryId ?? firstCategory?.id ?? 0,
    name: props.task?.name ?? '',
    dueDate: props.task?.dueDate ?? Date.now(),
    isCompleted: props.task?.isCompleted ?? false,
  };

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<ITask>(initialTask);

  const selectedCategory = categories?.find(
    category => category.id === newTask.categoryId,
  );

  const onCreateTask = () => {
    let completionPromise: Promise<any>;

    if (newTask.id > 0) {
      completionPromise = dispatch(updateTask(newTask));
    } else {
      completionPromise = dispatch(
        createNewTask({
          ...newTask,
        }),
      );
    }

    completionPromise
      .then(() => {
        props.onSubmitted && props.onSubmitted();
        reset();
      })
      .catch(error => Alert.alert('Error', error));
  };

  const reset = () => {
    setNewTask(initialTask);
  };

  return (
    <Box>
      <Box bg="lightGray" p="4" borderRadius="rounded32" flexDirection="row">
        <TextInput
          placeholder="Create a new task"
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            fontSize: 16,
            flex: 1,
          }}
          maxLength={36}
          textAlignVertical="center"
          value={newTask.name}
          onChangeText={text => {
            setNewTask(prev => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
          onSubmitEditing={onCreateTask}
        />
        <Box flexDirection="row" alignItems="center">
          <Pressable
            onPress={() => {
              setIsSelectingDate(prev => !prev);
            }}>
            <Box
              flexDirection="row"
              alignContent="center"
              bg="white"
              p="2"
              borderRadius="rounded20">
              <Text>
                {isToday(new Date(newTask.dueDate))
                  ? 'Today'
                  : format(new Date(newTask.dueDate), 'MMM dd')}
              </Text>
            </Box>
          </Pressable>
          <Box width={12} />
          <Pressable
            onPress={() => {
              setIsSelectingCategory(prev => !prev);
            }}>
            <Box
              bg="white"
              flexDirection="row"
              alignItems="center"
              p="2"
              borderRadius="rounded20">
              <FontAwesome
                name="circle"
                size={16}
                color={selectedCategory?.color}
              />
              <Text
                ml="1"
                style={{
                  color: selectedCategory?.color,
                }}>
                {selectedCategory?.name}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
      {isSelectingCategory && (
        <Box alignItems="flex-end" my="4" justifyContent="flex-end">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setNewTask(prev => {
                      return {
                        ...prev,
                        categoryId: item.id,
                      };
                    });
                    setIsSelectingCategory(false);
                  }}>
                  <Box
                    bg="gray250"
                    p="2"
                    borderTopStartRadius={index === 0 ? 'rounded32' : 'none'}
                    borderBottomStartRadius={index === 0 ? 'rounded32' : 'none'}
                    borderTopEndRadius={
                      categories?.length - 1 === index ? 'rounded32' : 'none'
                    }
                    borderBottomEndRadius={
                      categories?.length - 1 === index ? 'rounded32' : 'none'
                    }>
                    <Box flexDirection="row">
                      <Text
                        mx="2"
                        style={{
                          color: item.color,
                        }}
                        fontWeight={
                          newTask.categoryId === item.id ? '700' : '400'
                        }>
                        {item.name}
                      </Text>
                    </Box>
                  </Box>
                </Pressable>
              );
            }}
          />
        </Box>
      )}
      {isSelectingDate && (
        <Box>
          <Calendar
            minDate={format(today, 'y-MM-dd')}
            onDayPress={day => {
              setIsSelectingDate(false);

              setNewTask(prev => {
                return {
                  ...prev,
                  dueDate: day.timestamp,
                };
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TaskActions;

const styles = StyleSheet.create({});
