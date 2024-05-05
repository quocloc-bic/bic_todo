import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { AppStackParams } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>SplashScreen</Text>
      <Button
        title="go to home"
        onPress={() => {
          navigation.navigate('BottomTab');
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
