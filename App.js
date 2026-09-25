import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import CreateScreen from './screens/CreateScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: 'home',
  Discover: 'compass',
  Create: 'add-circle',
  Profile: 'person',
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate user check
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0b1020' }} />
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar style="light" />
        <AuthScreen onAuthSuccess={setUser} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#0b1020',
              borderTopColor: '#1f2937',
              height: 76,
              paddingBottom: 12,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#7b8794',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tabIcons[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} initialParams={{ user }} />
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Create" component={CreateScreen} initialParams={{ user }} />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ user, onLogout: () => setUser(null) }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
