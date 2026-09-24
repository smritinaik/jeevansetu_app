import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="police-form" />
      <Stack.Screen name="driver-form" />
      <Stack.Screen name="ambulance-form" />
    </Stack>
  );
}