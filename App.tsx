import 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import theme from '@bic_todo/utils/theme';
import Navigation from '@bic_todo/navigation';
import { Provider } from 'react-redux';
import store from '@bic_todo/redux/store';
import { SQLiteProvider } from 'expo-sqlite';

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
