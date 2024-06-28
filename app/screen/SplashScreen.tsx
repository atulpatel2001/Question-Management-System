/**
 * Splash Screen Component
 */

import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {


  //Check Login status is admin or user
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const isAdmin = username === 'admin';
          const initialRoute = isAdmin ? 'AdminScreen' : 'UserScreen';
          navigation.replace(initialRoute);
        } else {
          navigation.replace('HomeScreen');
        }
      } catch (error) {
        console.error('Error checking login status:', error)
        navigation.replace('HomeScreen');
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
