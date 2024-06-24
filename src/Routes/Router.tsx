/* USES A USE-EFFECT HOOK TO CHECK WHERE THE USER IS LOGED IN OR NOT
   IF USER IS LOGED IN THE ROUTER WILL SERVER THE APPSTACK, ELSE IT WILL SERVE THE AUTHSTACK 
*/

import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// NAVIGATION CONTAINER
import { NavigationContainer } from '@react-navigation/native'


// APPWRITE CONTEXT
import {AppwriteContext} from '../Context/Context'

// ROUTES
import { AppStack} from './AppStack'
import { AuthStack } from './AuthStack'
import LoadingIndicator from '../Components/LoadingIndicator'


export const Router = () => {
   const [isLoading, setIsloading ] = useState<boolean>(true)
   const { appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext)

 // use-effect on fetching the current user then after the RESPONSE SET THE LOADING INDICATOR TO FALSE
 useEffect(() => {
   appwrite
   .getCurrentUser()
   .then((response: any) => {
     setIsloading(false)
     if (response) {
         setIsLoggedIn(true)
     }
   })
   .catch(_ => {
     setIsloading(false)
     setIsLoggedIn(false)
   })
    }, [appwrite, setIsLoggedIn])
  
    // render the loading indicator component if its loading
    if(isLoading) {
      return <LoadingIndicator />
    }

  return (
    <NavigationContainer>
      {isLoggedIn? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

