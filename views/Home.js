import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};



Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
