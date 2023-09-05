import React, { useContext, useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Button, Image } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTag } from '../hooks/ApiHooks';
import { mediaUrl } from '../utils/app-config';

const Profile = (props) => {
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const { getFilesByTag } = useTag();
  const { setIsLoggedIn, user } = useContext(MainContext);
  const logOut = async () => {
    console.log("profile, logout");
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (e) {
      console.log(error);
    }
  };
  const loadAvatar = async () => {
    try {
      const avatars = await getFilesByTag('avatar_' + user.user_id);
      if (avatars.length > 0) {

        setAvatar(mediaUrl + avatars.pop().filename);
      }
      console.log('avatar: ', avatars)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
      <Text>{user.username}</Text>
      <Image source={{ uri: avatar }} style={styles.Image}></Image>
      <Text>{user.email}</Text>
      <Text>{user.user_id}</Text>
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
  Image: {
    flex: 1,
    width: 390,
    height: 500,
    resizeMode: 'contain',
  },
});

export default Profile;
