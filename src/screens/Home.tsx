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
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default Home;
