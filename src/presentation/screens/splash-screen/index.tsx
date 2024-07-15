import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '../../navigation/types';
import { Box, Text } from '@bic_todo/utils/theme';
import SafeAreaWrapper from '@bic_todo/presentation/components/shared/safe-area-wrapper';
import { useSplashScreen } from '@bic_todo/adapters/splash';

const SplashScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const adapter = useSplashScreen();

  useEffect(() => {
    adapter.initialize().then(() => {
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
