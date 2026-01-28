import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import BookListScreen from './src/screens/BookListScreen';
import BookReaderScreen from './src/screens/BookReaderScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { theme } from './src/constants/theme';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={theme.colors.primary} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'Детские Книжки',
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="BookList" 
            component={BookListScreen} 
            options={{ 
              title: 'Все Книги' 
            }} 
          />
          <Stack.Screen 
            name="BookReader" 
            component={BookReaderScreen} 
            options={{ 
              title: 'Читаем Книгу',
              headerBackTitle: 'Назад'
            }} 
          />
          <Stack.Screen 
            name="Favorites" 
            component={FavoritesScreen} 
            options={{ 
              title: 'Любимые Книги' 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}