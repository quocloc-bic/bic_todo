import 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import theme, { Box } from './utils/theme';
import Navigation from './src/navigation';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
