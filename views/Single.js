import React from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/functions';
import {Card, Icon, Text, ListItem} from '@rneui/themed';

const Single = ({route, navigation}) => {
  // console.log('route params', route.params);
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
  } = route.params;
  // Show full image and metadata
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Image
        source={{uri: mediaUrl + filename}}
        resizeMode="center"
        style={{height: 300}}
      />
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Icon name="save" />
        <Text>{Math.round(filesize / 1024)} kB</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>{formatDate(timeAdded)}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>id: {userId}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
