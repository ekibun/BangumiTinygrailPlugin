import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('czy0729.bangumi', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('czy0729.bangumi', { rootTag });
}
