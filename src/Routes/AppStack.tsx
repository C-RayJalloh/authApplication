// THIS THE ROUTE WHERE THE APPLICATION LEAVES - IF USER IS LOGED IN

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'


export type AppStackRootParamList = {
    Home: undefined;
}

const Stack = createNativeStackNavigator<AppStackRootParamList>();

// displays the home Screen
export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
    }}>
        <Stack.Screen  name='Home' component={Home}/>
    </Stack.Navigator>
  )
}


