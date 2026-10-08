import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from '@/presentation/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}
