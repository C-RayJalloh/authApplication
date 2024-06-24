// THIS ROUTE REDIERECTS THE USER EITHER TO THE LOGIN || SIGNUP 
import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'


export type AuthStackRootParamList = {
    Login: undefined;
    SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthStackRootParamList>();

// displays the login and signup Screens
export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
    }}>
        <Stack.Screen  name='Login' component={Login}/>
        <Stack.Screen  name='SignUp' component={SignUp}/>
    </Stack.Navigator>
  )
}

