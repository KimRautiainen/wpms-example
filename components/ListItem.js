import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ singleMedia }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: singleMedia.thumbnails.w160 }} />
      <View style={styles.content}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888888',
  },
});

export default ListItem;