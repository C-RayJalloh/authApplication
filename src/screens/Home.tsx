import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// REACT NATIVE STYLING ELEMENT
import {FAB, Image} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import {AppwriteContext} from '../Context/Context';

// type definataion
type UserObject = {
  email: string;
  name: string;
};

// when USER is logged IN
const Home = () => {
  const [user, setUser] = useState<UserObject>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const handleLogOut = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logged Out successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  // use-effect
  useEffect(() => {
    appwrite.getCurrentUser().then((response: any) => {
      if (response) {
        const user: UserObject = {
          name: response.name,
          email: response.email,
        };
        setUser(user);
      }
    });
    //  .catch(_ => {
    //    setIsLoggedIn(false)
    //  })
  }, [appwrite, setIsLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {user && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {user.name}</Text>
            <Text style={styles.userDetails}>Email: {user.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogOut}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  userContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1E213F',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Home;
