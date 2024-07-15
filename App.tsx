import 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import theme from '@bic_todo/utils/theme';
import { Provider } from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';
import Navigation from '@bic_todo/presentation/navigation';
import store from '@bic_todo/infrastructure/redux/store';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SQLiteProvider databaseName="db.db">
        <Provider store={store}>
          <Navigation />
        </Provider>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}
