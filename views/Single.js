import React from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { mediaUrl } from '../utils/app-config';

const Single = ({ route, navigation }) => {
  //console.log('route params', route.params);
  const singleMedia = route.params;
  console.log(mediaUrl + singleMedia.id);
  // TODO: Show image and all metadata, fix styling
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>

        {singleMedia.title}
      </Text>
      <Image

        style={styles.Image}
        source={{ uri: mediaUrl + singleMedia.filename }}
      />
      <Text style={styles.description}>{singleMedia.description}</Text>
      <Text style={styles.fileText}>{singleMedia.filename}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#F5FFFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    flex: 1,
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  description: {
    marginBottom: 25,
    fontFamily: 'Arial',
    fontSize: 18,
  },
  fileText: {
    marginBottom: 25,
  }
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
