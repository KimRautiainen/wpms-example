import React from 'react';
import PropTypes from 'prop-types';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';

const Single = ({route, navigation}) => {
  //console.log('route params', route.params);
  const singleMedia = route.params;
  // TODO: Show image and all metadata, fix styling
  return (
    <SafeAreaView style={styles.container}>
      <Text>{singleMedia.title}</Text>
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
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
