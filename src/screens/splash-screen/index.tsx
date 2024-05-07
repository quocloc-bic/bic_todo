import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '../../navigation/types';
import { initialize } from './actions';
import { Box, Text } from '@bic_todo/utils/theme';
import SafeAreaWrapper from '@bic_todo/components/shared/safe-area-wrapper';
import { useAppDispatch } from '@bic_todo/redux/hooks';

const SplashScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize()).then(() => {
      navigation.navigate('BottomTab');
    });
  }, []);

  return (
    <SafeAreaWrapper>
      <Box flex={1}>
        <Box justifyContent="center" alignItems="center" flex={1}>
          <Text variant="splashTitle">BIC Todo</Text>
        </Box>
        <Box bottom={8} left={16} right={16}>
          <Text textAlign="center" variant="small">
            Made by loctq
          </Text>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
