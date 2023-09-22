import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';
import {Alert} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation, userId}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const deleteFile = async () => {
    Alert.alert('Delete', `file id: ${singleMedia.file_id}, Are your sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', singleMedia.file_id);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const result = await deleteMedia(singleMedia.file_id, token);
            console.log('deleteFile()', result.message);
            // update view after deleting a file
            setUpdate(!update);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const modifyFile = async () => {
    console.log('modifying file', singleMedia.file_id);
    navigation.navigate('Modify file', singleMedia);
  };

  return (
    <RNEListItem bottomDivider
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single', singleMedia);
      }}
    >
      <Avatar
        rounded
        size="large"
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Content>
      <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
      <RNEListItem.Subtitle numberOfLines={3}>
        {singleMedia.description}
      </RNEListItem.Subtitle>
      </RNEListItem.Content>
      {singleMedia.user_id == userId && (
        <>
          <Button buttonStyle={{
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }} size="sm" onPress={modifyFile}>
            Modify
          </Button>
          <Button buttonStyle={{
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
           size="sm" onPress={deleteFile} color={'error'}>
            Delete
          </Button>
        </>
      )}

      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
};

export default ListItem;
