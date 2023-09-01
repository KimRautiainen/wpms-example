import React, { useContext } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const { setIsLoggedIn } = useContext(MainContext);
  const logOut = async () => {
    console.log("profile, logout");
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (e) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
      <Button title='LogOut' onPress={logOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
