import { StatusBar } from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
