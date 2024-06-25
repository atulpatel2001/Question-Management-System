import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import UserScreen from '../screen/UserScreen';
import AdminScreen from '../screen/AdminScreen';
import AddUser from '../screen/AddUser';
import ListAllUser from '../screen/AllUser';
import AddQuestion from '../screen/AddQuestion';
import ListAllQuestion from '../screen/AllQuestion';
import UpdateUser from '../screen/UpdateUser';
import AttemptScreen from '../screen/AttemptScreen';
import ReportScreen from '../screen/ReportScreen';
import AdminReportScreen from '../screen/AdminReportScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Route: React.FC = () => {
    const Stack = createNativeStackNavigator();

    const [initialRoute, setInitialRoute] = useState('Splash');

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const username = await AsyncStorage.getItem('username');
          if (username) {
          
            const isAdmin = username === 'atulpatel123';
            const initialRoute = isAdmin ? 'AdminScreen' : 'UserScreen';
            setInitialRoute(initialRoute);
          } else {
            setInitialRoute('HomeScreen');
          }
        } catch (error) {
          console.error('Error checking login status:', error);
          setInitialRoute('HomeScreen');
        }
      };
  
      checkLoginStatus();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
                <Stack.Screen name='UserScreen' component={UserScreen}></Stack.Screen>
                <Stack.Screen name='Attempt' component={AttemptScreen}></Stack.Screen>
                <Stack.Screen name='ListUsers' component={ListAllUser}></Stack.Screen>
                <Stack.Screen name='ListQuestions' component={ListAllQuestion}></Stack.Screen>
                <Stack.Screen name='AddQuestion' component={AddQuestion}></Stack.Screen>
                <Stack.Screen name='LoginScreen' component={LoginScreen}></Stack.Screen>
                <Stack.Screen name='AdminScreen' component={AdminScreen}></Stack.Screen>
                <Stack.Screen name='AddUser' component={AddUser}></Stack.Screen>
                <Stack.Screen name='UpdateUser' component={UpdateUser}></Stack.Screen>
                <Stack.Screen name='UserReportScreen' component={ReportScreen}></Stack.Screen>
                <Stack.Screen name='AdminReportScreen' component={AdminReportScreen}></Stack.Screen>

            </Stack.Navigator>

        </NavigationContainer>

    )
}

export default Route;