import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import LoginScreen from '@/presentation/screens/LoginScreen';
import DashboardScreen from '@/presentation/screens/DashboardScreen';
import CourseDetailsScreen from '@/presentation/screens/CourseDetailsScreen';
import { colors } from '@/core/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'My Courses' }} />
        <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} options={{ title: 'Course Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
