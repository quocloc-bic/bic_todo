import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '@bic_todo/navigation/types';

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationType>();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="edit task"
        onPress={() => {
          navigation.navigate('EditTask');
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
