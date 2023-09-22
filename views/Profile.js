import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, Icon, ListItem} from '@rneui/themed';
import ProfileForm from '../components/ProfileForm';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  const loadAvatar = async () => {
    try {
      const avatars = await getFilesByTag('avatar_' + user.user_id);
      if (avatars.length > 0) {
        setAvatar(mediaUrl + avatars.pop().filename);
      }
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
        <Card.Image source={{uri: avatar}} />
        <ListItem>
          <Icon name="email" />
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        {user.full_name && (
          <ListItem>
            <Icon name="person" />
            <ListItem.Title>{user.full_name}</ListItem.Title>
          </ListItem>
        )}
        <ListItem>
          <ListItem.Title>user id: {user.user_id}</ListItem.Title>
        </ListItem>
        <Card.Divider />
        <Button
          onPress={() => {
            navigation.navigate('My files');
          }}
        >
          My files
          <Icon name="storage" color="white" />
        </Button>
        <Button onPress={logOut}>
          Log out!
          <Icon name="logout" color="white" />
        </Button>
        <ProfileForm user={user} />
      </Card>
    </ScrollView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
