import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

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
