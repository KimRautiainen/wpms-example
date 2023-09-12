import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTag } from '../hooks/ApiHooks';
import { mediaUrl } from '../utils/app-config';
import { Card, Icon, ListItem, Button } from '@rneui/themed';
import ProfileForm from '../components/ProfileForm';
import { ScrollView } from 'react-native';

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
    <ScrollView>
    <Card>

      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{ uri: avatar }}></Card.Image>

      <ListItem><Icon name='email'/><ListItem.Title>{user.email}</ListItem.Title></ListItem>


      <ListItem><Icon name='person'/><ListItem.Title>{user.user_id}</ListItem.Title></ListItem>
      <Card.Divider></Card.Divider>
      <Button title='LogOut' onPress={logOut} />
      <ProfileForm user={user}/>
    </Card>
    </ScrollView>
  );
};



export default Profile;
