import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform } from 'react-native'
import React, {useContext, useState} from 'react'

//react native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AppwriteContext} from '../Context/Context'

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackRootParamList} from '../Routes/AuthStack';


type LoginScreenProps = NativeStackScreenProps<AuthStackRootParamList, 'Login'>



const Login = ({navigation}: LoginScreenProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required')
    } else {
      const user = {
        email,
        password
      }
      appwrite.login(user)
      .then((response) => {
        if (response) {
          setIsLoggedIn(true);
          Snackbar.show({
            text: 'Login Successful',
            duration: Snackbar.LENGTH_SHORT
          })
        }
      })
      .catch(e => {
        console.log(e);
        setEmail('Incorrect email or password')
        
      })
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Welcome</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
    color: '#000000',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  errorText: {
    color: '#FF0000',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#f02e65',
    padding: 15,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  noAccountLabel: {
    color: '#484848',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
});




export default Login