import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../utils/app-config';
import { Avatar, Button, ButtonGroup, ListItem as RNEListItem } from '@rneui/themed';
const ListItem = ({ singleMedia, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single', singleMedia);
      }}
    >

      <RNEListItem bottomDivider>
        <Avatar
          rounded
          size="large"
          source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
        />
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>



        {/* <RNEListItem.ButtonGroup>
          <Button size='sm'>View</Button>
        </RNEListItem.ButtonGroup> */}

      </RNEListItem>





    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
