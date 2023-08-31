import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';

const Profile = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
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

export default Profile;
