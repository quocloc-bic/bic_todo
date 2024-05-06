import { Theme } from '@bic_todo/utils/theme';
import { useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeAreaWrapperProps = {
  children: ReactNode;
};

const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
