import PropTypes from 'prop-types';
import { mediaUrl } from '../utils/app-config';
import { Avatar, ListItem as RNEListItem } from '@rneui/themed';
import { Button } from '@rneui/base';

const ListItem = ({ singleMedia, navigation }) => {
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
        source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
      ></Avatar>

      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle
          numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button buttonStyle={{
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }} onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}>
        View

      </Button>

    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
