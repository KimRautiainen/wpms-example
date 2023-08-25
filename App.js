import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import List from './components/List';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
      <StatusBar style="auto" />
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
  Image: {
    flex: 1,
    alignItems: 'center',
  }
});

export default App;
