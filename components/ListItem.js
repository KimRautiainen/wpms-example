import {Image, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single', singleMedia);
      }}
    >
      <Image
        style={{width: 100, height: 100}}
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <Text>{singleMedia.title}</Text>
      <Text>{singleMedia.description}</Text>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
