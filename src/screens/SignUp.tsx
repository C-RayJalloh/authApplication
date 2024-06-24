import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, TextInput, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
// REACT NATIVE STYLING ELEMENT
import {FAB, Image} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import {AppwriteContext} from '../Context/Context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackRootParamList } from '../Routes/AuthStack';

type signUpScreenProps = NativeStackScreenProps<AuthStackRootParamList, 'SignUp'>

// // type definataion
// type UserObject = {
//   email: string;
//   name: string;
// };


const SignUp = ({navigation}: signUpScreenProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)

  const [error, setError] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
      ) {
        setError('All fields are required');
      } else if (password !== repeatPassword) {
        setError('Passwords do not match');
      } else {
        const user = {
          email,
          password,
          name,
        };
        // calls the appwrite method with the user
        appwrite.createAccount(user)
        .then((response:any) => {
          if (response) {
            setIsLoggedIn(true)
            // notification on success
            Snackbar.show({
              text: 'Signup successful',
              duration: Snackbar.LENGTH_SHORT
            })
          }
        })
        .catch(e => {
          console.log(e);
          setError(e.message)
          
        })
  }

  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.appName}>Let's go</Text>

      {/* Name */}
      <TextInput
        value={name}
        onChangeText={text => {
          setError('');
          setName(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Name"
        style={styles.input}
      />

      {/* Email */}
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => {
          setError('');
          setEmail(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Email"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Repeat password */}
      <TextInput
        secureTextEntry
        value={repeatPassword}
        onChangeText={text => {
          setError('');
          setRepeatPassword(text);
        }}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Repeat Password"
        style={styles.input}
      />

      {/* Validation error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Signup button */}
      <Pressable
        onPress={handleSignUp}
        style={[styles.btn, {marginTop: error ? 10 : 20}]}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Pressable>

      {/* Login navigation */}
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={styles.loginContainer}>
        <Text style={styles.haveAccountLabel}>
          Already have an account?{'  '}
          <Text style={styles.loginLabel}>Login</Text>
        </Text>
      </Pressable>
    </View>
  </KeyboardAvoidingView>
  )
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
    backgroundColor: '#fef8fa',
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
    marginTop: 20,
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
  loginContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  haveAccountLabel: {
    color: '#484848',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
});






export default SignUp