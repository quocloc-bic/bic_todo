import 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import theme from '@bic_todo/utils/theme';
import Navigation from '@bic_todo/navigation';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
