import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication, useUser } from '../hooks/ApiHooks';


const Login = ({ navigation }) => { // props is needed for navigation

  const { setIsLoggedIn } = useContext(MainContext);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    try {
      await AsyncStorage.getItem('userToken');
      // harcoded token validation
      const userData = await getUserByToken(token);
      console.log('userdate:' , userData);

      if (userData); {
        setIsLoggedIn(true);
      }

    } catch (e) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkToken
  }
    , []
  );

  const logIn = async () => {
    console.log('Button pressed');
    try {
      const loginResponse = await postLogin({ username: 'Kimrauti', password: '12345' });
      console.log('login response: ', loginResponse);
      // TODO fix doFetch() to display errors from API (e.g. when bad user /)
      // use loginResponse.user for storing token and userdata
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
      // TODO: notify user about failed login?
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
